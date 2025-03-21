<script lang="ts">
    import { db } from '../../firebase';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import { media } from '../../../stores/media';
  	import MainLogo from "$lib/components/MainLogo.svelte";

    interface EmailDoc {
      id: string;
      email: string;
      timestamp: { seconds: number; nanoseconds: number };
    }
  
    let emails: EmailDoc[] = [];
    let unsubscribe: ReturnType<typeof onSnapshot> | undefined;
  
    onMount(() => {
      const emailsCollection = collection(db, 'emails');
      unsubscribe = onSnapshot(
        emailsCollection,
        (snapshot) => {
          emails = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<EmailDoc, 'id'>)
          }));
        },
        (error: Error) => {
          console.error('Error listening to emails:', error);
          alert('Failed to load emails.');
        }
      );
  
      return () => unsubscribe && unsubscribe();
    });
  </script>

  <main class="h-full">
    <div class="w-full flex flex-col items-center justify-center bg-orange-600 {$media.isDesktop ? "" : "w-full p-4"}">
      <MainLogo type="alt" />
    </div>
    <div class="{$media.isDesktop ? "p-6 mx-20" : "p-4 mx-4"}">
        <h1 class="font-bold my-6 {$media.isDesktop ? "text-xl" : "text-lg"}">Live Waitlist</h1>
        {#if emails.length === 0}
          <p>No emails found or loading...</p>
        {:else}
          <ul class=" p-4 bg-gray-100 rounded-lg {$media.isDesktop ? "space-y-4 text-sm" : "space-y-2 text-xs"}">
            {#each emails as { email, timestamp }}
              <li>
                {email} (Subscribed: {new Date(timestamp.seconds * 1000).toLocaleString()})
              </li>
            {/each}
          </ul>
        {/if}
    </div>
  </main>
<!-- PhotoInput.svelte -->
<script lang="ts">
    import { onDestroy } from 'svelte';
  
    export let photos: File[] = [];
    export let classes: string = "";
  
    let photoUrls: string[] = [];
  
    $: {
      photoUrls.forEach(url => URL.revokeObjectURL(url));
      photoUrls = photos.map(file => URL.createObjectURL(file));
    }
  
    onDestroy(() => {
      photoUrls.forEach(url => URL.revokeObjectURL(url));
    });
  
    function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        const newFiles = Array.from(input.files);
        photos = [...photos, ...newFiles];
        input.value = '';
      }
    }
  </script>
  
  <input
    type="file"
    id="photo-input"
    accept="image/*"
    multiple
    on:change={handleFileChange}
    class="hidden"
  />
  
  <label
    for="photo-input"
    class="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dotted border-gray-400 transition-colors hover:bg-gray-100 {classes}"
  >
    <span class="text-gray-600"></span>
    <svg
      class="absolute bottom-2 right-2 h-5 w-5 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  </label>
  
  {#if photoUrls.length > 0}
    <div class="mt-4 grid grid-cols-3 gap-2">
      {#each photoUrls as url}
        <img
          src={url}
          alt="Uploaded photo"
          class="h-24 w-full rounded-md object-cover"
        />
      {/each}
    </div>
  {/if}
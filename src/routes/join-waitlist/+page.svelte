<script lang="ts">
    import { db } from '../../firebase';
    import { doc, setDoc } from 'firebase/firestore';
    import StylizedName from '$lib/components/StylizedName.svelte';
    import { media } from '$lib/media'
	import MainLogo from '$lib/components/MainLogo.svelte';
  
    let email: string = '';
    let submitting: boolean = false;
  
    function isValidEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    async function submitEmail(): Promise<void> {
      if (submitting) return;
      submitting = true;
  
      const trimmedEmail = email.trim();
      if (!isValidEmail(trimmedEmail)) {
        alert('Please enter a valid email address.');
        submitting = false;
        return;
      }
  
      const normalizedEmail = trimmedEmail.toLowerCase();
      try {
        await setDoc(doc(db, 'emails', normalizedEmail), {
          email: normalizedEmail,
          timestamp: new Date()
        });
        alert('Email submitted successfully!');
        email = '';
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'permission-denied') {
          alert('This email is already subscribed.');
        } else {
          console.error('Error adding email: ', error);
          alert('There was an error submitting your email.');
        }
      } finally {
        submitting = false;
      }
    }
  </script>


  <main class="flex flex-col items-center justify-center {$media.isDesktop ? "" : "text-sm"}" id="join-waitlist">
    <div class="w-full flex flex-col items-center justify-center bg-orange-600 {$media.isDesktop ? "" : "p-4"}">
        {#if $media.isDesktop}
        <MainLogo type="alt" />
        {:else}
        <MainLogo classes="text-4xl" type="alt"/>
        {/if}
        <h1 class="font-bold my-4 text-xl">Join Our Waitlist Now</h1>
        <form
        class="space-x-2 my-4 flex items-center justify-center {$media.isDesktop ? "w-1/3" : ""}"
        on:submit|preventDefault={submitEmail}>
        <input
            type="email"
            class="input rounded-md {$media.isDesktop? "" : "text-xs"}"
            bind:value={email}
            placeholder="Enter your email"
            required
        />
        <button type="submit" class="btn variant-filled rounded-md {$media.isDesktop ? "" : "text-xs"}" disabled={submitting}>Submit</button>
        </form>
    </div>
    <div class="container text-md {$media.isDesktop ? "p-10 px-40" : "p-4 m-4"}">
        <p class="">
            A pioneering e-commerce platform that is transforming the landscape of online retail trading. We’ve in fact reimagined the traditional peer-to-peer marketplace by introducing a trusted network of agents—everyday individuals who can register to facilitate secure, seamless transactions between buyers and sellers. Our innovative agent-based system ensures that every trade is not only efficient but also rooted in trust, community, and opportunity.
        </p>
        <h2 class="font-bold {$media.isDesktop ? "my-4" : "mt-4"}">A New Era of Secure and Personalized Trading</h2>
        <p class="">
            In a world where online transactions can often feel impersonal or uncertain, <StylizedName /> stands out by offering a human-centered approach. Instead of buyers and sellers navigating the complexities of direct exchanges, our platform connects them through verified agents. These agents, who can be anyone over 18 with the necessary identification, act as intermediaries to ensure every purchase and sale is smooth, secure, and satisfying. For buyers, this means shopping with confidence. No more worrying about product quality or seller credibility—our agents handle the heavy lifting. They verify products, vet sellers, and provide a personalized touch, making your shopping experience feel like you have a trusted advisor by your side. It’s a level of security and care that traditional e-commerce simply can’t match. For sellers, o42 opens doors to new opportunities. By tapping into our agent network, you can reach a wider audience without the burden of managing every transaction detail. Agents take care of the logistics, allowing you to focus on what matters most—delivering exceptional products. Plus, with agents promoting your offerings, your business gains visibility and credibility in the marketplace.
        </p>

        <h2 class="font-bold {$media.isDesktop ? "my-4" : "mt-4"}">Empowering Communities and Creating Opportunities</h2>
        <p class=""><StylizedName /> is more than just a trading platform; it’s a community-driven ecosystem designed to uplift everyone involved. Retail outlet owners, in particular, can thrive by registering as agents. This unique feature not only promotes their businesses to a broader audience but also positions them as trusted facilitators within the network. It’s a win-win: local businesses grow while contributing to a vibrant, interconnected marketplace. But the opportunities don’t stop there. Anyone who meets our simple criteria—being over 18 and having valid identification—can become an agent and earn commissions from the transactions they facilitate. This creates a meaningful stream of income for agents, whether they’re looking for a side hustle or a new career path. We believe in empowering individuals to turn their time and skills into tangible rewards.</p>

        <h2 class="font-bold {$media.isDesktop ? "my-4" : "mt-4"}">Why Join <StylizedName />?</h2>
        <ul class="list-disc {$media.isDesktop ? "space-y-4 my-4" : "space-y-2 m-4"}">
            <li class=""><span class="font-bold">As a Buyer</span>, you enjoy a secure, personalized shopping experience with the assurance that every transaction is backed by a trusted agent.</li>
            <li class=""><span class="font-bold">As a Seller</span>, you expand your reach and simplify your sales process with the support of our dedicated agent network.</li>
            <li class=""><span class="font-bold">As an Agent</span>, step into a role that not only helps others but also generates income through commissions, all while being part of a growing community.</li>
        </ul>
        <p class="">We’re building more than a platform—we’re fostering a network of trust, opportunity, and growth. Whether you’re here to buy, sell, or facilitate, <StylizedName /> invites you to be part of a movement that’s reshaping online retail trading for the better. Join us today and discover a world where commerce meets community, and everyone has the chance to succeed. <a href="#join-waitlist" class="anchor no-underline hover:underline text-orange-600">Join our waitlist now</a> and become one of the pioneers in this revolutionary movement. We'll notify you as soon as our web platform goes live and we will keep you up to date with progress and general developments.</p>
    </div>
  </main>
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { media } from '../stores/media';
	import StylizedName from "$lib/components/StylizedName.svelte";
	import Carousel from '$lib/components/Carousel.svelte';
	import ProductCard from '$lib/components/BaseCard.svelte';
	import type { BaseProductLite, ProductGroup } from '$lib/types/app/product';
	import { isUserNew, orderMode } from '../stores/app';
	import { setOrderMode } from '$lib/utils/page';
	import { products } from '$lib/mock';
	// onMount(() => {
	//   goto('/join-waitlist', { replaceState: true });
	// });

    import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import MainLogo from '$lib/components/MainLogo.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { getRandomInt } from '$lib/utils/helpers';
    // Store for scroll position
    const scrollY = writable<number>(0);
  
    // Update scroll position on client-side only
    onMount(() => {
      if (typeof window === 'undefined') return;
      const handleScroll = () => {
        scrollY.set(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });
  
    // Custom action for scroll-triggered animations
    function animateOnScroll(node: HTMLElement, { delay = 0 }: { delay?: number }) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              node.classList.add('visible');
            }, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
      return {
        destroy() {
          observer.disconnect();
        }
      };
    }

    let getStarted = () => {
        isUserNew.set(false)
    }

	let exploreOptions: Array<string> = ["condition", "time on sale", "category"]

	let coverUrl: string = "https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN";
	let productGroups: Array<ProductGroup> = [
		{
			name: "recent uploads",
			products: [],
			description: ""
		},
		{
			name: "inspected",
			products: [],
			description: ""
		},
		{
			name: "new",
			products: [],
			description: ""
		}
	]
  </script>

{#if $isUserNew}
<div
  in:slide
  out:slide
  class="w-full z-50">
    <!-- Background Layer -->
    <div class="background-layer" style="transform: translateY({$scrollY * 0.3}px);"></div>
    
    <!-- Foreground Layer -->
    <div class="foreground-layer" style="transform: translateY({$scrollY * -0.3}px);">
        <svg class="foreground-shape shape1" width="50" height="50">
            <circle cx="25" cy="25" r="20" />
        </svg>
        <svg class="foreground-shape shape2" width="70" height="70">
            <rect x="10" y="10" width="50" height="50" rx="10" />
        </svg>
        <div class="w-full h-52 background-orange-600"></div>
        <svg class="foreground-shape shape3" width="60" height="60">
            <path d="M30 10 L50 50 L10 50 Z" />
        </svg>
    </div>

	<section class="w-full relative flex items-center justify-center">
		<div class="relative z-10 animate-pulse-up-down">
			<MainLogo type="alt"/>
		</div>
		<div class="absolute inset-0 bg-orange-600 slide-in-bg"></div>
	</section>
    <!-- Hero Section -->
    <section class="section hero">
    <div
	class="content space-y-4">
        <h1>Buy and Sell with ease</h1>
        <p><StylizedName /> connects buyers and sellers through a trusted network of agents, ensuring secure and satisfactory transactions.</p>
        <button
        on:click={getStarted}
        class="button text-white bg-orange-600 font-bold">Get Started</button>
    </div>
    </section>

<!-- Background elements -->
<div class="background-layer"></div>
<div class="background-animation"></div>

<!-- How It Works Section -->
<section class="section how-it-works">
  <div class="content">
    <h2>How It Works</h2>
    <div class="steps">
      <div use:animateOnScroll={{ delay: 0 }} class="animate step space-y-6">
        <span class="emoji bounce">📝</span>
        <h3>Place an order</h3>
        <p>Tell us the items you want to buy or sell and we notify our agents.</p>
      </div>
      <div use:animateOnScroll={{ delay: 200 }} class="animate step space-y-6">
        <span class="emoji spin">🔄</span>
        <h3>Order Matching</h3>
        <p>Our platform intelligently connects buyers and sellers with the help of our agents.</p>
      </div>
      <div use:animateOnScroll={{ delay: 400 }} class="animate step space-y-6">
        <span class="emoji pulse">🚚</span>
        <h3 class="capitalize">Delivery</h3>
        <p>We see to it that you promptly get what you want, ensuring delivery and quality of product and service.</p>
      </div>
    </div>
  </div>
</section>

<!-- Benefits Section -->
<section class="section benefits">
  <div class="content">
    <h2>Why Choose <StylizedName /></h2>
    <div class="benefits">
      <div use:animateOnScroll={{ delay: 0 }} class="animate benefit space-y-6">
        <span class="emoji bounce">🚀</span>
        <h3>Ease of Transacting</h3>
        <p>User-friendly platform makes buying and selling a breeze.</p>
      </div>
      <div use:animateOnScroll={{ delay: 200 }} class="animate benefit space-y-6">
        <span class="emoji spin">🔒</span>
        <h3>Security</h3>
        <p>Our Customers are protected with top-notch security measures.</p>
      </div>
      <div use:animateOnScroll={{ delay: 400 }} class="animate benefit space-y-6">
        <span class="emoji pulse">🤝</span>
        <h3>Integrity</h3>
        <p>Our network ensures you get exactly what you want at the best price.</p>
      </div>
    </div>
  </div>
</section>

    <!-- CTA Section -->
    <section class="section cta">
    <div class="content space-y-4 p-10 rounded-xl bg-orange-600 text-white shadow-xl">
        <h2 class="text-white">Ready to make your first order?</h2>
        <p>Create an account now and start trading to experience seamless transactions.</p>
		<div class="flex flex-col items-center justify-center space-y-4">
			<button class="button rounded-md text-black bg-white font-bold">Sign Up Now</button>
			<button class="button text-white bg-none font-bold bg-black hover:bg-orange-600" on:click={getStarted}>Get Started</button>
		</div>
    </div>
    </section>
  </div>
  <ScrollToTop />
{:else}
<div class="flex flex-col w-full mx-0 justify-center items-center mt-10 {$media.isDesktop ? "" : "px-10"}">
	<!-- {#if $media.isDesktop}
	<StylizedName sizeClass="text-7xl" />
	{:else}
	<StylizedName />
	{/if} -->
	<!-- <p class={$media.isDesktop ? "text-sm" : "text-xs w-full"}>...building the ultimate secure peer-to-peer online retail trading platform.</p> -->
	<div
	class="flex flex-col w-full items-center justify-center space-y-6">
		<div style="background-image: url({coverUrl}); background-size: cover; background-position: top;"
		class="w-full flex justify-evenly items-center mb-10 h-96 relative">
			<div class="flex flex-col items-center justify-center space-y-6 z-10 p-6">
				<p class="text-xl font-bold text-white">Tell us what you want and we'll help you find it.</p>
				<a
				class="button text-white font-bold bg-orange-600 animate-pulse-up-down hover:bg-black"
				on:click={() => {setOrderMode("purchase", true)}}>Order now</a>
				<p class="text-white font-light text-sm w-1/2 text-center">We are committed to getting you the best deal while shielding you from the risks of buying online.</p>
			</div>
			<div class="flex flex-col items-center justify-center space-y-6 z-10 p-6">
				<p class="text-xl font-bold text-white">Do you have something you want sold ASAP?</p>
				<a
				on:click={() => {setOrderMode("sale", true)}}
				class="button text-white font-bold bg-orange-600 animate-pulse-up-down hover:bg-black">Sell it now</a>
				<p class="text-white font-light text-sm w-1/2 text-center">Our agents are on standby, ready to find buyers, with the help of our AI-powered order matching algorithm.</p>
			</div>
			<div class="bg-black opacity-50 w-full h-full absolute"></div>
		</div>
		<div
		class="flex flex-col items-center justify-center container w-full mx-10">
			<h2 class="text-4xl capitalize">explore by {exploreOptions[getRandomInt(0, exploreOptions.length - 1)]}</h2>
			{#each productGroups as group, index (index)}
			<Carousel
			title={group.name}
			classes="w-3/4"
			cardClasses="w-52 h-60"
			imageClasses="h-32"
      entityType="product"
			items={products}/>
			<button
			type="button"
			class="anchor text-xl m-4 hover:underline"
			on:click={() => {}}>See all</button>
			{/each}
		</div>
		
	</div>
</div>
<ScrollToTop />
{/if}

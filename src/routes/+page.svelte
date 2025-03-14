<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { media } from '$lib/media';
	import StylizedName from "$lib/components/StylizedName.svelte";

	// onMount(() => {
	//   goto('/join-waitlist', { replaceState: true });
	// });
  </script>

<div class="container flex flex-col h-full mx-auto justify-center items-center {$media.isDesktop ? "" : "px-6"}">
	{#if $media.isDesktop}
	<StylizedName sizeClass="text-7xl" />
	{:else}
	<StylizedName />
	{/if}
	<p class={$media.isDesktop ? "text-sm" : "text-xs w-full"}>...building the ultimate secure peer-to-peer online retail trading platform.</p>
</div>
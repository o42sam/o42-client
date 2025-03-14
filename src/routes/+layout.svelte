<script lang="ts">
	import '../app.postcss';
	import LastUpdated from '$lib/components/LastUpdated.svelte';
	import MainNav from "$lib/components/MainNav.svelte"
	import { media } from '$lib/media';
	import MainLogo from '$lib/components/MainLogo.svelte';
	import UtilityNav from '$lib/components/UtilityNav.svelte';
</script>

{#if $media.isDesktop}

<header class="flex w-full items-center justify-evenly bg-orange-600 text-white">
	<div class="w-1/3 flex items-center justify-center">
		<MainLogo
		classes="rounded-none text-4xl px-8"
		type="default" />
	</div>
	<div class="w-1/3">
		<MainNav
		classes=""
		options={[
			{
				name: "buy",
				label: "buy",
				href: "/buy",
			},
			{
				name: "sell",
				label: "sell",
				href: "/sell",
			},
			{
				name: "agents",
				label: "earn",
				href: "/agents",
			},
			{
				name: "categories",
				label: "categories",
				href: "#categories",
				children: [
					{
						name: "gadgets",
						label: "phones and Gadgets",
						href: "/browse#gadgets",
					},
					{
						name: "appliances",
						label: "appliances",
						href: "/browse#appliances",
					},
					{
						name: "clothing",
						label: "clothing, shoes and accessories",
						href: "/browse#clothing",
					},
					{
						name: "cars",
						label: "cars",
						href: "/browse#cars",
					},
					{
						name: "jewelry",
						label: "jewelry",
						href: "/browse#jewelry",
					},
					{
						name: "pharmaceuticals",
						label: "pharmaceuticals",
						href: "/browse#pharmaceuticals",
					},
					{
						name: "realestate",
						label: "housing and real estate",
						href: "/browse#realestate",
					},
					{
						name: "gifting",
						label: "gift items",
						href: "/browse#gifting",
					},
					{
						name: "food",
						label: "food stuff",
						href: "/browse#food",
					},
					{
						name: "kiddies",
						label: "kiddies",
						href: "/browse#kiddies",
					},
					{
						name: "stationery",
						label: "books and stationery",
						href: "/browse#stationery",
					},
					{
						name: "homefinishing",
						label: "furniture and home finishing",
						href: "/browse#homefinishing",
					},
					{
						name: "pets",
						label: "pets",
						href: "/browse#pets",
					},
					{
						name: "householditems",
						label: "household items",
						href: "/browse#householditems",
					},
				],
			}
		]}/>
	</div>
	
	<UtilityNav
	classes="w-1/3"
	options={[
		{
			name: "",
			label: "",
			href: "",
		},
		{
			name: "",
			label: "",
			href: "",
		},
		{
			name: "",
			label: "",
			href: "",
		}
	]}/>
</header>

{:else if $media.isMobile}

<header>
	<div class="flex w-full">

	</div>
</header>

{/if}

<slot />

{#if $media.isDesktop}

<footer class="bottom-0 flex flex-col items-center justify-center p-4">
	<LastUpdated />
</footer>

{:else}

<footer class="bottom-0 flex flex-col items-center justify-center p-4">
	<LastUpdated />
</footer>

{/if}
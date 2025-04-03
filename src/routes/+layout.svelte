<script lang="ts">
	import '../app.postcss';
	import LastUpdated from '$lib/components/LastUpdated.svelte';
	import MainNav from "$lib/components/MainNav.svelte"
	import { display } from '../stores/media';
	import MainLogo from '$lib/components/MainLogo.svelte';
	import UtilityNav from '$lib/components/UtilityNav.svelte';
	import BaseForm from '$lib/components/BaseForm.svelte';
	import { scale, slide } from 'svelte/transition';
	import { isUserNew } from '../stores/user';
	import { orderMode } from '../stores/order';
	import { isSearchEnabled } from '../stores/dom';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { setOrderMode } from '../services/order/index';
	import { setModal, setSearch } from '../services/dom';
	import { createAgentAccountModal, createSaleOrderWizard, modal } from '../stores/dom';
	import { modalActions, modals } from '$lib/consts/dom';
	import { orders } from '$lib/consts/app';
	import BaseModal from '$lib/components/BaseModal.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { Icon, MagnifyingGlass, XCircle, XMark } from 'svelte-hero-icons';
	import { onMount } from 'svelte';
	import { trackPageView } from '../services/analytics';

	let showSigninForm: boolean = false;
	let path: string = $page.url.pathname;
	
	if (path.length > 1) {
		isUserNew.set(false);
	}

	$: {
		if ($orderMode && $orderMode.type === "purchase" && !$orderMode.isProductSelected) {
			isSearchEnabled.set(true);
		} else {
			isSearchEnabled.set(false);
		}
	}

	if ($orderMode.enabled) {
		if ($orderMode.type === orders.SALE) {
			setModal(true, modals.DYNAMIC, $createSaleOrderWizard)
		}
		else if ($orderMode.type === orders.PURCHASE) {
			setModal(true, modals.SEARCH, null)
		}
	}
</script>

<ScrollToTop />
{#if $modal.enabled}
<div
in:slide
out:slide
on:click={() => {}}
class="h-full w-full fixed top-0 bottom-0 bg-black bg-opacity-80 z-20 flex items-center justify-center">
	{#if $modal.contentType === modals.DYNAMIC}
	<BaseModal
	config={$modal.content}
	/>
	{/if}
	{#if $modal.contentType === modals.STATIC}
	<BaseModal
	config={$modal.content}
	/>
	{/if}
</div>
{/if}

{#if $display.isDesktop && !$isUserNew}
<ProgressBar />
<header
in:slide
out:slide
class="flex flex-col w-full fixed top-0 z-50">
	<div
	class="flex w-full items-center justify-evenly bg-orange-600 text-white {$modal.enabled ? "" : "shadow-xl"}"
	style="height: 40px;">
		<div class="w-1/3 flex items-center justify-center h-full">
			<button
			type="button"
			on:click={() => goto("/")}>
				<MainLogo
				classes="rounded-md text-2xl px-8 py-2 h-9 shadow-inner shadow-lg"
				type="default" />
			</button>
		</div>
		<div class="w-1/3 h-full flex gap-4 items-center justify-center">
			<MainNav
			navListClasses=""
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
					href: "",
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
						{
							name: "hardware",
							label: "hardware",
							href: "/browse#hardware",
						},
						{
							name: "construction",
							label: "construction",
							href: "/browse#construction",
						},
					],
				}
			]}/>
			<button
			in:slide
			type="button"
			class="rounded-md p-2 {$isSearchEnabled && $modal.enabled ? "bg-white" : "bg-orange-600"}"
			on:click={() => setSearch(!$isSearchEnabled)}>
				<Icon src={MagnifyingGlass} class="w-5 h-5 {$isSearchEnabled && $modal.enabled ? "text-orange-600" : "text-white"}" solid />
			</button>
		</div>
		<div class="w-1/3 h-full flex flex-col items-center justify-center relative text-sm">
			<div>
				
			</div>
			<div
			class="flex items-center justify-center">
				<button
				type="button"
				class="text-white capitalize"
				on:click={() => showSigninForm = !showSigninForm}>
				log in
				</button>
				<UtilityNav
				classes=""
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
			</div>
			{#if showSigninForm}
			<div
			in:slide
			out:slide
			on:blur={() => showSigninForm = false}
			on:mouseleave={() => showSigninForm = false}
			class="absolute top-full z-50 bg-orange-600 rounded-b-lg shadow-lg p-6">
				<BaseForm
				classes="flex flex-col space-y-4 w-52"
				config={{
					name: "Log in",
					fields: [
						{
							name: "email",
							label: "email",
							type: "email",
							description: "",
							value: ""
						},
						{
							name: "password",
							label: "password",
							type: "password",
							description: "",
							value: ""
						},
					],
					buttons: [
						{
							name: "submit",
							label: "log in",
							classes: "variant-filled bg-white text-orange-600 text-sm capitalize hover:bg-black hover:text-white",
							type: "submit",
							onClick: () => {},
						},
						{
							name: "signup",
							label: "I don't have an account yet",
							classes: "text-sm text-white hover:text-black font-light",
							type: "button",
							onClick: () => setModal(true, modals.DYNAMIC, $createAgentAccountModal),
						}
					],
					onSubmit: () => {}
				}} />
			</div>
			{/if}
		</div>
	</div>
	{#if $modal.enabled && $isSearchEnabled }
	<div
	in:slide
	out:slide
	class="h-20 bg-orange-600 w-full z-40 flex items-end justify-center p-4">
		<input
		type="text"
		placeholder="tell us what you want"
		class="input capitalize rounded-lg w-1/2" />
	</div>
	{/if}
	{#if $modal.enabled}
	<button
	in:slide
	type="button"
	class="absolute capitalize py-2 px-4 mt-9 text-xs z-50 hover:bg-orange-600 self-start rounded-b-lg"
	on:click={() => { setModal(false, "", null); if ($isSearchEnabled) setSearch(false); }}>
	<Icon src={XMark} class="w-6 h-6 text-white" solid />
	</button>
	{/if}
</header>
{:else if $display.isMobile}

<header>
	<div class="flex w-full">

	</div>
</header>

{/if}

<slot />

{#if $display.isDesktop}

<footer class="w-full bottom-0 flex flex-col items-center justify-center z-40">
	<LastUpdated />
	<div class="bg-gray-800 text-white py-4 w-full">
		<div class="container mx-auto px-4 text-center">
		  <p>© 2023 o42. All rights reserved.</p>
		</div>
	</div>
</footer>

{:else}

<footer class="bottom-0 flex flex-col items-center justify-center p-4">
	<LastUpdated />
</footer>
<ScrollToTop />

{/if}
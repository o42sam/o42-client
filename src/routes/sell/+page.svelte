<script lang="ts">
    import StylizedName from "$lib/components/StylizedName.svelte";
	import { orders } from "$lib/consts/app";
	import { modals } from "$lib/consts/dom";
	import { setModal } from "../../services/dom";
	import { setOrderMode } from "../../services/order";
	import { createSaleOrderModal } from "../../stores/dom";

    const sell = () => {
        setOrderMode(orders.SALE, true);
        setModal(true, modals.DYNAMIC, $createSaleOrderModal);
    };
</script>

<svelte:head>
    <title>Sell on o42</title>
</svelte:head>

<main class="w-full bg-white mt-32">
    <div
    class="w-full flex flex-col items-center justify-center">
        <!-- Hero Section -->
        <section class="">
            <div class="container mx-auto px-4 w-2/3">
                <h1 class="text-4xl font-bold mb-4">Sell Your Items Seamlessly with <StylizedName /></h1>
                <p class="text-xl mb-8">Create a sale order and let our network of verified agents connect you with buyers for a hassle-free experience.</p>
                <a
                on:click={sell}
                class="button bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black">
                    Sell now
                </a>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="py-12  bg-gray-100 w-full mt-10">
        <div class="container mx-auto px-4 w-2/3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 class="text-2xl font-bold mb-4 text-orange-600">How It Works</h2>
                <p>Simply create a sale order with the details of your item. Our advanced algorithm matches it with interested buyers, and nearby agents take over—handling inspection, delivery, and ensuring everything goes smoothly.</p>
            </div>
            <div>
                <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="Seller creating a sale order" class="w-full h-auto rounded-lg shadow-md">
            </div>
            </div>
        </div>
        </section>

        <!-- Benefits Section -->
        <section class="py-12 bg-gray-100 w-full">
        <div class="container mx-auto px-4 w-2/3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="md:order-2">
                <h2 class="text-2xl font-bold mb-4 text-orange-600">Why Sell with <StylizedName />?</h2>
                <p>Tap into our vast network of buyers and agents to sell quickly. Enjoy a seamless process with secure payments and expert handling, all managed for you from start to finish.</p>
            </div>
            <div class="md:order-1">
                <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="Happy seller with secure payment" class="w-full h-auto rounded-lg shadow-md">
            </div>
            </div>
        </div>
        </section>

        <!-- Agent Verification Section -->
        <section class="py-12 bg-gray-100 w-full">
        <div class="container mx-auto px-4 w-2/3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 class="text-2xl font-bold mb-4 text-orange-600">Trusted Agents</h2>
                <p>Our agents are rigorously verified with personal identification and proof of address, ensuring your items are handled by reliable professionals committed to quality and safety.</p>
            </div>
            <div>
                <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="Agent verification badge" class="w-full h-auto rounded-lg shadow-md">
            </div>
            </div>
        </div>
        </section>

        <!-- Final CTA Section -->
        <section class="bg-orange-600 text-white py-20 w-full">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to Sell with Confidence?</h2>
            <p class="text-lg mb-8">Start selling today with us today and let our network make it effortless.</p>
            <a
            on:click={() => {setOrderMode("sale", true)}}
            class="button bg-white text-orange-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black hover:text-white">Make a sale order now</a>
        </div>
        </section>
    </div>
</main>
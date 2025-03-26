<script lang="ts">
    import StylizedName from "$lib/components/StylizedName.svelte";
    import { setOrderMode } from "../../services/order";
    import { setModal } from "../../services/dom";
    import { modals } from "$lib/consts/dom";
</script>
  
  <main class="bg-white mt-32">
    <div class="w-full flex flex-col items-center justify-center space-y-10">
    <!-- Hero Section: Text on Left, Image on Right -->
    <section class="flex flex-col md:flex-row items-center justify-between w-2/3">
        <div class="md:w-1/2 flex flex-col space-y-4 mx-10">
          <h1 class="text-4xl font-bold text-black">Buy with Confidence on <StylizedName /></h1>
          <p class="mt-4 text-lg">
            Create detailed purchase orders and let our network of verified agents find and deliver exactly what you need, seamlessly and securely.
          </p>
          <a
            on:click={() => { setOrderMode("purchase", true); setModal(true, modals.SEARCH, null) }}
            class="button text-white bg-orange-600 px-6 text-center hover:bg-black transition-colors"
          >
            Order Now
          </a>
          <p class="text-center">or</p>
          <a
            href="/browse"
            class="anchor text-white px-6 text-center transition-colors hover:text-black"
          >
            Browse available items
          </a>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0">
          <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="<StylizedName /> Buying Experience" class="w-full h-auto rounded-lg" />
        </div>
      </section>
    
      <!-- Section 1: Create Your Purchase Order (Image Left, Text Right) -->
      <section class="flex flex-col md:flex-row-reverse items-center justify-between p-8 w-2/3">
        <div class="md:w-1/2 space-y-4 mx-10">
          <h2 class="text-2xl font-semibold text-orange-600">Create Your Purchase Order</h2>
          <p class="mt-4">
            Specify exactly what you want with our easy-to-use purchase order form. Detail your item requirements, quantities, and delivery preferences to get started.
          </p>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0">
          <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="Purchase Order Form" class="w-full h-auto rounded-lg" />
        </div>
      </section>
    
      <!-- Section 2: Intelligent Matching (Text Left, Image Right) -->
      <section class="flex flex-col md:flex-row items-center justify-between p-8 w-2/3">
        <div class="md:w-1/2 space-y-4 mx-10">
          <h2 class="text-2xl font-semibold text-orange-600">Intelligent Matching</h2>
          <p class="mt-4">
            Our smart algorithm matches your purchase order with the best sellers in our network, ensuring you receive top-quality options tailored to your needs.
          </p>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0">
          <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="Matching Algorithm" class="w-full h-auto rounded-lg" />
        </div>
      </section>
    
      <!-- Section 3: Verified Agents (Image Left, Text Right) -->
      <section class="flex flex-col md:flex-row-reverse items-center justify-between p-8 w-2/3">
        <div class="md:w-1/2 space-y-4 mx-10">
          <h2 class="text-2xl font-semibold text-orange-600">Verified Agents</h2>
          <p class="mt-4">
            Our agents undergo rigorous verification, including personal ID and proof of address checks, to ensure your safety and the reliability of every transaction.
          </p>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0">
          <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="Verified Agent" class="w-full h-auto rounded-lg" />
        </div>
      </section>
    
      <!-- Section 4: Quality Assurance and Delivery (Text Left, Image Right) -->
      <section class="flex flex-col md:flex-row items-center justify-between p-8 w-2/3">
        <div class="md:w-1/2 space-y-4 mx-10">
          <h2 class="text-2xl font-semibold text-orange-600">Quality Assurance and Delivery</h2>
          <p class="mt-4">
            Our agents inspect every item to confirm it meets your specifications, then handle delivery, so you can trust in the quality and timeliness of your purchase.
          </p>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0">
          <img src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN" alt="Quality Delivery" class="w-full h-auto rounded-lg" />
        </div>
      </section>        
    </div>

  </main>
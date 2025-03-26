<script lang="ts">
    // Import the BaseProduct type from your types file
    import ReviewManager from '$lib/components/ReviewManager.svelte';
	import type { BaseOrder, SaleOrder } from '$lib/types/app/order';
	import { setOrderMode } from '../../../services/dom';
    
    // Define the product prop that will be passed to the page
    export let data: any;
    
    const order: SaleOrder = data.order;
    
    let product: any;
    if (order.products) {
        product = order.products[0];
    }
  </script>
  
  <div class="container mx-auto p-4 mt-14">
    <!-- Second Row: Product Details, Media, Reviews -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Left Column: Essential Product Details -->
        <div class="col-span-1 text-xs">
          <img
            src={product.images[0]}
            alt={product.name}
            class="w-full h-auto rounded-lg shadow-md mb-4 max-h-64 object-cover p-4"
          />
          <h1 class="text-2xl font-bold mb-0">{product.name}</h1>
            {#if product.condition.inspected}
            <span class="text-green-600 text-xs italic">Inspected</span>
            {:else}
            <span class="text-red-600 text-xs italic">Not yet inspected</span>
            {/if}
          <p class="text-lg font-semibold text-gray-900 mt-2">
            Price: {product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
          </p>
          <p class="text-gray-600 mb-2">Category: {product.category}</p>
          <p class="text-gray-800 mb-4">{product.description}</p>
          {#if product.condition}
            <p class="text-gray-600 mb-2">
              Condition: {product.condition.name}
            </p>
          {/if}
          <button
          type="button"
          class="capitalize button bg-orange-600 hover:bg-black text-white font-bold"
          on:click={() => setOrderMode("purchase", true, true)}>order now</button>
        </div>
    
        <!-- Middle Column: Videos and Additional Photos (Wider) -->
        <div class="col-span-1 md:col-span-2 text-xs">
                <!-- Top Row: Order Details -->
    <div class="mb-6 bg-gray-100 p-4 rounded-lg shadow-sm">
        <div class="flex flex-col items-start justify-center mb-4">
            <h2 class="text-xl font-semibold mb-0">Sale Order Details</h2>
            {#if order.agentsAssignedIds.length > 0 && !order.isFulfilled}
            <span class="text-xs text-gray-500 italic">This order has been assigned to our agents</span>
            {:else}
            <span class="text-xs text-gray-500 italic">This order is yet to be assigned to an agent</span>
            {/if}
        </div>
        <div class="space-y-4 flex items-center justify-between">
            {#if order.description}
            <div>
                <p class="font-semibold">Description</p>
                <span class="text-xs">{order.description}</span>
            </div>
            {/if}
        </div>
          {#if product.location}
           <p class="text-gray-600 mt-4">Location: {product.location}</p>
          {/if}
      </div>
          {#if product.videos && product.videos.length > 0}
            <div class="space-y-4 mb-6">
              {#each product.videos as video}
                <!-- Assuming videos are YouTube IDs; adjust if URLs differ -->
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video}`}
                  title="Product video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="rounded-lg shadow-md"
                ></iframe>
              {/each}
            </div>
          {/if}
          {#if product.images && product.images.length > 1}
            <div class="grid grid-cols-2 gap-4">
              {#each product.images.slice(1) as image}
                <img
                  src={image}
                  alt="Additional product image"
                  class="w-full h-auto rounded-lg shadow-md"
                />
              {/each}
            </div>
          {/if}
          {#if !product.videos && product.images.length < 2}
          <p class="text-xl font-bold">No additional images or videos were provided for this item</p>
          {/if}
        </div>
    
        <!-- Right Column: Reviews Placeholder -->
        <div class="col-span-1">
          <ReviewManager target={product} classes=""/>
        </div>
      </div>
  
    <!-- Bottom Row: Similar Products (Vacant) -->
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-3">Similar Products</h2>
      <p class="text-gray-600">Similar products will be displayed here.</p>
      <!-- Left vacant as per instructions -->
    </div>
  </div>
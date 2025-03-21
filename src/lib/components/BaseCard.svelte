<script lang="ts">
    import type { BaseProductLite } from "$lib/types/app/product";
    import type { CustomerLite, AgentLite } from "$lib/types/app/user";
    import type { OrderLite } from "$lib/types/app/order";
    
    // Define the entity prop as a union type with a type discriminator
    export let entity: 
        | { type: 'product'; data: BaseProductLite }
        | { type: 'user'; data: CustomerLite | AgentLite }
        | { type: 'order'; data: OrderLite };
    export let classes: string;
    export let imageClasses: string;
</script>

<div class="bg-white shadow-md rounded-lg p-4 {classes}">
    {#if entity.type === 'product'}
        <img src={entity.data.image} alt={entity.data.name} class="w-full object-cover {imageClasses}" />
        <h3 class="text-sm font-semibold mt-2 uppercase">{entity.data.name}</h3>
        {#if entity.data.condition}
            <p class="text-gray-600 text-xs">{entity.data.condition.name}</p>
        {/if}
        <span class="text-black font-bold text-sm">
            {entity.data.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
        </span>
    {:else if entity.type === 'user'}
        {#if 'profilePhoto' in entity.data}
            <img src={entity.data.profilePhoto} alt={entity.data.username} class="w-full object-cover {imageClasses}" />
        {:else}
            <img src="/user-placeholder.jpg" alt="User" class="w-full object-cover {imageClasses}" />
        {/if}
        <h3 class="text-sm font-semibold mt-2 uppercase">{entity.data.username}</h3>
    {:else if entity.type === 'order'}
        <img src="/order-placeholder.jpg" alt="Order" class="w-full object-cover {imageClasses}" />
        <h3 class="text-sm font-semibold mt-2 uppercase">{entity.data.name}</h3>
        {#if entity.data.type}
            <p class="text-gray-600 text-xs">Type: {entity.data.type}</p>
        {/if}
        {#if entity.data.finalPrice}
            <span class="text-black font-bold text-sm">
                Final Price: {entity.data.finalPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </span>
        {/if}
    {/if}
</div>
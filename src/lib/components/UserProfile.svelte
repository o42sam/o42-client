<script lang="ts">
    import type { Customer, Agent } from '$lib/types/app/user';
    import Star from './Star.svelte';
    import Carousel from './Carousel.svelte';
	import { setOrderMode } from '$lib/utils/page';
    import { products } from '$lib/mock';
	import ProductCard from './BaseCard.svelte';
	import CheckMark from './CheckMark.svelte';
	import ConversationManager from './ConversationManager.svelte';
	import ReviewManager from './ReviewManager.svelte';
    
    // Define the user prop as a union of Customer or Agent
    export let user: Customer | Agent;
    export let classes: string = "";
    
    // Type guard to check if the user is an Agent
    function isAgent(user: Customer | Agent): user is Agent {
        return 'dob' in user && 'phoneNumber' in user;
    }
    </script>
    
    <div class="mx-auto p-4 mt-20 {classes}">
        <div class="flex justify-between items-start">
            <!-- Left Column: Profile Details -->
            <div class="w-1/4 text-xs" style="height: 500px;">
                <div class="bg-white  p-4 h-full">
                    <!-- Profile Photo -->
                    <div class="flex justify-center">
                        <img
                            src={user.profilePhoto || 'default-photo.jpg'}
                            alt="Profile"
                            class="w-32 h-32 rounded-full object-cover"
                        />
                    </div>
                    <!-- Name -->
                    <div class="flex items-center justify-center space-x-2">
                        <p class="text-center text-2xl font-bold">
                            {user.fName} {user.lName}
                        </p>
                        {#if isAgent(user) && user.isEmailVerified && user.isPhoneNumberVerified && user.isPersonalIdVerified}
                        <CheckMark />
                        {/if}
                    </div>
                    
                    <!-- Contact Information -->
                    <div class="mt-4">
                        <p><strong>Email:</strong> {user.email}</p>
                        {#if isAgent(user) && user.phoneNumber}
                            <p><strong>Phone:</strong> {user.phoneNumber}</p>
                        {/if}
                        {#if user.location}
                            <p><strong>Location:</strong> {user.location}</p>
                        {/if}
                    </div>
                    <!-- Agent-Specific Details -->
                    {#if isAgent(user)}
                        <div class="mt-4">
                            <p><strong>About:</strong> {user.about}</p>
                            <p>
                                <strong>Tier:</strong>
                                {user.tier.name} - {user.tier.description}
                            </p>
                        </div>
                    {/if}
                    <div class="flex flex-col space-y-2 w-full items-center justify-evenly">
                        <button
                        type="button"
                        class="button bg-orange-600 text-white capitalize my-2 w-full"
                        on:click={() => {}}>
                            edit profile
                        </button>
                        <button
                        type="button"
                        class="button bg-black text-white capitalize my-2 w-full"
                        on:click={() => {}}>
                            account settings
                        </button>
                    </div>
                </div>
            </div>
        <div class="flex items-start justify-center w-3/4">
            {#if isAgent(user)}
            <!-- Placeholder for Future Content -->
            <div class="bg-white p-4 w-2/3 space-y-4" style="height: 500px;">
                <div
                class="">
                    <button
                    type="button"
                    class="button capitalize bg-orange-600 text-white hover:bg-black font-bold"
                    on:click={() => setOrderMode("sale", true)}>
                        new sale order
                    </button>
                </div>
                <div class="h-full w-full">
                    <Carousel
                    title="Sale Orders"
                    entityType="product"
                    classes=""
                    cardClasses="w-15 h-36"
                    imageClasses="h-14"
                    items={products} />
                    <Carousel
                    title="Purchase Orders"
                    entityType="product"
                    classes=""
                    cardClasses="w-15 h-36"
                    imageClasses="h-14"
                    items={products} />
                </div>
            </div>
            <!-- Reviews Section -->
            <div class="w-1/3">
                <div class=" p-4 mb-4 bg-white" style="height: 500px">
                    <ConversationManager classes="h-full" currentUserId={user.id} messages={user.messages ? user.messages : null} />
                </div>
                <ReviewManager classes="" target={user} />
            </div>
            
            {/if}
        </div>
        </div>
    </div>
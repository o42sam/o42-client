<script lang="ts">
    import type { Customer, Agent } from '$lib/types/app/user';
    import Carousel from './Carousel.svelte';
	import { setOrderMode } from '../../services/order';
    import { products } from '$lib/mock';
	import CheckMark from './CheckMark.svelte';
	import ConversationManager from './ConversationManager.svelte';
	import ReviewManager from './ReviewManager.svelte';
    import { Icon, MapPin, Phone, Envelope } from "svelte-hero-icons";
	import { setModal } from '../../services/dom';
	import { modals } from '$lib/consts/dom';
	import { EditProfileModal, SettingsModal } from '../../stores/dom';

    export let user: Customer | Agent;
    export let classes: string = "";
    
    function isAgent(user: Customer | Agent): user is Agent {
        return 'dob' in user && 'phoneNumber' in user;
    }

    const openSettings = () => {
        setModal(true, modals.STATIC, $SettingsModal);
    }

    const openProfileEdit = () => {
        setModal(true, modals.STATIC, $EditProfileModal);
    }
</script>
    
    <div class="mx-auto p-4 mt-20 {classes}">
        <div class="flex justify-between items-start">
            <!-- Left Column: Profile Details -->
            <div class="w-1/4 text-xs" style="height: 500px;">
                <div class="p-4 h-full">
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
                        <div class="flex flex-col items-start justify-start">
                            <p class="flex justify-end gap-1">
                                <Icon src="{Envelope}" micro size="16"/>
                                <span>{user.email}</span>
                            </p>
                            {#if isAgent(user) && user.phoneNumber}
                            <p class="flex gap-1">
                                <Icon src="{Phone}" micro size="16"/> 
                                <span>{user.phoneNumber}</span>
                            </p>
                            {/if}
                        </div>
                        {#if user.location}
                            <p class="flex justify-start items-start gap-1">
                                <Icon src="{MapPin}" micro size="16" />
                                <span class="self end">
                                    {user.location}
                                </span>
                            </p>
                        {/if}
                    </div>
                    <!-- Agent-Specific Details -->
                    {#if isAgent(user)}
                        <div class="mt-4">
                            <div>
                                <strong>About</strong> 
                                <p>{user.about}</p>
                            </div>
                        </div>
                    {/if}
                    <div class="flex flex-col space-y-2 w-full items-center justify-evenly">
                        <button
                        type="button"
                        class="button bg-orange-600 text-white capitalize my-2 w-full"
                        on:click={openProfileEdit}>
                            edit profile
                        </button>
                        <button
                        type="button"
                        class="button bg-black text-white capitalize my-2 w-full"
                        on:click={openSettings}>
                            settings
                        </button>
                    </div>
                </div>
            </div>
        <div class="flex items-start justify-center w-3/4">
            {#if isAgent(user)}
            <!-- Placeholder for Future Content -->
            <div class="p-4 w-2/3 space-y-4" style="height: 500px;">
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
                <p class="text-lg font-bold">Messages</p>
                <div class=" p-4 mb-4" style="height: 500px">
                    <ConversationManager classes="h-full" currentUserId={user.id} messages={user.messages ? user.messages : null} />
                </div>
                <ReviewManager classes="" target={user} />
            </div>
            
            {/if}
        </div>
        </div>
    </div>
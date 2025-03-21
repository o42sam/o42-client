<script lang="ts">
    import type { Message } from "$lib/types/app";
    import { groupMessagesByConversation } from "$lib/utils/helpers";
	import { scale, slide } from "svelte/transition";

    export let messages: Array<Message> | null;
    export let classes: string = "";
    export let currentUserId: any;
    $: sortedMessages = messages ? groupMessagesByConversation(messages, currentUserId) : null;

    let isConversationOpened: boolean = false;
    let selectedRecipient: string | null = null;

    function openConversation(recipient: string) {
        selectedRecipient = recipient;
        isConversationOpened = true;
    }

    function closeConversation() {
        isConversationOpened = false;
        selectedRecipient = null;
    }
</script>

{#if messages && sortedMessages}
    {#if isConversationOpened && selectedRecipient}
        <!-- Conversation View -->
        <div
        in:slide
        out:slide
        class="flex flex-col h-full p-2 bg-gray-100 text-xs {classes}">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">{selectedRecipient}</h2>
                <button
                    on:click={closeConversation}
                    class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                >
                    Close
                </button>
            </div>
            <div class="flex-1 overflow-y-scroll space-y-2 scroll-m-0 p-2">
                {#each sortedMessages[selectedRecipient] as message}
                    <div
                        class="p-2 rounded-lg max-w-[70%] {message.recipientId === selectedRecipient ? 'bg-orange-500 text-black' : 'ml-auto bg-gray-300 text-black'}"
                    >
                        {message.content}
                    </div>
                {/each}
            </div>
            <div class="mt-4 flex items-center">
                <input
                    type="text"
                    placeholder="Type a message"
                    class="flex-1 p-2 border rounded text-xs"
                />
                <button
                    class="ml-2 px-4 py-2 bg-black text-white rounded hover:bg-orange-600"
                >
                    Send
                </button>
            </div>
        </div>
    {:else}
        <!-- Recipient List View -->
        <div
        in:slide
        class="p-2 overflow-y-scroll text-xs scroll-m-0 scroll {classes}">
            <p class="text-lg font-bold mb-4">Messages</p>
            {#each Object.entries(sortedMessages) as [recipientId, messages], index (index)}
                {@const unreadCount = messages.filter(m => m.senderId === recipientId && !m.read).length}
                <div
                    class="p-3 mb-2 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
                    on:click={() => openConversation(recipientId)}
                >
                    <div class="flex justify-between items-center">
                        <span class="font-medium">{recipientId}</span>
                        {#if unreadCount > 0}
                            <span
                                class="ml-2 inline-flex items-center justify-center w-4 h-4 bg-orange-500 rounded-full text-white text-xs"
                            >
                                {unreadCount > 1 ? unreadCount : ''}
                            </span>
                        {/if}
                    </div>
                    <p class="text-sm text-gray-600 truncate">
                        {messages[messages.length - 1].content}
                    </p>
                </div>
            {/each}
        </div>
    {/if}
{:else}
    <p class="p-4 text-gray-500 h-full">No messages yet</p>
{/if}

<style>
    /* No additional styles needed since we're using Tailwind classes inline */
</style>
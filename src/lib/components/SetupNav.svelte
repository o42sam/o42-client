<script lang="ts">
	import type { SetupNav } from "$lib/types/dom/nav";
	import { SettingsModal } from "../../stores/dom";
    import { beforeUpdate, onMount } from "svelte";

    export let classes: string = "";
    export let config: SetupNav;

    let isInitialRender = true;
    let firstList: any;
    let currentList: any;
    let lastList: any;
    $: currentList = $SettingsModal.content.currentList;
    $: lastList = $SettingsModal.content.lastList;

    const changeCurrentList = (list: any) => {
        SettingsModal.set({...$SettingsModal, content: {...$SettingsModal.content, currentList: list}})
        if (!isInitialRender) {
            changeLastList();
            console.log("last list changed", $SettingsModal.content.lastList);
        }
    }

    const changeLastList = () => {
        SettingsModal.set({...$SettingsModal, content: {...$SettingsModal.content, lastList: currentList}})
    }

    onMount(() => {
        changeCurrentList(config.options);
        firstList = $SettingsModal.content.currentList;
    });
</script>

<div
class="flex flex-col w-full h-full">
    <div
    class="overflow-y-scroll w-full {classes}">
        {#each currentList as option, index (index)}
        {#if option.onChoose}
        <button
        type="button"
        class="flex flex-col items-start gap-1 hover:bg-gray-100 p-2 hover:shadow-md rounded-md hover:border-orange-600 {option.classes}"
        on:click={option.onChoose}>
            <span class="text-sm capitalize font-semibold">{option.name}</span>
            <span class="text-xs">{option.description}</span>
        </button>
        {:else}
        <button
        type="button"
        class="flex flex-col items-start gap-1 hover:bg-gray-100 p-2 hover:shadow-md rounded-md hover:border-orange-600 {option.classes}"
        on:click={() => { isInitialRender = false; changeCurrentList(option.options); }}>
            <span class="text-sm capitalize font-semibold">{option.name}</span>
            <span class="text-xs">{option.description}</span>
        </button>
        {/if}
        {/each}
    </div>
    <div
    class="">
        {#if currentList !== firstList}
        <button
        type="button"
        class="button capitalize py-2 px-4 mt-2 font-bold rounded-md bg-gray-300 text-black hover:bg-black hover:text-white"
        on:click={() => currentList = lastList}>
            back
        </button>
        {/if}
    </div>

</div>
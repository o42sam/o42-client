<script lang="ts">
    import type { MainNavOption } from"$lib/types/dom/nav";
    import { page } from"$app/stores";
	import { goto } from "$app/navigation";
    import { slide } from "svelte/transition";

    export let options: Array<MainNavOption>;
    export let type: string = "default";
    export let navListClasses: string;
    
    $: isCurrentOptionSelected = (currentOption: string) => {
        let path: string = `${$page.url.pathname}${$page.url.hash}`;
        return path.includes(currentOption);
    }
</script>

{#if type ==="default"}
<nav class="w-full h-full relative">
    <ul class="flex relative text-white h-full w-full items-center justify-evenly m-0 p-0 {navListClasses}">
        {#each options as option, index (index)}
        <li
        class="text-black flex flex-col items-center justify-center py-4 font-bold text-sm">
            {#if !option.children}
            <a class="{isCurrentOptionSelected(option.href) ? "cursor-default" : "anchor hover:animate-wiggle"} h-full w-full" href="{option.href}">
                {option.label}
            </a>
            {:else}
            <button
                type="button"
                class="{option.displayChildren ? "cursor-default" : "anchor hover:animate-wiggle"} h-full w-full"
                on:click={() => option.displayChildren = !option.displayChildren}>
                    {option.label}
            </button>
            {/if}
        </li>
        {#if option.children && option.displayChildren}
        <ul
        in:slide
        out:slide
        on:mouseenter={() => option.displayChildren = true}
        on:mouseleave={() => option.displayChildren = false}
        on:mouseup={() => option.displayChildren = false}
        on:blur={() => option.displayChildren = false}
        class="absolute top-full z-20 bg-orange-600 grid grid-cols-4 p-4 text-sm w-screen ml-11">
            {#each option.children as child, index (index)}
            <li class="{isCurrentOptionSelected(child.href) || child.displayChildren ? "text-black" : "hover:font-bold text-white"} flex flex-col items-start justify-center">
                {#if !child.children}
                <a class="{isCurrentOptionSelected(child.href) ? "cursor-default" : "anchor"} h-full p-4 w-full" href="{child.href}">
                    {child.label}
                </a>
                {:else}
                <button
                type="button"
                class="{isCurrentOptionSelected(child.href) ? "cursor-default" : "anchor"} h-full w-full"
                on:click={() => child.displayChildren = !child.displayChildren}>
                    {child.label}
                </button>
                {/if}
            </li>
            {#if child.children && child.displayChildren}
            <ul class="">
                {#each child.children as grandchild, index (index)}
                <li>
                    <a class="{isCurrentOptionSelected(grandchild.href) ? "cursor-default" : "anchor"} h-full w-full" href="{grandchild.href}">
                        {grandchild.label}
                    </a>
                </li>
                {/each}
            </ul>
            {/if}
            {/each}
        </ul>
        {/if}
        {/each}
    </ul>
</nav>

{:else if type ==="alt"}

{/if}
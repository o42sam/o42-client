<script lang="ts">
    import type { UtilityNavOption } from "$lib/types/dom/nav";

    export let options: Array<UtilityNavOption> = [];
    export let type: string = "default";
    export let classes: string;
</script>

{#if type === "default"}

<ul class="{classes}">
    {#each options as option, index (index)}
    <li class="">
        {#if option.href}
        <a href="{option.href}">
            {option.name}
        </a>
        {:else}
        <button
        type="button"
        class="anchor h-full w-full"
        on:click={option.onClick}>
            {option.label}
        </button>
        {/if}
    </li>
    {/each}
</ul>

{:else if type === "alt"}

<ul class="classes">
    {#each options as option, index (index)}
    <li class=""><a href="{option.href}">{option.name}</a></li>
    {/each}
</ul>

{/if}
<script lang="ts">
	import { goto } from "$app/navigation";

    import * as heroIcons from "svelte-hero-icons";
    import { NoSymbol, Icon } from "svelte-hero-icons";
</script>

<main
class="h-full w-full flex flex-col space-y-10 items-center justify-center">
    <Icon src={NoSymbol} size="150" class="text-red-600"/>
    <div
    class="flex flex-col space-y-4 items-center justify-center">
        <h1>
            The page you requested was not found
        </h1>
        <button
        type="button"
        class="button bg-orange-600 hover:bg-black text-white"
        on:click={() => goto("/")}>Go back home</button>
    </div>
</main>
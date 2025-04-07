<script lang="ts">
	import { beforeNavigate, goto } from "$app/navigation";
	import { modals } from "$lib/consts/dom";
	import { afterUpdate, beforeUpdate, onMount } from "svelte";
    import { setModal } from "../../../../services/dom";
    import { createAgentAccountModal } from "../../../../stores/dom";
    import { modal } from "../../../../stores/dom";

    let pageOpened: boolean = false;

    onMount(() => {
        setModal(true, modals.DYNAMIC, $createAgentAccountModal);
        pageOpened = true;
    });

    afterUpdate(() => {
        if (!$modal.enabled) {
            goto("/")
        }       
    })
</script>

<svelte:head>
    <title>{$createAgentAccountModal.name}</title>
</svelte:head>
<main
class="h-full">

</main>
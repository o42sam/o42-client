<script lang="ts">
	import { modals } from "$lib/consts/dom";
    import { setModal } from "../../../../services/dom";
    import { onMount, afterUpdate, beforeUpdate, onDestroy } from "svelte";
    import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
    import { createCustomerAccountModal, modal } from "../../../../stores/dom";

    let pageOpened: boolean = false;

    onMount(() => {
        setModal(true, modals.DYNAMIC, $createCustomerAccountModal);
        pageOpened = true;
    });

    afterUpdate(() => {
        if (!$modal.enabled && pageOpened) {
            goto("/");
        };
    });
    
</script>

<svelte:head>
    <title>{$createCustomerAccountModal.name}</title>
</svelte:head>

<main
class="h-full">
</main>
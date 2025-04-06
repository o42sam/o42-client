<script lang="ts">
	import { modals } from "$lib/consts/dom";
    import { setModal } from "../../../../services/dom";
    import { onMount, afterUpdate } from "svelte";
    import { goto } from "$app/navigation";
    import { createCustomerAccountModal, modal } from "../../../../stores/dom";
	import { isVisitorNew } from "../../../../stores/user";

    onMount(() => {
        setModal(true, modals.DYNAMIC, $createCustomerAccountModal);

        if (!$modal.enabled) {
            goto("/")
        }

        isVisitorNew.set(false);
    })

    afterUpdate(() => {
        if (!$modal.enabled) {
            goto("/")
        }       
    })
</script>

<svelte:head>
    <title>{$createCustomerAccountModal.name}</title>
</svelte:head>

<main
class="h-full">
</main>
<script lang="ts">
	import { goto } from "$app/navigation";
	import { modals } from "$lib/consts/dom";
	import { afterUpdate, onMount } from "svelte";
    import { setModal } from "../../../../services/dom";
    import { createAgentAccountModal } from "../../../../stores/dom";
    import { modal } from "../../../../stores/dom";
	import { isVisitorNew } from "../../../../stores/user";

    onMount(() => {
        setModal(true, modals.DYNAMIC, $createAgentAccountModal);

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
    <title>{$createAgentAccountModal.name}</title>
</svelte:head>
<main
class="h-full">

</main>
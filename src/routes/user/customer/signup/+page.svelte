<script lang="ts">
    import { createCustomerAccountModal, customerSignUpForm, modal } from "../../../../stores/dom";
	import BaseForm from "$lib/components/BaseForm.svelte";
	import StylizedName from "$lib/components/StylizedName.svelte";
	import { setModal } from "../../../../services/dom";
	import { modals } from "$lib/consts/dom";
</script>

<svelte:head>
    <title>Create an o42 account</title>
</svelte:head>

<main
class="h-full w-full mt-20 flex flex-col items-center">
    <h1 class="">
        Start Buying and Selling on <StylizedName />
    </h1>
    <div
    class="w-1/4">
        <BaseForm
        on:formSubmitted={() => setModal(true, modals.DYNAMIC, $createCustomerAccountModal)}
        config={$customerSignUpForm} />
    </div>
</main>
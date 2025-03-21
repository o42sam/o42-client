<script lang="ts">
    import type { BaseForm } from "$lib/types/dom/form";
    import { formFieldTypes, formProcesses, formTypes } from "$lib/consts/dom";
    import { getCountries } from "../../api/external";
    import { onMount } from "svelte";
    import { formProcessing } from "../../stores/dom";
    import { setFormProcessing } from "$lib/utils/page";
    import VerificationCodeInput from "./VerificationCodeInput.svelte";
    import { createEventDispatcher } from "svelte";
    import { createFormDataObject } from "$lib/utils/helpers";
    import LocationInput from "./LocationInput.svelte";
    import { fade } from "svelte/transition";
	import PhotoInput from "./PhotoInput.svelte";

    export let config: BaseForm;
    export let classes: string = "";
    export let type: string = formTypes.AUTH;

    let countries: { code: string; name: string }[] = [];
    let selectedCode = "+234";

    let dispatch = createEventDispatcher();

    onMount(async () => {
        countries = await getCountries();
    });

    // Validation function
    function validateField(field: any, value: any, selectedCode: any) {
        if (field.type === formFieldTypes.EMAIL) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(value);
            return { isValid, errorMessage: isValid ? "" : "Invalid email address" };
        } else if (field.type === formFieldTypes.PHONE) {            
            const isValid = /^\d+$/.test(value);
            return { isValid, errorMessage: isValid ? "" : "Phone number must be numeric" };
        } else {
            return { isValid: true, errorMessage: "" };
        }
    }

    // Track whether each field has been blurred
    let isBlurred = config.fields.map(() => false);

    // Reactively compute validation states for all fields
    $: validationStates = config.fields.map((field) => validateField(field, field.value, selectedCode));
</script>

<form
    id={config.id ? config.id : ""}
    class="{classes}"
    on:submit|preventDefault={() => dispatch('formSubmitted', createFormDataObject(config.fields))}
>
    {#if type === formTypes.CREATE && $formProcessing.enabled}
        <div
            class="absolute top-0 left-0 flex items-center justify-center bg-black z-50 w-full h-full bg-opacity-80 text-xs"
        >
            {#if $formProcessing.process === formProcesses.EMAIL_VERIFICATION}
                <div class="bg-white p-6 flex flex-col space-y-4 rounded-lg shadow-xl">
                    <p>Enter the code we sent to your email to verify that it is yours</p>
                    <VerificationCodeInput on:complete={() => {}} />
                </div>
            {:else if $formProcessing.process === formProcesses.PHONE_VERIFICATION}
                <div class="bg-white p-6 flex flex-col space-y-4 rounded-lg shadow-xl">
                    <p>Enter the code we sent to your phone number to verify that it is yours</p>
                    <VerificationCodeInput on:complete={() => {}} />
                </div>
            {/if}
        </div>
    {/if}
    {#each config.fields as field, index (index)}
        <label class="label capitalize text-xs {field.labelClasses}">
            {field.label}
            {#if field.type === formFieldTypes.EMAIL}
                <input
                    title={field.description}
                    type="email"
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses} {!validationStates[index].isValid ? 'border-red-500 bg-red-100' : ''}"
                    bind:value={field.value}
                    on:blur={() => (isBlurred[index] = true)}
                />
                {#if !validationStates[index].isValid && isBlurred[index]}
                    <span class="text-red-500 text-xs mt-1 italic" transition:fade>{validationStates[index].errorMessage}</span>
                {/if}
            {:else if field.type === formFieldTypes.TEXT}
                <input
                    title={field.description}
                    type="text"
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses}"
                    bind:value={field.value}
                />
            {:else if field.type === formFieldTypes.DATE}
                <input
                    title={field.description}
                    type="date"
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses}"
                    bind:value={field.value}
                />
            {:else if field.type === formFieldTypes.PASSWORD}
                <input
                    title={field.description}
                    type="password"
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses}"
                    bind:value={field.value}
                />
            {:else if field.type === formFieldTypes.SELECT && field.options}
                <select
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses}"
                    bind:value={field.value}
                >
                    {#each field.options as option, index (index)}
                        <option value={option.value}>{option.name}</option>
                    {/each}
                </select>
            {:else if field.type === formFieldTypes.PHONE}
                <div class="flex gap-2 my-1 ">
                    <select
                        bind:value={selectedCode}
                        class="border rounded px-2 py-1 bg-gray-50 text-gray-800 w-20 text-xs"
                    >
                        {#each countries as country}
                            <option value={country.code}>({country.code})</option>
                        {/each}
                    </select>
                    <input
                        type="tel"
                        bind:value={field.value}
                        placeholder="Enter phone number"
                        class="input rounded-md text-xs text-black {field.inputClasses} {!validationStates[index].isValid ? 'border-red-500 bg-red-100' : ''}"
                        on:blur={() => (isBlurred[index] = true)}
                    />
                </div>
                {#if !validationStates[index].isValid && isBlurred[index]}
                    <p class="text-red-500 text-xs mt-1 italic" transition:fade>{validationStates[index].errorMessage}</p>
                {/if}
            {:else if field.type === formFieldTypes.LOCATION}
                <LocationInput />
            {:else if field.type === formFieldTypes.PHOTO}
            <PhotoInput bind:value={field.value} classes={field.inputClasses} />
            <span class="text-xs text-gray-400 font-light italic text-center">{field.description}</span>
            {/if}
        </label>
    {/each}
    {#if config.buttons}
        {#each config.buttons as button, index (index)}
            <button
                type={button.type === "submit" ? "submit" : "button"}
                class="btn rounded-md {button.classes}"
                on:click={button.onClick}
            >
                {button.label}
            </button>
        {/each}
    {/if}
</form>
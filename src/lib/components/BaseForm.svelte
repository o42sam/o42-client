<script lang="ts">
    import type { BaseForm, UserBasicInfoSubmission } from "$lib/types/dom/form";
    import { formFields, formProcesses, forms } from "$lib/consts/dom";
    import { getCountries } from "../../api/third-party";
    import { onMount } from "svelte";
    import { formProcessing } from "../../stores/dom";
    import { setFormProcessing } from "../../services/dom";
    import VerificationCodeInput from "./VerificationCodeInput.svelte";
    import { createEventDispatcher } from "svelte";
    import { createFormDataObject, updateFormObject } from "$lib/utils/helpers";
    import LocationInput from "./LocationInput.svelte";
    import { fade } from "svelte/transition";
    import PhotoInput from "./PhotoInput.svelte";
    import { startEmailVerification, startPhonenumberVerification } from "../../services/auth";
    import { Icon, Eye, EyeSlash } from "svelte-hero-icons";
    import VideoInput from "./VideoInput.svelte";

    export let config: BaseForm;
    export let classes: string = "";

    let form = config;
    let formData: UserBasicInfoSubmission | Record<string, string>;
    $: formData = createFormDataObject(form.fields);

    let countries: { code: string; name: string }[] = [];
    let selectedCode = "+234";

    let dispatch = createEventDispatcher();

    let passwordVisibilities: (boolean | null)[] = form.fields.map(field => field.type === formFields.PASSWORD ? false : null);

    function togglePasswordVisibility(index: number) {
        passwordVisibilities[index] = !passwordVisibilities[index];
    }

    function validateField(field: any, value: any, passwordMsg: string = "", formData: any) {
        if (field.type === formFields.EMAIL) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(value);
            return { isValid, errorMessage: isValid ? "" : "Invalid email address" };
        } else if (field.type === formFields.PHONE) {
            const isValid = /^\d+$/.test(value);
            return { isValid, errorMessage: isValid ? "" : "Phone number must be numeric" };
        } else if (field.type === formFields.PASSWORD) {
            if (field.isConfirmation) {
                const passwordValue = formData[field.confirmationFor];
                const isValid = value === passwordValue;
                return { isValid, errorMessage: isValid ? "" : "Passwords do not match" };
            } else {
                const minLength = 8;
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                const isValid = value.length >= minLength && hasUpperCase && hasLowerCase && hasSpecial;
                return { isValid, errorMessage: isValid ? "" : passwordMsg };
            }
        } else {
            return { isValid: true, errorMessage: "" };
        }
    }

    const hasNewEmailEntry = (data: any) => data.email && data.email !== "";
    const hasNewPhonenumberEntry = (data: any) => data.phonenumber !== null && data.phonenumber !== "";

    let isBlurred = form.fields.map(() => false);

    const onSelectFieldOptionChange = (event: any) => {
        let selectOptionValue = event.target.value;
        form = updateFormObject(form, "value", selectOptionValue, obj => ({ ...obj, isSelected: true }));
    };

    $: validationStates = form.fields.map((field) => validateField(field, field.value, field.description, formData));

    const submitForm = async () => {
        const allValid = validationStates.every(state => state.isValid);
        if (!allValid) {
            console.log("Form has validation errors");
            return;
        }

        const formData = createFormDataObject(form.fields);

        if (hasNewEmailEntry(formData)) {
            setFormProcessing(true, formProcesses.EMAIL_VERIFICATION);
            const result = await startEmailVerification(formData.email);
            console.log(`Email verification start result: ${result}`);
        }

        if (hasNewPhonenumberEntry(formData) && formData.phonenumber) {
            setFormProcessing(true, formProcesses.PHONE_VERIFICATION);
            const result = await startPhonenumberVerification(formData.phonenumber);
            console.log(`Phone verification start result: ${result}`);
        }

        dispatch('formSubmitted', formData);
    };

    // Google OAuth
    let googleAuthInitialized = false;
    let gapi: any;

    // Facebook OAuth
    let facebookAuthInitialized = false;
    let FB: any;

    let isButtonDisabled = (buttonName: string) => {
        if (buttonName === "fbAuth") {
            return !facebookAuthInitialized
        }
        else if (buttonName === "googleAuth") {
            return !googleAuthInitialized
        }
        return false;
    }

    onMount(async () => {
        countries = await getCountries();

        // Load Google Platform Library
        const googleScript = document.createElement('script');
        googleScript.src = 'https://apis.google.com/js/platform.js';
        googleScript.async = true;
        googleScript.onload = () => {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: '', // Replace with your Google Client ID
                    scope: 'profile email',
                }).then(() => {
                    googleAuthInitialized = true;
                }).catch((error: any) => {
                    console.error('Error initializing Google Auth:', error);
                });
            });
        };
        document.head.appendChild(googleScript);

        const facebookScript = document.createElement('script');
        facebookScript.src = 'https://connect.facebook.net/en_US/sdk.js';
        facebookScript.async = true;
        facebookScript.onload = () => {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: '', // Replace with Facebook App ID
                    cookie: true,
                    xfbml: true,
                    version: 'v19.0'
                });
                facebookAuthInitialized = true;
            };
        };
        document.head.appendChild(facebookScript);
    });

    function signInWithGoogle() {
        if (!googleAuthInitialized) return;
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then((googleUser: any) => {
            const profile = googleUser.getBasicProfile();
            updateFormWithGoogleProfile(profile);
        }).catch((error: any) => {
            console.error('Error signing in with Google:', error);
        });
    }

    function updateFormWithGoogleProfile(profile: any) {
        form.fields = form.fields.map(field => {
            if (field.type === formFields.EMAIL) return { ...field, value: profile.getEmail() };
            if (field.type === formFields.TEXT && field.name === 'name') return { ...field, value: profile.getName() };
            return field;
        });
        formData = createFormDataObject(form.fields); // Update formData reactively
    }

    function signInWithFacebook() {
        if (!facebookAuthInitialized) return;
        FB.login((response: any) => {
            if (response.authResponse) {
                const accessToken = response.authResponse.accessToken;
                getFacebookProfile(accessToken);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'public_profile,email' });
    }

    function getFacebookProfile(accessToken: string) {
        FB.api('/me', { fields: 'id,name,email' }, (response: any) => {
            if (response && !response.error) {
                updateFormWithFacebookProfile(response);
            } else {
                console.error('Error fetching Facebook profile:', response.error);
            }
        });
    }

    function updateFormWithFacebookProfile(profile: any) {
        form.fields = form.fields.map(field => {
            if (field.type === formFields.EMAIL) return { ...field, value: profile.email || '' };
            if (field.type === formFields.TEXT && field.name === 'name') return { ...field, value: profile.name || '' };
            return field;
        });
        formData = createFormDataObject(form.fields); // Update formData reactively
    }
</script>

<form
    id={form.id ? form.id : ""}
    class="relative"
    on:submit|preventDefault={submitForm}
>
    <div
    class="{classes}">
    {#if $formProcessing.enabled}
        <div
            class="absolute top-0 left-0 flex items-center justify-center bg-black z-50 w-full h-full bg-opacity-80 text-xs"
        >
            {#if $formProcessing.process === formProcesses.EMAIL_VERIFICATION}
                <div class="bg-white p-6 flex flex-col space-y-4 rounded-lg shadow-xl">
                    <p>Enter the code we sent to your email {formData.email} to verify that it is yours</p>
                    <VerificationCodeInput on:complete={() => {}} />
                    <div class="flex flex-col items-center justify-center gap-2">
                        <p class="">Didn't get verification code?</p>
                        <button
                            type="button"
                            class="anchor capitalize hover:underline"
                            on:click={() => startEmailVerification(formData.email)}
                        >
                            resend code
                        </button>
                    </div>
                </div>
            {:else if $formProcessing.process === formProcesses.PHONE_VERIFICATION}
                <div class="bg-white p-6 flex flex-col space-y-4 rounded-lg shadow-xl">
                    <p>Enter the code we sent to your phone number {formData.phonenumber} to verify that it is yours</p>
                    <VerificationCodeInput on:complete={() => {}} />
                    <div class="flex flex-col items-center justify-center gap-2">
                        <p class="">Didn't get verification code?</p>
                        <button
                            type="button"
                            class="anchor capitalize hover:underline"
                            on:click={() => startPhonenumberVerification(formData.phonenumber ? formData.phonenumber : "")}
                        >
                            resend code
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    {/if}
    {#each form.fields as field, index (index)}
        <label class="label text-xs {field.labelClasses}">
            <span class="capitalize">{field.label}</span>
            {#if field.type === formFields.EMAIL}
                <input
                    required
                    title={field.description}
                    type="email"
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses} {!validationStates[index].isValid ? 'border-red-500 bg-red-100' : ''}"
                    bind:value={field.value}
                    on:blur={() => (isBlurred[index] = true)}
                />
                <span class="text-xs mt-1 text-gray-400 font-light italic text-center">{field.description}</span>
                {#if !validationStates[index].isValid && isBlurred[index]}
                    <span class="text-red-500 text-xs mt-1 italic" transition:fade>{validationStates[index].errorMessage}</span>
                {/if}
            {:else if field.type === formFields.TEXT}
                <input
                    required
                    title={field.description}
                    type="text"
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses}"
                    bind:value={field.value}
                />
                <span class="text-xs mt-1 text-gray-400 font-light italic text-center">{field.description}</span>
            {:else if field.type === formFields.DATE}
                <input
                    required
                    title={field.description}
                    type="date"
                    class="input my-1 rounded-md text-xs text-black {field.inputClasses}"
                    bind:value={field.value}
                />
            {:else if field.type === formFields.PASSWORD}
                <div class="relative">
                    {#if passwordVisibilities[index]}
                    <input
                        required
                        title={field.description}
                        type="text"
                        class="input rounded-md text-xs text-black pr-10 {field.inputClasses} {!validationStates[index].isValid ? 'border-red-500 bg-red-100' : ''}"
                        bind:value={field.value}
                        on:blur={() => { isBlurred[index] = true; }}
                    />
                    {:else}
                    <input
                        required
                        title={field.description}
                        type="password"
                        class="input rounded-md text-xs text-black pr-10 {field.inputClasses} {!validationStates[index].isValid ? 'border-red-500 bg-red-100' : ''}"
                        bind:value={field.value}
                        on:blur={() => (isBlurred[index] = true)}
                    />
                    {/if}
                    <button
                        type="button"
                        class="absolute right-2 top-1/2 transform -translate-y-1/2"
                        on:click={() => togglePasswordVisibility(index)}
                    >
                        {#if passwordVisibilities[index]}
                            <Icon src="{EyeSlash}" class="h-5 w-5 text-gray-500" />
                        {:else}
                            <Icon src="{Eye}" class="h-5 w-5 text-gray-500" />
                        {/if}
                    </button>
                </div>
                {#if !validationStates[index].isValid && isBlurred[index]}
                    <span class="text-red-500 text-xs mt-1 italic text-wrap" transition:fade>{validationStates[index].errorMessage}</span>
                {/if}
            {:else if field.type === formFields.SELECT && field.options}
                <select
                    required
                    class="input my-1 rounded-md text-xs capitalize text-black {field.inputClasses}"
                    placeholder={field.description}
                    on:change={onSelectFieldOptionChange}
                    bind:value={field.value}
                >
                    <option value="">{field.value === "" ? `Choose ${field.name}` : field.value}</option>
                    {#each field.options as option, index (index)}
                        <option class={option.classes} value={option.value}>{option.name}</option>
                    {/each}
                </select>
                <span class="text-xs mt-1 text-gray-400 font-light italic text-center">{field.description}</span>
                {#each field.options as option, index (index)}
                    {#if option.onSelectedChildForm && option.isSelected}
                        <svelte:self form={option.onSelectedChildForm} classes={option.onSelectedChildForm.classes} />
                    {/if}
                {/each}
            {:else if field.type === formFields.PHONE}
                <div class="flex gap-2 my-1">
                    <select
                        bind:value={selectedCode}
                        class="border rounded px-2 py-1 bg-gray-50 text-gray-800 w-20 text-xs"
                    >
                        {#each countries as country}
                            <option value={country.code}>({country.code})</option>
                        {/each}
                    </select>
                    <input
                        required
                        type="tel"
                        bind:value={field.value}
                        placeholder={field.description}
                        class="input rounded-md text-xs text-black {field.inputClasses} {!validationStates[index].isValid ? 'border-red-500 bg-red-100' : ''}"
                        on:blur={() => (isBlurred[index] = true)}
                    />
                </div>
                {#if !validationStates[index].isValid && isBlurred[index]}
                    <p class="text-red-500 text-xs mt-1 italic" transition:fade>{validationStates[index].errorMessage}</p>
                {/if}
            {:else if field.type === formFields.LOCATION}
                <LocationInput />
            {:else if field.type === formFields.PHOTO}
                <PhotoInput bind:photos={field.value} classes={field.inputClasses} />
                <span class="text-xs mt-1 text-gray-400 font-light italic text-center">{field.description}</span>
            {:else if field.type === formFields.DESCRIPTION}
                <label class="">
                    <textarea
                        bind:value={field.value}
                        placeholder={field.description}
                        rows="4"
                        class="w-full px-3 py-2 text-gray-700 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-y"
                    ></textarea>
                </label>
            {:else if field.type === formFields.VIDEO}
                <VideoInput bind:video={field.value} />
                <span class="text-xs mt-1 text-gray-400 font-light italic text-center">{field.description}</span>
            {/if}
        </label>
    {/each}
    </div>
    {#if form.buttons}
    <div
    class="py-4 w-full {form.classes}">
        {#each form.buttons as button, index (index)}
            {#if button.name === "googleAuth" || button.name === "fbAuth"}
            <button
                type={button.type === "submit" ? "submit" : "button"}
                disabled={() => isButtonDisabled(button.name)}
                class="btn rounded-md capitalize {button.classes}"
                on:click={button.onClick}
            >
                {button.label}
            </button>
            {:else}
            <button
                type={button.type === "submit" ? "submit" : "button"}
                class="btn rounded-md capitalize {button.classes}"
                on:click={button.onClick}
            >
                {button.label}
            </button>            
            {/if}
        {/each}
    </div>
    {/if}
</form>
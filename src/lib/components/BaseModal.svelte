<script lang="ts">
    import type { BaseModal } from '$lib/types/dom/modal';
    import BaseForm from './BaseForm.svelte';
    import { modalViews } from '$lib/consts/dom';
	  import SetupNav from './SetupNav.svelte';
	import { Icon, XCircle } from 'svelte-hero-icons';
	import { setModal } from '../../services/dom';
	import { scale } from 'svelte/transition';
    
    export let config: BaseModal|null = null;
    export let classes: string = "";
    
    const steps: any = config ? config.steps : [];
    
    let currentStep = 0;

    function next() {
        if (currentStep < steps.length - 1) {
          currentStep++;
        }
    }

    function modalFormSubmitted(e: any) {
      const data = e.detail;

      next();
      steps[currentStep].onNext(data);
    }
</script>

{#if steps.length > 0 && config}
<div in:scale out:scale class="rounded-xl mx-auto p-4 w-2/3 bg-white flex flex-col justify-between mt-10 {classes}" style="height: 650px;">
  <h1 in:scale class="text-center mt-2 capitalize text-3xl text-green-800">{config.name}</h1>  
  <div class="py-1">
      <div class="flex flex-col items-center justify-center mb-4">
        <span class="text-xl font-bold text-black">{steps[currentStep].title}</span>
        <span class="text-sm text-black">{steps[currentStep].description}</span>
      </div>
      {#if steps.length > 1}
      <div class="flex items-center justify-center gap-2 text-xs">
        {#each steps as step, index}
          <div
            class="flex flex-col items-center {index <= currentStep
              ? 'text-orang-600'
              : 'text-gray-400'}"
          >
            <span
              class="step-number w-8 h-8 rounded-full flex items-center justify-center border-2 {index <= currentStep
                ? 'border-orange-600 bg-orange-100'
                : 'border-gray-400'}"
            >
              {index + 1}
            </span>
          </div>
        {/each}
      </div>
      {/if}
    </div>

    <div class="p-8 w-full h-full overflow-y-scroll">
      {#if steps[currentStep].contentType === modalViews.FORM}
      <BaseForm
      on:formSubmitted={modalFormSubmitted}
      config={steps[currentStep].contentConfig}
      classes={steps[currentStep].contentConfig.classes}/>
      {:else}
        {#if config?.content}
        <SetupNav config={config?.content.contentConfig}/>
        {/if}
      {/if}
    </div>
  
    <div class="flex justify-between mt-6 text-xs mb-0">
        {#if currentStep < steps.length - 1}
          {#if steps[currentStep].contentType === modalViews.FORM}
          <button
            type="submit"
            form={steps[currentStep].contentConfig.id ? steps[currentStep].contentConfig.id : ""}
            class="button bg-orange-600 text-xs text-white px-4 py-2 rounded hover:bg-black transition"
          >
            Next
          </button>
          {:else}
          <button
          type="button"
          class="button bg-orange-600 text-xs text-white px-4 py-2 rounded hover:bg-black transition"
          on:click={next}
        >
          Next
        </button>
        {/if}
      {:else}
        {#if steps[currentStep].contentType === modalViews.FORM}
        <button
          type="submit"
          form={steps[currentStep].contentConfig.id ? steps[currentStep].contentConfig.id : "undefined-node"}
          class="button bg-orange-600 text-xs text-white px-4 py-2 rounded hover:bg-black transition"
        >
          Done
        </button>
        {:else}
        <button
        type="button"
        form={steps[currentStep].contentConfig.id ? steps[currentStep].contentConfig.id : ""}
        class="button bg-orange-500 text-xs text-white px-4 py-2 rounded hover:bg-black transition"
        on:click={next}
      >
        Done
      </button>
      {/if}
      {/if}
    </div>
  </div>
  {:else}
  <div in:scale out:scale class="rounded-xl mx-auto p-4 w-1/2 bg-white flex flex-col justify-between mt-10 {classes}" style="height: 550px;">
    <div>
      <div class="flex flex-col items-center justify-center mb-4">
        <span class="text-xl mt-2 font-bold text-black">{config?.name}</span>
        <span class="text-sm text-black">{config?.description}</span>
      </div>
    </div>

    <div class="p-10 h-full text-xs">
        {#if config?.content}
        <SetupNav config={config?.content} classes="h-full flex flex-col gap-4"/>
        {/if}
    </div>
  </div>
  {/if}
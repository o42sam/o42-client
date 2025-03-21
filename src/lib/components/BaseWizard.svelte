<script lang="ts">
    import type { BaseWizard } from '$lib/types/dom/wizard';
	import BaseForm from './BaseForm.svelte';
	import { wizardStepContentTypes } from '$lib/consts/dom';
    
    export let config: BaseWizard|null = null;
    export let classes: string = "";
    
    const steps = config ? config.steps : [];
    
    let currentStep = 0;

    function next() {
        if (currentStep < steps.length - 1) {
          currentStep++;
        }
    }
  
    function previous() {
      if (currentStep > 0) {
        currentStep--;
      }
    }

    function wizardFormSubmitted(e: any) {
      const data = e.detail;

      steps[currentStep].onNext(data);
    }
  </script>
  
  <div class="rounded-xl mx-auto p-4 w-1/2 bg-white flex flex-col justify-between mt-10 {classes}" style="height: 550px;">
    <div>
      <div class="flex flex-col items-center justify-center mb-4">
        <span class="text-xl mt-2 font-bold text-black">{steps[currentStep].title}</span>
        <span class="text-sm text-black">{steps[currentStep].description}</span>
      </div>
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
    </div>
  
    <div class="p-6">
      {#if steps[currentStep].contentType === wizardStepContentTypes.FORM}
      <BaseForm
      on:formSubmitted={wizardFormSubmitted}
      config={steps[currentStep].contentConfig}
      type={steps[currentStep].contentConfig.type}
      classes={steps[currentStep].contentConfig.classes}/>
      {/if}
    </div>
  
    <div class="flex justify-between mt-6 text-xs mb-0">
      {#if currentStep > 0}
        <button
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          on:click={previous}
        >
          Previous
        </button>
      {:else}
        <div></div>
      {/if}
      {#if currentStep < steps.length - 1}
        <button
          class="button bg-orange-500 text-white px-4 py-2 rounded hover:bg-black transition"
          type={steps[currentStep].contentType === wizardStepContentTypes.FORM ? "submit" : "button"}
          form={steps[currentStep].contentType === wizardStepContentTypes.FORM && steps[currentStep].contentConfig.id ? steps[currentStep].contentConfig.id : ""}
          on:click={next}
        >
          Next
        </button>
      {:else}
        <button
          type={steps[currentStep].contentType === wizardStepContentTypes.FORM ? "submit" : "button"}
          form={steps[currentStep].contentType === wizardStepContentTypes.FORM && steps[currentStep].contentConfig.id ? steps[currentStep].contentConfig.id : ""}
          class="button bg-orange-500 text-white px-4 py-2 rounded hover:bg-black transition"
          on:click={steps[currentStep].contentType === wizardStepContentTypes.FORM ? () => {} : () => next()}
        >
          Finish
        </button>
      {/if}
    </div>
  </div>
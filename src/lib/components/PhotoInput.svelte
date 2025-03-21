<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ProfilePhotoPlaceholder from './ProfilePhotoPlaceholder.svelte';

  // Create dispatcher for custom events
  const dispatch = createEventDispatcher();

  // Prop for binding the image data URL
  export let value: string = '';
  export let classes: string = "";

  // Reactive image source: uses value if provided, else placeholder
  let imageSrc: string;
  $: imageSrc = value;
  console.log(imageSrc);

  // Reference to the file input element
  let fileInput: HTMLInputElement;

  // Function to programmatically trigger file input click
  function triggerFileInput() {
      fileInput.click();
  }

  // Handle file selection or camera capture and update the bound value
  function handleFileChange(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const dataUrl = e.target?.result as string;
              // Dispatch 'input' event to update the bound value
              dispatch('input', dataUrl);
          };
          reader.readAsDataURL(file);
      }
  }
</script>

<!-- Container with relative positioning -->
<div class="relative w-20 h-20 {classes}">
  <!-- Circular image display, clickable to trigger file input -->
  <div
      class="rounded-full overflow-hidden cursor-pointer"
      on:click={triggerFileInput}
  >
      {#if imageSrc.length > 1}
          <img
              src={imageSrc}
              alt="Profile photo"
              class="w-full h-full object-cover"
          />
      {:else}
          <ProfilePhotoPlaceholder />
      {/if}
  </div>

  <!-- Edit button positioned along the circle's border -->
  <button
      class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
      on:click={triggerFileInput}
  >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5 text-gray-600"
      >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
      </svg>
  </button>
</div>

<!-- Hidden file input with capture attribute -->
<input
  type="file"
  accept="image/*"
  capture="user"
  bind:this={fileInput}
  on:change={handleFileChange}
  style="display: none;"
/>
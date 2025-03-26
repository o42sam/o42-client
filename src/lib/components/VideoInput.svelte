<script lang="ts">
    import { onDestroy } from 'svelte';
  
    export let video: File | null = null;
    export let classes: string = "";

    let videoUrl: string | null = null;
  
    $: {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
        videoUrl = null;
      }
      if (video instanceof File) {
        try {
          videoUrl = URL.createObjectURL(video);
        } catch (error) {
          console.error('Failed to create object URL:', error);
        }
      }
    }
  
    onDestroy(() => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    });
  
    // Handle file selection
    function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        video = input.files[0]; // Update the exported video variable
        console.log('File selected:', video); // Debug log
      } else {
        video = null; // Reset if no file is selected
        console.log('No file selected');
      }
    }
  </script>
  
  <div class="flex items-center space-x-4 text-xs {classes}">
    <label
      for="video-input"
      class="relative w-20 h-20 rounded-lg border-2 border-dotted border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100"
    >
      <div class="absolute bottom-2 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6 text-gray-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
    </label>
  
    {#if videoUrl}
      <video src={videoUrl} controls class="max-w-32" >
            <track kind="captions" />
        </video>
    {/if}
  </div>
  
  <input
    type="file"
    accept="video/*"
    on:change={handleFileChange}
    class="hidden"
    id="video-input"
  />
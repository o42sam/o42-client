<!-- ProgressBar.svelte -->
<script lang="ts">
    import { onMount, beforeUpdate } from 'svelte';
    import { ProgressBar as SkeletonProgressBar } from '@skeletonlabs/skeleton';
    import { browser } from '$app/environment';
  
    let progress = 0;
    let isLoading = true;
  
    onMount(() => {
      if (!browser) return;
  
      const updateProgress = () => {
        if (document.readyState === 'complete') {
          progress = 100;
          setTimeout(() => {
            isLoading = false;
          }, 500);
        } else {
          progress = document.readyState === 'interactive' ? 75 : 25;
        }
      };
  
      updateProgress();
      window.addEventListener('load', updateProgress);
      document.addEventListener('readystatechange', updateProgress);
  
      return () => {
        window.removeEventListener('load', updateProgress);
        document.removeEventListener('readystatechange', updateProgress);
      };
    });
  
    beforeUpdate(() => {
      if (!browser && progress === 0) {
        progress = 25;
        isLoading = true;
      }
    });
  </script>
  
  {#if isLoading}
    <div class="fixed top-0 left-0 w-full z-50">
      <SkeletonProgressBar
        value={progress}
        max={100}
        meter="bg-orange-600"
        track="bg-gray-200"
        height="h-1"
      />
    </div>
  {/if}
<script lang="ts">
    import { Icon, User } from 'svelte-hero-icons';
    import { onMount } from 'svelte';
  
    // Props
    export let initials: string | null = null;
    export let color: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' = 'gray';
  
    // Variables to manage size
    let placeholder: any;
    let size = 0;
  
    // Function to calculate size based on parent
    function updateSize() {
      if (placeholder && placeholder.parentElement) {
        const parent = placeholder.parentElement;
        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;
        size = Math.min(parentWidth, parentHeight);
      }
    }
  
    // Set up size calculation on mount and observe parent resizing
    onMount(() => {
      updateSize();
      const observer = new ResizeObserver(updateSize);
      observer.observe(placeholder.parentElement);
      return () => observer.disconnect();
    });
  
    // Tailwind classes for background colors
    const colorClasses: Record<string, string> = {
      gray: 'bg-gray-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
    };
  
    // Reactive classes
    $: className = `rounded-full ${colorClasses[color]} text-white uppercase flex items-center justify-center`;
  </script>
  
  <div bind:this={placeholder} style="width: {size}px; height: {size}px;" class={className}>
    {#if initials}
      <span style="font-size: {size / 2.5}px;">{initials}</span>
    {:else}
      <Icon src={User} size={String(size / 2)} />
    {/if}
  </div>
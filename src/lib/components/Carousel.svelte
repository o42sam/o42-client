<script lang="ts">
  import { onMount } from 'svelte';
  import type { BaseProductLite } from '$lib/types/app/product';
  import type { CustomerLite, AgentLite } from '$lib/types/app/user';
  import Card from './BaseCard.svelte';

  export let title: string;
  export let items: Array<CustomerLite | AgentLite | BaseProductLite> = [];
  export let entityType: 'product' | 'user' | 'order';
  export let classes: string;
  export let cardClasses: string = '';
  export let imageClasses: string = '';
  export let n = 4;
  export let m = 5;

  let slides: any[] = [];
  $: {
    slides = [];
    for (let i = 0; i < items.length; i += n) {
      slides.push(items.slice(i, i + n));
    }
  }

  let current = 0;
  let timer: any;

  function startTimer() {
    timer = setInterval(() => {
      current = (current + 1) % slides.length;
    }, m * 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  onMount(() => {
    startTimer();
    return () => stopTimer();
  });

  function handleMouseOver() {
    stopTimer();
  }

  function handleMouseLeave() {
    startTimer();
  }
</script>

<div class="relative overflow-hidden p-2 {classes}" on:mouseover={handleMouseOver} on:mouseleave={handleMouseLeave}>
<p class="font-bold text-xl capitalize my-2">{title}</p>
<div class="flex transition-transform duration-500" style="transform: translateX(-{current * 100}%)">
  {#each slides as slide}
    <div class="flex" style="flex: 0 0 100%">
      {#each slide as item}
        <div class="flex-1 px-2">
          <Card entity={{ type: entityType, data: item }} classes={cardClasses} imageClasses={imageClasses} />
        </div>
      {/each}
    </div>
  {/each}
</div>
</div>
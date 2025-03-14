<script lang="ts">
    export let type: string = "default";
</script>

{#if type === "default"}

<img src="" alt="">

{:else if type === "alt"}

<img src="" alt="">

{/if}
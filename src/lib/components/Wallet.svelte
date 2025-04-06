<script lang="ts">
    export let type: string = "default";
</script>

{#if type === "default"}
<div
class="">
    
</div>
{:else if type === "alt"}
<div
class="">
    
</div>
{/if}
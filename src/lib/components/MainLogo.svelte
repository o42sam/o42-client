<script lang="ts">
    export let type: string = "default"
    export let classes: string = "text-7xl"
</script>

{#if type === "default"}

<span class="flex items-center justify-center poppins-bold text-black bg-white p-2 rounded-lg {classes}">o<span class="text-orange-600">42</span></span>

{:else if type === "alt"}

<div class="flex flex-col m-6 bg-white rounded-xl shadow-lg items-center justify-center {classes}">
    <span class="poppins-bold text-black {classes}">o<span class="text-orange-600">42</span></span>
    <span class="poppins-light uppercase text-orange-600 gap-6 text-xs flex justify-between items-center"><span>Buy</span><span>Sell</span><span>Earn</span></span>
</div>

{/if}
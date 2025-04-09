<script lang="ts">
    import Star from "./Star.svelte";
    
    export let target: any;
    export let classes: string = "";
</script>

<div class="p-4 mb-4 h-80 {classes}">
    <p class="text-md font-bold mb-2">Reviews</p>
    <div class="h-80 overflow-y-scroll overflow-hidden text-xs space-y-2">
        {#each target.reviews as review}
            <div class="bg-white border-b p-4 rounded-lg shadow-sm">
                <div class="flex items-center space-x-1">
                    <span class="sr-only">Rating: {review.rating} out of 5</span>
                    {#each [0, 1, 2, 3, 4] as i}
                        <svelte:component this={Star} filled={i < review.rating} />
                    {/each}
                </div>
                <p class="{review.comment ? "text-black" : "text-gray-400"}">{review.comment ? review.comment : "No comments"}</p>
            </div>
        {/each}
    </div>
</div>
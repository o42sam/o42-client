<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let code = Array(6).fill('');
    let inputs: HTMLInputElement[] = [];

    function handleInput(e: Event, index: number) {
        const input = e.target as HTMLInputElement;
        if (input.value.length === 1 && index < 5) {
            inputs[index + 1].focus();
        }
        if (index === 5 && input.value.length === 1) {
            dispatch('complete', code.join(''));
        }
    }

    function handleKeyDown(e: KeyboardEvent, index: number) {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            e.preventDefault();
            code[index - 1] = ''; // Clear previous digit
            inputs[index - 1].focus(); // Move focus back
        }
    }

    function handlePaste(e: ClipboardEvent) {
        const pasted = e.clipboardData?.getData('text').slice(0, 6).split('') || [];
        code = [...pasted, ...Array(6 - pasted.length).fill('')];
        inputs[Math.min(pasted.length, 5)].focus();
    }
</script>

<div class="flex gap-2 justify-center">
    {#each code as digit, i}
        <input
            bind:this={inputs[i]}
            bind:value={code[i]}
            type="text"
            maxlength="1"
            on:input={(e) => handleInput(e, i)}
            on:keydown={(e) => handleKeyDown(e, i)}
            on:paste={i === 0 ? handlePaste : undefined}
            class="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            autofocus={i === 0}
        />
    {/each}
</div>
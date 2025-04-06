<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import { user } from "../../stores/user";

    onMount(() => {
        if (!$user) {
            goto("/user/customer/signup")
        }
    });
</script>
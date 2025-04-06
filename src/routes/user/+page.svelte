<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import { user } from "../../stores/user";

    onMount(() => {
        if (!$user) {
            goto("/user/customer/signup");
        }
        else {
            if (user === null) {
                goto(`/user/customer/${$user.fName}${$user.lName}`);
            }
            else if (user !== null) {
                goto(`/user/agent/${$user.fName}${$user.lName}`);
            }
            else {
                goto(`/user/admin/${$user.fName}${$user.lName}`);
            }
        }
    });
</script>

<svelte:head>
    <title>User Page</title>
</svelte:head>
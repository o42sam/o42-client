<script lang="ts">
	import UserProfile from "$lib/components/UserProfile.svelte";
	
	export let data: any;
</script>

<svelte:head>
    <title>{`${data.agent1.fName} ${data.agent1.lName}`}</title>
</svelte:head>

<UserProfile user={data.agent1} />
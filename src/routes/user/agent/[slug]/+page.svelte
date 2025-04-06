<script lang="ts">
	import UserProfile from "$lib/components/UserProfile.svelte";
	
	export let data: any;
</script>

<UserProfile user={data.agent1} />
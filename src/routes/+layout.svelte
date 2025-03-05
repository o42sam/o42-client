<script lang="ts">
	import '../app.postcss';
	import { BUILD_DATE } from '$lib/last-updated';

	const lastUpdated = BUILD_DATE.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<header></header>
<main class="h-full">
	<slot />
</main>
<footer class="flex flex-col items-center justify-center">
	<p class="italic text-xs">Last Updated: {lastUpdated}</p>
</footer>

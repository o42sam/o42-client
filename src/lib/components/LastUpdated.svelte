<script lang="ts">
	const BUILD_DATE = import.meta.env.BUILD_DATE || '2025-03-17T16:34:00.000Z';
  	const buildDate = new Date(BUILD_DATE).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
  	});
</script>

<p class="italic text-xs p-4">Last Updated: {buildDate}</p>
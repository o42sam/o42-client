<script lang="ts">
    // Define constants for the SVG circle
    const cx = 50; // Center x-coordinate
    const cy = 50; // Center y-coordinate
    const r1 = 35; // Inner radius for the spiky circle
    const r2 = 45; // Outer radius for the spikes
    const numPoints = 24; // Number of points for 12 spikes (2 points per spike)
  
    // Variable to hold the path data for the spiky circle
    let pathData = '';
  
    // Reactive block to compute the spiky circle path
    $: {
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        // Calculate angle in radians
        const angle = (i * 360 / numPoints) * Math.PI / 180;
        // Alternate between inner and outer radius
        const radius = i % 2 === 0 ? r1 : r2;
        // Compute x and y coordinates
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        // Add point to the array with 2 decimal precision
        points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
      }
      // Create the path data string: Move to first point, line to others, close path
      pathData = `M ${points.join(' L ')} Z`;
    }
  </script>
  
<svg viewBox="0 0 100 100" class="w-6 h-6">
    <!-- Spiky circle path with black fill -->
    <path d={pathData} fill="black" />
    <!-- Checkmark path with white stroke, now centered -->
    <path d="M 35 50 L 45 60 L 65 40" stroke="white" stroke-width="10" fill="none" />
</svg>
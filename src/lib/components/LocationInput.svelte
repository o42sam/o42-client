<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();

    let states: { name: string }[] = [];
    export let selectedState = '';
  
    onMount(async () => {
      const response = await fetch('http://states-and-cities.com/api/v1/states');
      states = await response.json();
    });
  </script>
  
  <div class="mb-4">
    <select
      id="location"
      bind:value={selectedState}
      class="text-xs mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      <option value="">Select a state</option>
      {#each states as state}
        <option value={state.name}>{state.name}</option>
      {/each}
    </select>
  </div>

<!-- <script lang="ts">
    import { onMount } from 'svelte';
  
    let locations: NigerianLocation[] = [];
    let selectedLocation: string = '';
  
    interface NigerianLocation {
      state: string;
      city: string;
      town: string;
      fullLocation: string;
    }
  
    onMount(async () => {
      try {
        // Using free API from https://github.com/favourdev1/State-City-Api
        const response = await fetch('http://cityng.onlinewebshop.net/v1/state');
        const states = await response.json();
        
        locations = states.flatMap((state: any) => 
          state.cities.map((city: any) => ({
            state: state.name,
            city: city.name,
            town: city.towns?.[0] || city.name, // Fallback to city if no towns
            fullLocation: `${state.name}, ${city.name}, ${city.towns?.[0] || city.name}`
          }))
        );
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    });
  </script>
  
  <select 
    bind:value={selectedLocation}
    class="text-xs w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select a location</option>
    {#each locations as location}
      <option value={location.fullLocation}>
        {location.fullLocation}
      </option>
    {/each}
  </select> -->
import { writable } from 'svelte/store';

export const isUserNew = writable(true);

export const orderMode = writable({
    type: "",
    enabled: false,
    isProductSelected: false,
});

export const isSearchEnabled = writable(false);

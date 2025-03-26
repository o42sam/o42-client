import { writable } from "svelte/store";

export const orderMode = writable({
    type: "",
    enabled: false,
    isProductSelected: false,
});
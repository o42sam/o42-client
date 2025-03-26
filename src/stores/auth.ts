import { writable } from "svelte/store";

export const credentials = writable({
    type: "visitor",
    bearerAuth: "",
});
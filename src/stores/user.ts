import { writable, type Writable } from "svelte/store";
import type { BaseUser, Customer, Agent } from "$lib/types/app/user";

export const user: Writable<any> = writable(null);

export const isUserNew = writable(true);
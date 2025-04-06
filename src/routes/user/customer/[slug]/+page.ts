import { agent1 } from '$lib/mock/index.js';

export async function load({ params }) {
    // const { slug } = params;
    // const response = await fetch(`https://api.example.com/post/${slug}`);
    // const data = await response.json();
    return { agent1 };
}
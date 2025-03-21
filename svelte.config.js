import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte'],
    preprocess: [vitePreprocess()],
    kit: {
        adapter: adapter({
            pages: 'public',
            assets: 'public',
            fallback: 'index.html'
        })
    },
    vite: {
        publicDir: path.resolve('./static'),
        server: {
            // Ensure the dev server serves static files correctly
            fs: {
                allow: [
                    // Allow serving files from the project root and static folder
                    path.resolve('.'),
                    path.resolve('./static'),
                ],
            },
        },
        build: {
            // Ensure static files are included in the build output
            assetsDir: 'assets', // Default, but can be customized
        },
        define: {
            'import.meta.env.BUILD_DATE': JSON.stringify(new Date().toISOString())
        }
    }
};

export default config;
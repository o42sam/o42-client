import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

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
    define: {
      'import.meta.env.BUILD_DATE': JSON.stringify(new Date().toISOString())
    }
  }
};

export default config;
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { 
    adapter: adapter(),
    alias: {
      "@/*": "./path/to/lib/*",
    }, 
  },
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;

import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { o42Base } from './src/o42Base'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			animation: {
				wiggle: 'wiggle 0.5s ease-in-out infinite',
			  },
			  keyframes: {
				wiggle: {
				  '0%, 100%': { transform: 'rotate(-3deg)' },
				  '50%': { transform: 'rotate(3deg)' },
				},
			  },
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [
					o42Base,
				],
			},
		}),
	],
} satisfies Config;

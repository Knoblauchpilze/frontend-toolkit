import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitest.dev/config/#coverage-include
// https://vitest.dev/guide/coverage#coverage-setup
export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			reporter: ['json'],
			include: ['src/lib/**/*.{js,ts,svelte}'],
			exclude: ['**/index.ts']
		}
	}
});

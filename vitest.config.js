import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [jsconfigPaths(), react()],
	test: {
		globals: true,
		environment: 'jsdom',
	},
});

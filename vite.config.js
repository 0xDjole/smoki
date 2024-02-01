import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry point of your library
      name: 'Kaizen', // The name of the global variable when using a script tag
      fileName: (format) => `index.${format}.js`, // The file name for the output
    },
    rollupOptions: {
      external: ['svelte'], // Externalize Svelte to avoid bundling it
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
  },
})

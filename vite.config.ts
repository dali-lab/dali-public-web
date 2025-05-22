import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/notion': {
        target: 'https://api.notion.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/notion/, ''),
        headers: {
          'Notion-Version': '2022-02-22',
        },
      },
    },
  },
  preview: {
    proxy: {
      '/api/notion': {
        target: 'https://api.notion.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/notion/, ''),
        headers: {
          'Notion-Version': '2022-02-22',
        },
      },
    },
  },
});

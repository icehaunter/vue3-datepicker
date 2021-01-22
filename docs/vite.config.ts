import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['date-fns/locale', 'date-fns/fp']
  }
})
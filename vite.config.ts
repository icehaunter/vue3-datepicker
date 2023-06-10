import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/datepicker/Datepicker.vue'),
      name: 'Datepicker',
      formats: ['es', 'umd'],
      // the proper extensions will be added
      fileName: 'vue3-datepicker',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'date-fns', 'date-fns/fp', 'date-fns/locale'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'date-fns': 'date-fns',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue3-datepicker.css'
          return assetInfo.name!
        },
      },
    },
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    dts({
      entryRoot: 'src/datepicker',
      outputDir: 'dist/types',
    }),
  ],
  optimizeDeps: {
    include: ['date-fns/locale', 'date-fns/fp'],
  },
})

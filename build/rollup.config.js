import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-postcss'

export default {
  input: 'src/components/Datepicker.vue',
  output: {
    format: 'esm',
    file: 'dist/Datepicker.js'
  },
  external: ['vue', 'date-fns', 'date-fns/fp'],
  plugins: [
    typescript(),
    vue({ css: false }),
    css({
      extract: true,
      minimize: true
    }),
    // resolve(),
  ]
}
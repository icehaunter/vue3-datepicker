import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-postcss'
import path from 'path'

export default [
  {
    output: {
      format: 'esm',
      file: 'dist/vue3-datepicker.esm.js',
    },
    plugins: [
      typescript(),
      vue({ css: false }),
      css({
        extract: path.resolve('dist', 'vue3-datepicker.css'),
      }),
    ],
  },
  {
    output: {
      format: 'cjs',
      file: 'dist/vue3-datepicker.cjs.js',
      exports: 'default'
    },
    plugins: [
      typescript(),
      vue({ css: false }),
      css({
        extract: false,
        inject: false
      })
    ],
  },
].map((v) => ({
  ...v,
  input: 'src/datepicker/Datepicker.vue',
  external: ['vue', 'date-fns', 'date-fns/fp'],
}))

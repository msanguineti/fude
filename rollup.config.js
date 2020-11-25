import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          include: ['src/index.ts'],
          exclude: ['node_modules', 'test', 'lib', '**/*spec.ts'],
        },
      }),
      terser(/*{ format: { ecma: 2018, beautify: true } }*/),
    ],
  },
  // {
  //   input: 'src/codes.ts',
  //   output: [
  //     { file: 'codes.js', format: 'cjs' },
  //     { file: 'codes.mjs', format: 'es' },
  //   ],
  //   plugins: [
  //     typescript({
  //       tsconfigOverride: {
  //         include: ['src/codes.ts'],
  //         exclude: ['node_modules', 'test', 'lib', '**/*spec.ts'],
  //       },
  //     }),
  //     terser({ format: { ecma: 2018, beautify: true } }),
  //   ],
  // },
]

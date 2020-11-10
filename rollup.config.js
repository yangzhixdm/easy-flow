import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    commonjs(),
    eslint(),
    babel(),
    terser()
  ]
};

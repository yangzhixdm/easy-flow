import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'umd',
    name: 'EasyFlow'
  },
  plugins: [
    postcss({
      extensions: ['.css']
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**', 'assets/**']
    }),
    babel(
      {
        exclude: 'node_modules/**', // 防止打包node_modules下的文件
        runtimeHelpers: true       // 使plugin-transform-runtime生效
      }
    ),
    resolve(),
    commonjs()
  ]
}

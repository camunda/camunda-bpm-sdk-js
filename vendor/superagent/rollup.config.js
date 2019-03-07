import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'node_modules/superagent/lib/client',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    resolve({
      module: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      babelrc: false,
      plugins: [
        'inferno',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties'
      ],
      presets: [
        ['@babel/preset-env', {
          modules: false,
          targets: {
            browsers: ['ie >= 9']
          }
        }]
      ]
    })
  ]
};

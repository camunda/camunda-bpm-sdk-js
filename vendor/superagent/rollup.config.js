import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: [/*'node_modules/superagent/lib/client'*/'node_modules/superagent/lib/node/*.js', 'node_modules/superagent/lib/node/parsers/*.js'],
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    multiEntry(),
    json(),
    resolve({
      module: true,
      main: true,
      browser: true
    }),
    babel({
      babelrc: false,
      plugins: [
        'inferno',
        'transform-object-rest-spread',
        'transform-class-properties'
      ],
      presets: [
        ['env', {
          modules: false,
          targets: {
            browsers: ['ie >= 9']
          }
        }]
      ]
    }),
    commonjs()
  ]
};

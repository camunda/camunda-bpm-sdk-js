module.exports = function() {
  'use strict';

  var path = require('path');

  return {
    options: {},
    assets: {
      files: [
        // {
        //   expand: true,
        //   cwd: 'client',
        //   src: [
        //     '*.{ico,txt}',
        //     'index.html'
        //   ],
        //   dest: 'dist/'
        // }
      ]
    },
    builds: {
      files: [
        {
          cwd: path.resolve(__dirname, '../../dist/'),
          expand: true,
          src: '*.js',
          dest: path.resolve(__dirname, '../../')
        }
      ]
    }
  };
};

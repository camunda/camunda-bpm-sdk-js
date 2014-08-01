module.exports = function() {
  'use strict';

  return {
    options: {
      plugins: [
        'plugins/markdown'
      ],
      markdown: {
        parser: 'gfm'
      }
    },
    scripts: {
      options: {
        destination: 'documentation'
      },
      src: [
        'README.md',
        'lib/**/*.js'
      ]
    }
  };
};

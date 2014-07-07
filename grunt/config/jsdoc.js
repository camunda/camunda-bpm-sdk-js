module.exports = function() {
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

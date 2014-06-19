module.exports = function() {
  return {
    options: {
      // plugins: [
      //   'plugins/markdown'
      // ],
      // markdown: {
      //   parser: 'gfm'
      // }
    },
    scripts: {
      options: {
        destination: 'doc'
      },
      src: [
        'README.md',
        'lib/**/*.js'
      ]
    }
  };
};

module.exports = function() {
  return {
    options: {
      jshintrc: true
    },
    scripts: {
      files: {
        src: [
          'src/**/*.js'
        ]
      }
    },
    test: {
      files: {
        src: [
          'test/**/*.js'
        ]
      }
    }
  };
};

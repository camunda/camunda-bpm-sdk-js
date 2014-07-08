module.exports = function() {
  return {
    options: {
      jshintrc: true
    },
    scripts: {
      files: {
        src: [
          'lib/**/*.js'
        ]
      }
    },
    test: {
      files: {
        src: [
          'test/**/*Spec.js'
        ]
      }
    }
  };
};

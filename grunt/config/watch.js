module.exports = function(config) {
  config = config || {};

  return {
    options: {
      livereload: false
    },

    sources: {
      files: [
        'lib/**/*.js'
      ],
      tasks: [
        'newer:jshint',
        'jsdoc',
        'browserify'
      ]
    },

    jasmine_node: {
      files: [
        'lib/**/*.js',
        'test/jasmine_node/**/*.js'
      ],
      tasks: [
        'jasmine_node'
      ]
    // },

    // karma: {
    //   files: [
    //     'lib/**/*.js',
    //     'test/karma/**/*.js'
    //   ],
    //   tasks: [
    //     'jasmine_node'
    //   ]
    }
  };
};

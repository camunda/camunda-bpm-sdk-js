module.exports = function() {
  return {
    options: {
      singleRun: true,
      autoWatch: false,

      frameworks: ['jasmine'],

      files: [
        'node_modules/karma-jasmine/lib/jasmine.js',
        'node_modules/karma-jasmine/lib/adapter.js',

        {pattern: 'test/karma/**/*Spec.js', included: true},
        {pattern: 'dist/**/*.js', included: false},

        'test/karma/main.js'
      ],
      browsers: [
        // 'Chrome',
        // 'Firefox',
        'PhantomJS'
      ]
    },

    integration: {
      options: {}
    },

    dev: {
      options: {
        singleRun: false,
        autoWatch: true
      }
    }
  }
};

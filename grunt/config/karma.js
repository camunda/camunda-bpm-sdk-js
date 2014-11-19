module.exports = function() {
  'use strict';

  var singleRun = false;

  return {
    options: {
      singleRun: singleRun,
      autoWatch: !singleRun,

      frameworks: ['jasmine'],

      browsers: [
        'Chrome',
        'Firefox',
        'PhantomJS'
      ],

      files: []
    },

    'dev-form': {
      options: {

        browsers: [
          'Chrome'
        ],

        files: [
          {pattern: 'test/jquery-2.1.1.min.js', included: true},
          {pattern: 'dist/camunda-bpm-sdk.js', included: true},
          {pattern: 'dist/camunda-bpm-sdk-mock.js', included: true},

          {pattern: 'test/karma/forms/**/*.html', included: false},

          {pattern: 'test/karma/forms/**/*spec.js', included: true}
        ]
      }
    },

    'dev-form-angularjs': {
      options: {

        browsers: [
          'Chrome'
        ],

        files: [
          {pattern: 'test/jquery-2.1.1.min.js', included: true},
          {pattern: 'node_modules/angular/lib/angular.min.js', included: true},

          {pattern: 'dist/camunda-bpm-sdk-angular.js', included: true},
          {pattern: 'dist/camunda-bpm-sdk-mock.js', included: true},

          {pattern: 'test/karma/forms-angularjs/**/*.html', included: false},

          {pattern: 'test/karma/forms-angularjs/**/*spec.js', included: true}
        ]
      }
    }
  };
};

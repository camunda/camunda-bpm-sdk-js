// Usage:
//
// ```sh
// grunt karma
// ```
//
// or
//
// ```sh
// BROWSERS=PhantomJS TESTED=angular-forms-base grunt karma:dev-form-angularjs
// ```
module.exports = function() {
  'use strict';

  var singleRun = false;
  var tested = process.env.TESTED || '*';
  var browsers = process.env.BROWSERS ? process.env.BROWSERS.split(',') : ['Chrome'];

  return {
    options: {
      singleRun: singleRun,
      autoWatch: !singleRun,

      frameworks: ['browserify', 'mocha', 'chai'],

      browsers: [
        'Chrome',
        'Firefox',
        'PhantomJS'
      ],

      preprocessors: {
        'test/karma/**/*-spec.js': [ 'browserify' ]
      },

      files: []
    },

    'dev-form': {
      options: {

        browsers: browsers,

        files: [
          {pattern: 'test/jquery-2.1.1.min.js', included: true},
          {pattern: 'test/karma/forms/**/*.html', included: false},
          {pattern: 'test/karma/forms/**/' + tested + '-spec.js', included: true}
        ]
      }
    },

    'dev-form-angularjs': {
      options: {

        browsers: browsers,

        files: [
          {pattern: 'test/jquery-2.1.1.min.js', included: true},

          {pattern: 'test/karma/forms-angularjs/**/*.html', included: false},
          {pattern: 'test/karma/forms-angularjs/**/' + tested + '-spec.js', included: true}
        ]
      }
    }
  };
};

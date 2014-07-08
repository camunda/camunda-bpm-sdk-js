module.exports = function() {
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
          {pattern: 'dist/camunda-bpm-sdk.js', included: true},
          {pattern: 'dist/camunda-bpm-sdk-mock.js', included: true},
          {pattern: 'test/jquery-2.1.1.min.js', included: true},

          {pattern: 'dist/camunda-embedded-forms.js', included: true},

          {pattern: 'test/karma/forms/**/*.html', included: false},

          {pattern: 'test/karma/forms/**/*Spec.js', included: true}
        ]
      }
    },

    // 'dev-net': {
    //   options: {
    //     files: [
    //       {pattern: 'dist/camunda-bpm-sdk.js', included: true},

    //       {pattern: 'test/karma/net/**/*Spec.js', included: true}
    //     ]
    //   }
    // },

    watched: {
      options: {
        singleRun: !singleRun,
        autoWatch: singleRun,

        browsers: [
          'PhantomJS'
        ],

        files: [
          {pattern: 'dist/camunda-bpm-sdk.js', included: true},
          {pattern: 'dist/camunda-bpm-sdk-mock.js', included: true},
          {pattern: 'test/jquery-2.1.1.min.js', included: true},

          {pattern: 'dist/camunda-embedded-forms.js', included: true},

          {pattern: 'test/karma/forms/**/*.html', included: false},

          {pattern: 'test/karma/forms/**/*Spec.js', included: true}
        ]
      }
    }
  }
};

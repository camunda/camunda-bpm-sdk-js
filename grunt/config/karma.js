module.exports = function() {
  return {
    options: {
      singleRun: true,
      autoWatch: false,

      frameworks: ['jasmine'],

      files: [
        {pattern: 'dist/camunda-bpm-sdk.min.js', included: true},

        {pattern: 'test/karma/**/*Spec.js', included: true}
      ],
      browsers: [
        'Chrome',
        // 'Firefox',
        'PhantomJS'
      ]
    },

    dev: {
      options: {
        singleRun: false,
        autoWatch: true
      }
    }
  }
};

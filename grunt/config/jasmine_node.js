module.exports = function() {
  return {
    options: {
      forceExit: true,
      match: '.',
      matchall: false,
      extensions: 'js',
      specNameMatcher: 'Spec',
      captureExceptions: true,
      verbose: true,
      junitreport: {
        report: false,
        savePath : "./test/reports/",
        useDotNotation: true,
        consolidate: true
      }
    },

    unit: [
      process.env.JASMINE_TEST_ONLY ? 'test/jasmine_node/'+ process.env.JASMINE_TEST_ONLY +'Spec.js' : 'test/jasmine_node/**/*Spec.js'
    ]
  };
};

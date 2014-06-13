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
    unit: ['test/jasmine_node/**/*Spec.js']
  };
};

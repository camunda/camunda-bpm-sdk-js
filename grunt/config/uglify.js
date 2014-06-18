'use strict';
module.exports = function(config) {
  config = config || {};

  return {
    options: {},

    dist: {
      files: {
        'dist/camunda-bpm-sdk.min.js': ['dist/camunda-bpm-sdk.js']
      }
    }
  };
};

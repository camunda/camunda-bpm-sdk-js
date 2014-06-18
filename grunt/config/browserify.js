'use strict';
module.exports = function(config) {
  config = config || {};

  return {
    options: {
      livereload: false
    },

    sources: {
      options: {
        bundleOptions: {
          standalone: 'CamSDK'
        }
      },
      files: {
        'dist/camunda-bpm-sdk.js': ['./lib/index.js']
      }
    }
  };
};

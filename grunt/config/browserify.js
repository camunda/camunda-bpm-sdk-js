'use strict';
module.exports = function(config) {
  config = config || {};

  return {
    options: {
      bundleOptions: {
        standalone: 'CamSDK'
      }
    },

    dist: {
      files: {
        'dist/camunda-bpm-sdk.js': ['./lib/index.js']
      }
    // },

    // mocked: {
    //   options: {
    //     bundleOptions: {
    //       preBundleCB: function(browserify) {
    //         console.info('browserify', browserify);
    //       }
    //     }
    //   },
    //   files: {
    //     'dist/camunda-bpm-sdk.mocked.js': ['./lib/index.js']
    //   }
    }
  };
};

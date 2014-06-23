'use strict';
module.exports = function(config) {
  config = config || {};

  return {
    options: {
      bundleOptions: {
        standalone: 'CamSDK'
      }
    },

    mock: {
      files: {
        'dist/camunda-bpm-sdk-mock.js': [
          './lib/http-client-mock.js'
        ]
      }
    },

    dist: {
      files: {
        'dist/camunda-bpm-sdk.js': ['./lib/index.js']
      }
    }
  };
};

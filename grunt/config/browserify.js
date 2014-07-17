'use strict';
module.exports = function(config) {
  config = config || {};

  return {
    mock: {
      options: {
        bundleOptions: {
          standalone: 'CamSDKMocks'
        }
      },
      files: {
        'dist/camunda-bpm-sdk-mock.js': [
          './lib/api-client/http-client-mock.js'
        ]
      }
    },

    dist: {
      options: {
        bundleOptions: {
          standalone: 'CamSDK'
        }
      },
      files: {
        'dist/camunda-bpm-sdk.js': [
          './lib/api-client/index.js'
        ]
      }
    },

    forms: {
      options: {
        bundleOptions: {
          standalone: 'CamFormSDK'
        }
      },
      files: {
        'dist/camunda-embedded-forms.js': [
          './lib/forms/index.js'
        ]
      }
    }
  };
};

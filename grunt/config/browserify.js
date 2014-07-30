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
          './lib/index-browser.js'
        ]
      }
    },

    distAngular: {
      options: {
        bundleOptions: {
          standalone: 'CamSDK'
        },
        transform: [
          [ 'exposify',
            {
              expose: {
               // do not embed angular, instead, use window.angular
               'angular': 'angular',
              }
            }
          ]
        ]
      },
      files: {
        'dist/camunda-bpm-sdk-angular.js': [
          './lib/angularjs/index.js'
        ]
      }
    }
  };
};

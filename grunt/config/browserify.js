'use strict';
module.exports = function(config) {
  config = config || {};

  return {
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

    distTypeUtils: {
      options: {
        bundleOptions: {
          standalone: 'CamSDK.utils.typeUtils'
        }
      },
      files: {
        'dist/camunda-bpm-sdk-type-utils.js': [
          './lib/forms/type-util.js'
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

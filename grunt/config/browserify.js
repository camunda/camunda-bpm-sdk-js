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

    formsAngular: {
      options: {
        bundleOptions: {
          standalone: 'CamFormSDKAngularJS'
        },
        transform: [
          [ 'exposify',
            {
              // do not embed angular, instead, use window.angular
              expose: {
               'angular': 'angular',
               './../camunda-form': 'CamSDK.Form',
               './../../': 'CamSDK'
              }
            }
          ]
        ]
      },
      files: {
        'dist/camunda-bpm-sdk-angular.js': [
          './lib/forms/angularjs/index.js'
        ]
      }
    }
  };
};

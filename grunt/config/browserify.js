/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

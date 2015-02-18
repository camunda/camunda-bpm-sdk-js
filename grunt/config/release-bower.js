module.exports = function(config) {
  'use strict';

  var publishedFiles = [
    'camunda-bpm-sdk-angular.js',
    'camunda-bpm-sdk.js',
    'camunda-bpm-sdk.min.js'
  ];

  return {
    options: {
      main: 'camunda-bpm-sdk.js',
      endpoint: 'git@github.com:camunda/bower-camunda-bpm-sdk-js.git',
      packageName: 'camunda-bpm-sdk-js',
      commitMessage: 'chore(project): release <%= pkg.version %>',
      tagMessage: 'chore(project): release <%= pkg.version %>',
      push: !config.dryRun
    },
    release: {
      options: {
        branchName: 'master',
        createTag: true
      },
      files: [
        {
          expand: true,
          cwd: 'dist/',
          src: publishedFiles
        }
      ]
    },
    snapshot: {
      options: {
        branchName: '<%= pkg.version %>',
        createTag: false,
        forcePush: true
      },
      files: [
        {
          expand: true,
          cwd: 'dist/',
          src: publishedFiles
        }
      ]
    }
  };
};

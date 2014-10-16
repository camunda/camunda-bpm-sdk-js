module.exports = function() {
  'use strict';

  return {
    options: {
      main: 'camunda-bpm-sdk.js',
      endpoint: 'git@github.com:camunda/bower-camunda-bpm-sdk-js.git',
      packageName: 'camunda-bpm-sdk-js',
      commitMessage: 'chore(project): release <%= pkg.version %>',
      tagMessage: 'chore(project): release <%= pkg.version %>',
      push: '<%= !dryRun %>'
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
          src: ['**/*.js' ]
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
          src: ['**/*.js' ]
        }
      ]
    }
  };
};

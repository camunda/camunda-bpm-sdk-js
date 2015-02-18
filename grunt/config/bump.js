module.exports = function(config) {
  'use strict';

  return {
    options: {
      files: ['package.json', 'bower.json'],
      updateConfigs: ['pkg'],
      commitFiles: ['package.json', 'bower.json'],
      tagName: '%VERSION%',
      tagMessage: 'chore(project): tag %VERSION%',
      pushTo: 'origin',
      push: !config.dryRun
    },
    // just for bumping the version
    only: {
      options: {
        commit: false,
        createTag: false,
        push: false
      }
    },
    release: {
      options: {
        bumpVersion: false,
        commitMessage: 'chore(project): release %VERSION%'
      }
    },
    snapshot: {
      options: {
        bumpVersion: false,
        commitMessage: 'chore(project): new development version: %VERSION%',
        createTag: false
      }
    }
  };
};

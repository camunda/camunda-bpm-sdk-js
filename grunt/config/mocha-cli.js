module.exports = function() {
  'use strict';

  return {
    options: {
      reporter: 'spec'
    },
    client: ['test/client/**/*Spec.js']
  };
};

module.exports = function() {
  'use strict';

  return {
    options: {
      bump: false,
      add: false,
      commit: false,
      tag: false,
      push: false,
      pushTags: false,
      npm: false, // no npm publish
      npmtag: false
    }
  };
};

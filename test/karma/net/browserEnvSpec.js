'use strict';
var CamSDK = require('../../../lib/index-browser.js');

describe('The browser usage', function() {

  it('exists globally', function() {
    expect(CamSDK).to.not.be.undefined;
  });


  xit('can be required', function() {
    expect(require).to.not.be.undefined;

    expect(function() {
      var camSdk = require('camunda-bpm-sdk');
    }).not.to.throw();
  });

});

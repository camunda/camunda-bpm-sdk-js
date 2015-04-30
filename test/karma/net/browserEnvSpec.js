'use strict';
/* global CamSDK: false */
describe('The browser usage', function() {
  var camSdk;

  it('exists globally', function() {
    expect(CamSDK).to.not.be.undefined;
  });


  xit('can be required', function() {
    expect(require).to.not.be.undefined;

    expect(function() {
      camSdk = require('camunda-bpm-sdk');
    }).not.to.throw();
  });

});

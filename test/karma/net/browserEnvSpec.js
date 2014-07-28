'use strict';
/* global CamSDK: false */
describe('The browser usage', function() {
  var camSdk;

  it('exists globally', function() {
    expect(CamSDK).toBeDefined();
  });


  xit('can be required', function() {
    expect(require).toBeDefined();

    expect(function() {
      camSdk = require('camunda-bpm-sdk');
    }).not.toThrow();
  });

});

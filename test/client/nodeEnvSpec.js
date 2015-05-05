'use strict';
var expect = require('chai').expect;

describe('The node.js usage', function() {
  var CamundaClient;

  it('does not blow when loading', function() {
    expect(function() {
      CamundaClient = require('./../../lib/index');
    }).not.to.throw();
  });


  it('has to be configured', function() {
    expect(function() {
      new CamundaClient();
    }).to.throw();
  });


  describe('configuration', function() {
    it('needs a apiUri property', function() {
      expect(function() {
        new CamundaClient({});
      }).to.throw();
    });



  });
});

'use strict';
var expect = require('chai').expect;

describe('The ProcessInstance resource', function() {
  var ProcessInstance;

  it('does not blow when loading', function() {
    expect(function() {
      ProcessInstance = require('./../../../lib/api-client/resources/process-instance');
    }).not.to.throw();
  });


  it('has a `path` static property', function() {
    expect(ProcessInstance.path).to.eql('process-instance');
  });


  describe('instance', function() {
    var instance;

    it('does not blow when instanciating', function() {
      expect(function() {
        instance = new ProcessInstance();
      }).not.to.throw();
    });
  });
});

'use strict';
var expect = require('chai').expect;

var request = require('superagent');
var mockConfig = require('./superagent-mock-config');

describe('The SDK core', function() {

  var superagentMock;
  before(function() {
    superagentMock = require('superagent-mock')(request, mockConfig);
  });

  after(function() {
    superagentMock.unset();
  });

  var CamSDK, camClient, ProcessDefinition, processDefinition;

  it('does not blow when loading', function() {
    expect(function() {
      CamSDK = require('./../../lib/index');
    }).not.to.throw();
  });


  it('initializes', function() {
    expect(function() {
      camClient = new CamSDK.Client({
        apiUri: 'engine-rest/engine'
      });
    }).not.to.throw();
  });


  it('uses the mock HttpClient', function(done) {
    expect(function() {
      ProcessDefinition = camClient.resource('process-definition');
    }).not.to.throw();

    expect(ProcessDefinition.http).to.not.be.undefined;

    ProcessDefinition.list({
      nameLike: 'Bar'
    }, function(err, results) {
      expect(err).to.be.null;

      expect(results.count).to.not.be.undefined;

      expect(Array.isArray(results.items)).to.eql(true);

      done();
    });
  });

  it('returns promises', function() {
    expect(function() {
      ProcessDefinition = camClient.resource('process-definition');
    }).not.to.throw();

    return ProcessDefinition.list({nameLike: 'Bar'}).then(
      function(results) {
        expect(results.count).to.not.be.undefined;
        expect(Array.isArray(results.items)).to.eql(true);
      }
    );
  });


  it('has resources', function() {
    expect(function() {
      processDefinition = new ProcessDefinition();
    }).not.to.throw();

    expect(processDefinition.http).to.not.be.undefined;
    expect(processDefinition.http).to.eql(ProcessDefinition.http);
  });
});

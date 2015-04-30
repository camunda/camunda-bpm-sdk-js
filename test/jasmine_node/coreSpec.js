'use strict';

describe('The SDK core', function() {
  var CamSDK, camClient, ProcessDefinition, processDefinition;

  it('does not blow when loading', function() {
    expect(function() {
      CamSDK = require('./../../lib/index');
    }).not.to.throw();
  });


  it('initializes', function() {
    expect(function() {
      camClient = new CamSDK.Client({
        apiUri: 'engine-rest/engine',
        HttpClient: require('./../../lib/api-client/http-client-mock')
      });
    }).not.to.throw();
  });


  it('uses the mock HttpClient', function(done) {
    expect(function() {
      ProcessDefinition = camClient.resource('process-definition');
    }).not.to.throw();

    expect(ProcessDefinition.http).to.not.be.undefined;

    expect(ProcessDefinition.http.mock).to.eql(true);

    ProcessDefinition.list({
      nameLike: 'Bar'
    }, function(err, results) {
      expect(err).toBeNull();

      expect(results.count).to.not.be.undefined;

      expect(Array.isArray(results.items)).to.eql(true);

      done();
    });
  });


  it('has resources', function() {
    expect(function() {
      processDefinition = new ProcessDefinition();
    }).not.to.throw();

    expect(processDefinition.http).to.not.be.undefined;
    expect(processDefinition.http).to.eql(ProcessDefinition.http);
  });
});

'use strict';

describe('The SDK core', function() {
  var CamundaClient, cam, ProcessDefinition, processDefinition;

  it('does not blow when loading', function() {
    expect(function() {
      CamundaClient = require('./../../lib/index');
    }).not.toThrow();
  });


  it('initializes', function() {
    expect(function() {
      cam = new CamundaClient({
        apiUri: 'engine-rest/engine',
        HttpClient: require('./../../lib/http-client-mock')
      });
    }).not.toThrow();
  });


  it('uses the mock HttpClient', function(done) {
    expect(function() {
      ProcessDefinition = cam.resource('process-definition');
    }).not.toThrow();

    expect(ProcessDefinition.http).toBeDefined();

    expect(ProcessDefinition.http.mock).toBe(true);

    ProcessDefinition.list({
      nameLike: 'Bar'
    }, function(err, results) {
      expect(err).toBeNull();

      expect(results.count).toBeDefined();

      expect(Array.isArray(results.items)).toBe(true);

      done();
    });
  });


  it('has resources', function() {
    expect(function() {
      processDefinition = new ProcessDefinition();
    }).not.toThrow();

    expect(processDefinition.http).toBeDefined();
    expect(processDefinition.http).toBe(ProcessDefinition.http);
  });
});

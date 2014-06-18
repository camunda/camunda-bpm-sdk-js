'use strict';

describe('The ProcessDefinition resource', function() {
  var ProcessDefinition, processDefinition;

  it('does not blow when loading', function() {
    expect(function() {
      ProcessDefinition = require('./../../../src/resources/process-definition');
    }).not.toThrow();
  });


  it('has a `path` static property', function() {
    expect(ProcessDefinition.path).toBe('process-definition');
  });


  it('uses its own path to perform request', function() {
    expect(function() {
      ProcessDefinition.list();
    }).not.toThrow();
  });


  it('uses its own path to perform request', function() {
    expect(function() {
      processDefinition = new ProcessDefinition();
    }).not.toThrow();
  });


  it('can list the process process definitions', function(done) {
    ProcessDefinition.list({
      nameLike: 'Process'
    }, function(err, results) {
      if (err) {
        return done(err);
      }

      expect(typeof results).toBe('object');

      expect(typeof results.count).toBeDefined();

      expect(typeof results.items).toBeDefined();

      expect(results.items instanceof Array).toBe(true);

      done();
    });
  });
});

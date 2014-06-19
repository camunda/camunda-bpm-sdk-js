'use strict';

describe('The ProcessDefinition resource', function() {
  var ProcessDefinition, processDefinition;

  it('does not blow when loading', function() {
    expect(function() {
      ProcessDefinition = require('./../../../lib/resources/process-definition');
    }).not.toThrow();
  });


  it('has a `path` static property', function() {
    expect(ProcessDefinition.path).toBe('process-definition');
  });
});

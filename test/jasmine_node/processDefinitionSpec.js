'use strict';

describe('The ProcessDefinition resource usage', function() {
  var ProcessDefinition;

  it('does not blow when loading', function() {
    expect(function() {
      ProcessDefinition = require('./../../src/process-definition');
    }).not.toThrow();
  });

  it('has a `path` static property', function() {
    expect(ProcessDefinition.path).toBe('/process-definition');
  });
});

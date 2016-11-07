'use strict';
var expect = require('chai').expect;

describe('The History resource usage', function() {
  var History;

  it('does not blow when loading', function() {
    expect(function() {
      History = require('./../../../lib/api-client/resources/history');
    }).not.to.throw();
  });

  it('has a `path` static property', function() {
    expect(History.path).to.eql('history');
  });

  it('has a `userOperation` method', function() {
    expect(History.userOperation).to.be.a('function');
  });

  it('has a `processInstance` method', function() {
    expect(History.processInstance).to.be.a('function');
  });

  it('has a `processInstanceCount` method', function() {
    expect(History.processInstanceCount).to.be.a('function');
  });

  it('has a `decisionInstance` method', function() {
    expect(History.decisionInstance).to.be.a('function');
  });

  it('has a `decisionInstanceCount` method', function() {
    expect(History.decisionInstanceCount).to.be.a('function');
  });

  it('has a `batch` method', function() {
    expect(History.batch).to.be.a('function');
  });

  it('has a `singleBatch` method', function() {
    expect(History.singleBatch).to.be.a('function');
  });

  it('has a `batchCount` method', function() {
    expect(History.batchCount).to.be.a('function');
  });

  it('has a `batchDelete` method', function() {
    expect(History.batchDelete).to.be.a('function');
  });

  it('has a `report` method', function() {
    expect(History.report).to.be.a('function');
  });

  it('has a `reportAsCsv` method', function() {
    expect(History.reportAsCsv).to.be.a('function');
  });

  it('has a `taskDurationReport` method', function() {
    expect(History.taskDurationReport).to.be.a('function');
  });

  it('has a `taskReport` method', function() {
    expect(History.taskReport).to.be.a('function');
  });

  it('has a `task` method', function() {
    expect(History.task).to.be.a('function');
  });

  it('has a `taskCount` method', function() {
    expect(History.taskCount).to.be.a('function');
  });

  it('has a `drdStatistics` method', function() {
    expect(History.drdStatistics).to.be.a('function');
  });

  xit('has a `resolve` method', function() {
    expect(History.resolve).to.be.a('function');
  });


  xit('has a `complete` method', function() {
    expect(History.complete).to.be.a('function');
  });


  xdescribe('instance', function() {
    var instance;

    it('does not blow when instatiating', function() {
      expect(function() {
        instance = new History();
        console.info('instance', instance);
      }).not.to.throw();
    });
  });
});

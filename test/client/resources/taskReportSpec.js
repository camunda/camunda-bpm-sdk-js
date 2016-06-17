'use strict';
var expect = require('chai').expect;

describe('The Task Report resource usage', function() {
  var TaskReport;

  it('does not blow when loading', function() {
    expect(function() {
      TaskReport = require('./../../../lib/api-client/resources/task-report');
    }).not.to.throw();
  });

  it('has a `path` static property', function() {
    expect(TaskReport.path).to.eql('task/report');
  });

  it('has a `countByCandidateGroup` method', function() {
    expect(TaskReport.countByCandidateGroup).to.be.a('function');
  });

  it('has a `countByCandidateGroupAsCsv` method', function() {
    expect(TaskReport.countByCandidateGroup).to.be.a('function');
  });

  xit('has a `resolve` method', function() {
    expect(TaskReport.resolve).to.be.a('function');
  });


  xit('has a `complete` method', function() {
    expect(TaskReport.complete).to.be.a('function');
  });


  xdescribe('instance', function() {
    var instance;

    it('does not blow when instatiating', function() {
      expect(function() {
        instance = new TaskReport();
        console.info('instance', instance);
      }).not.to.throw();
    });
  });
});

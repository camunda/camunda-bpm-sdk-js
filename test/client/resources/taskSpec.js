'use strict';
var expect = require('chai').expect;

describe('The Task resource usage', function() {
  var Task;

  it('does not blow when loading', function() {
    expect(function() {
      Task = require('./../../../lib/api-client/resources/task');
    }).not.to.throw();
  });

  it('has a `path` static property', function() {
    expect(Task.path).to.eql('task');
  });

  it('has a `assignee` method', function() {
    expect(Task.assignee).to.be.a('function');
  });


  it('has a `delegate` method', function() {
    expect(Task.delegate).to.be.a('function');
  });


  it('has a `claim` method', function() {
    expect(Task.claim).to.be.a('function');
  });


  it('has a `unclaim` method', function() {
    expect(Task.unclaim).to.be.a('function');
  });

  it('has a `complete` method', function() {
    expect(Task.complete).to.be.a('function');
  });


  xit('has a `resolve` method', function() {
    expect(Task.resolve).to.be.a('function');
  });


  xit('has a `complete` method', function() {
    expect(Task.complete).to.be.a('function');
  });


  xdescribe('instance', function() {
    var instance;

    it('does not blow when instatiating', function() {
      expect(function() {
        instance = new Task();
        console.info('instance', instance);
      }).not.to.throw();
    });
  });
});

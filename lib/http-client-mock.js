'use strict';

var request = require('superagent');
var Events = require('./events');


/**
 * HttpClient
 * @exports CamSDK.HttpClientMock
 * @augments {CamSDK.HttpClient}
 * @class
 * @classdesc A mocking implementation of CamSDK.HttpClient
 */
var HttpClient = function(config) {
  config = config || {};

  if (!config.baseUrl) {
    throw new Error('HttpClientMock needs a `baseUrl` configuration property.');
  }

  Events.attach(this);

  this.config = config;

  this.mock = true;
};

/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.post = function(data, options) {
  data = data || {};
  options = options || {};

  var url = this.config.baseUrl + (options.path ? '/'+ options.path : '');
  var req = request
    .post(url);
  req.send(data);
  req.end(options.done);
};


var _store = {};
var fixturer = require('fixturer');
var uuid = require('uuid');
var _ = require('underscore');
_.str = require('underscore.string');

var i = 0, id;
_store.processDefinition = {};
for (; i < 40; i++) {
  id = uuid();
  _store.processDefinition[id] = {
    id: id,
    key: fixturer.randomString(fixturer.random(8, 16)),
    name: fixturer.randomString(fixturer.random(4, 8)),
    resource: fixturer.randomString(fixturer.random(4, 8)),
    diagram: fixturer.randomString(fixturer.random(4, 8)),
    version: fixturer.random(),
    deploymentId: uuid(),
    suspended: !!fixturer.random(0, 1),
    category: fixturer.randomItem([
      'category1',
      'category2',
      'category3',
      'category4',
      'category5'
    ], 1)
  };
}


_store.user = {};
for (i = 0; i < 40; i++) {
  id = fixturer.randomString(4, 8);
  _store.user[id] = {
    id: id,
    firstName: fixturer.personName(true, false),
    lastName: fixturer.personName(false, true),
    email: fixturer.randomString(4, 8) +'@'+ fixturer.randomString(5, 7) +'.com'
  };
}



_store.processInstance = {};
for (var processDefinitionId in _store.processDefinition) {
  var count = fixturer.random(0, 80);
  for (i = 0; i < count; i++) {
    id = uuid();
    _store.processInstance[id] = {
      links: [],
      id: id,
      definitionId: processDefinitionId,
      businessKey: fixturer.randomString(8, 16),
      ended: !!fixturer.random(0, 1),
      suspended: !!fixturer.random(0, 1)
    };
  }
}

var users = _.keys(_store.user)
users.push(null);

var procInst, procInstId;
var procInstances = _.keys(_store.processInstance)
// procInstances.push(null);

_store.task = {};
for (i = 0; i < 300; i++) {
  id = uuid();
  procInstId = fixturer.randomItem(procInstances);
  procInst = _store.processInstance[procInstId];

  _store.task[id] = {
    id: id,
    name: 'aName',
    assignee: fixturer.randomItem(users),
    created: '2013-01-23T13:42:42',
    due: '2013-01-23T13:49:42',
    followUp: '2013-01-23T13:44:42',
    delegationState: 'RESOLVED',
    description: 'aDescription',
    executionId: uuid(),
    owner: fixturer.randomItem(users),
    parentTaskId: 'aParentId',
    priority: fixturer.random(),
    processDefinitionId: procInst.definitionId,
    processInstanceId: procInstId,
    taskDefinitionKey: 'aTaskDefinitionKey'
  };
}



_store.variable = {};
for (i = 0; i < 600; i++) {
  id = uuid();
  // _store.variable[id] = {
  //   id: id,
  //   name: fixturer.randomString(4, 16),
  //   type: fixturer.randomItem([
  //     'integer',
  //     'double',
  //     'string'
  //   ]),
  //   value: 5,
  //   processInstanceId: 'aProcessInstanceId',
  //   executionId: 'b68b71c9-e310-11e2-beb0-f0def1557726',
  //   taskId: null,
  //   activityInstanceId: 'Task_1:b68b71ca-e310-11e2-beb0-f0def1557726'
  // };
}


/**
 * Performs a GET HTTP request
 */
HttpClient.prototype.get = function(path, options) {
  options = options || {};
  var done = options.done || function() {};

  console.info('Mocking GET '+ path +' call');

  var results = {};

  if (path === 'process-definition/count') {
    results = {count: _.size(_store.processDefinition)};
  }
  else if (path === 'process-definition') {
    results = _.toArray(_store.processDefinition).slice(0, 10);
  }

  // ...probably not correct...
  else if ('process-instance/count') {
    results = {count: _.size(_store.processInstance)};
  }
  else if ('process-instance') {
    results = _.toArray(_store.processInstance).slice(0, 10);
  }

  done(null, {body: results});
};



/**
 * Performs a PUT HTTP request
 */
HttpClient.prototype.put = function(path, options) {
  options = options || {};
  var done = options.done || function() {};

  console.info('Mocking GET '+ url +' call');

  var results = {};
  switch (url) {
    
  }

  done(null, results);
};



/**
 * Performs a DELETE HTTP request
 */
HttpClient.prototype.del = function(data, options) {
  var instance = this.instance;
  data = data || {};
  options = options || {};
};
module.exports = HttpClient;

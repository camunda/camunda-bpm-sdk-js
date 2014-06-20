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
 * Variable to store fixtures
 * @type {Object}
 * @property {Object.<uuid, Object>} processDefinition  Process definition mocks
 * @property {Object.<uuid, Object>} processInstance    Process instance mocks
 * @property {Object.<uuid, Object>} user               User mocks
 * @property {Object.<uuid, Object>} variable           Variable mocks
 */
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
    // name: fixturer.thingName(),
    name: fixturer.randomItem([
      'Call Process '+ i,
      'process '+ i,
      'yada '+ i,
      'foo Bar '+ i,
      'Foo-Bar '+ i
    ]),
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

var users = _.keys(_store.user);
users.push(null);

var procInst, procInstId;
var procInstances = _.keys(_store.processInstance);
// procInstances.push(null);

_store.task = {};
for (i = 0; i < 300; i++) {
  id = uuid();
  procInstId = fixturer.randomItem(procInstances);
  procInst = _store.processInstance[procInstId];

  _store.task[id] = {
    id: id,
    name: fixturer.thingName(),
    assignee: fixturer.randomItem(users),
    created: '2013-01-23T13:42:42',
    due: '2013-01-23T13:49:42',
    followUp: '2013-01-23T13:44:42',
    delegationState: 'RESOLVED',
    description: 'aDescription',
    executionId: uuid(),
    owner: fixturer.randomItem(users),
    // should link to a existing task.id
    parentTaskId: null,
    priority: fixturer.random(),
    processDefinitionId: procInst.definitionId,
    processInstanceId: procInstId,
    taskDefinitionKey: 'Task_'+ fixturer.random(1, 20)
  };
}

var subId;
for (id in  _store.task) {
  if (fixturer.random(1, 6) > 3) {
    subId = uuid();
    procInstId = _store.task[id].processInstanceId;
    procInst = _store.processInstance[procInstId];

    _store.task[subId] = {
      id: subId,
      name: fixturer.thingName(),
      assignee: fixturer.randomItem(users),
      created: '2013-01-23T13:42:42',
      due: '2013-01-23T13:49:42',
      followUp: '2013-01-23T13:44:42',
      delegationState: 'RESOLVED',
      description: 'aDescription',
      executionId: uuid(),
      owner: fixturer.randomItem(users),
      // should link to a existing task.id
      parentTaskId: id,
      priority: fixturer.random(),
      processDefinitionId: procInst.definitionId,
      processInstanceId: procInstId,
      taskDefinitionKey: null
    };
  }
}



_store.variable = {};
for (i = 0; i < 600; i++) {
  id = uuid();
  _store.variable[id] = {
    id: id,
    name: fixturer.randomString(4, 16),
    type: fixturer.randomItem([
      'integer',
      'double',
      'string'
    ]),
    value: 5,
    processInstanceId: 'aProcessInstanceId',
    executionId: uuid(),
    taskId: null,
    activityInstanceId: 'Task_1:b68b71ca-e310-11e2-beb0-f0def1557726'
  };
}


function inPath(expected, given) {
  return given.slice(0, expected.length) === expected;
}


function filter(src, data) {
  var where = {
    exact: {},
    like: {}
  };
  var notFilters = [
    'sortBy',
    'sortOrder',
    'firstResult',
    'maxResults'
  ];

  var likeExp = /Like$/;
  _.each(data, function(val, key) {
    if (notFilters.indexOf(key) > -1) { return; }

    var isLike = likeExp.test(key) ? 'like' : 'exact';
    where[isLike ? 'like' : 'exact'][key] = isLike ? new RegExp(val.slice(1).slice(0, -1), 'g') : val;
  });

  var found = _.size(where.exact) ? _.where(src, where.exact) : _.toArray(src);

  found = _.size(where.like) ? _.filter(found, function(item) {
    var keep = true;
    var realKey;
    _.each(where.like, function(search, key) {
      if (!keep) { return; }
      realKey = key.slice(0, -4);
      keep = search.test(''+ item[key.slice(0, -4)]);
    });
    return keep;
  }) : _.toArray(src);


  return found;
}


function generic(wanted, items, where) {
  var returned;

  if (wanted === 'key') {
    returned = _.findWhere(items, {key: wanted});
  }

  else if (!wanted || wanted === 'count') {
    returned = filter(items, where);

    // returns an object with "count"
    if (wanted) {
      returned = { count: returned.length };
    }
    // returns an aray of items
    else {
      var offset = parseInt(where.firstResult || 0, 10);
      var limit = offset + parseInt(where.maxResults || 10, 10);
      returned = _.toArray(returned).slice(offset, limit);
    }
  }

  // request by id
  else if (wanted) {
    returned = items[wanted];
  }

  return returned;
}

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


/**
 * Performs a GET HTTP request
 */
HttpClient.prototype.get = function(path, options) {
  options = options || {};

  var done = options.done || function() {};
  var results = {};
  var found = [];

  var pathParts = path.split('/');
  var resourceName = pathParts.shift();

  switch (resourceName) {
    case 'process-definition':
      found = generic(pathParts[0], _store.processDefinition, options.data);
      break;

    case 'process-instance':
      found = generic(pathParts[0], _store.processInstance, options.data);
      break;

    case 'task':
      found = generic(pathParts[0], _store.task, options.data);
      break;

    case 'user':
      found = generic(pathParts[0], _store.user, options.data);
      break;

    case 'variable-instance':
      found = generic(pathParts[0], _store.variable, options.data);
      break;
  }

  // postpone the response to simulate latency
  setTimeout(function() {
    done(null, { body: results });
  }, fixturer.random(50, 400));
};



/**
 * Performs a PUT HTTP request
 */
HttpClient.prototype.put = function(path, options) {
  options = options || {};
  var done = options.done || function() {};
  var results = {};

  done(null, { body: results });
};



/**
 * Performs a DELETE HTTP request
 */
HttpClient.prototype.del = function(data, options) {
  data = data || {};
  options = options || {};
};
module.exports = HttpClient;

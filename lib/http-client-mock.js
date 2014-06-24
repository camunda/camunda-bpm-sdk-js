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
for (; i < 80; i++) {
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
_store.user.jonny1 = {
  id: 'jonny1',
  firstName: 'Jonny',
  lastName: 'One',
  email: fixturer.randomString(4, 8) +'@'+ fixturer.randomString(5, 7) +'.com'
};



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
  var created = fixturer.randomDate(new Date('1.1.2014'), new Date());

  _store.task[id] = {
    id: id,
    name: fixturer.thingName(fixturer.random(2, 12)),
    assignee: fixturer.randomItem(users),
    created: created,
    due: fixturer.randomDate(created, new Date('11.29.2014')),
    followUp: fixturer.randomDate(created, new Date('10.29.2014')),
    delegationState: 'RESOLVED',
    description: fixturer.thingName(fixturer.random(7, 42)),
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
    var created = fixturer.randomDate(new Date('1.1.2014'), new Date());
    subId = uuid();
    procInstId = _store.task[id].processInstanceId;
    procInst = _store.processInstance[procInstId];

    _store.task[subId] = {
      id: subId,
      name: fixturer.thingName(),
      assignee: fixturer.randomItem(users),
      created: created,
      due: fixturer.randomDate(created, new Date('11.29.2014')),
      followUp: fixturer.randomDate(created, new Date('10.29.2014')),
      delegationState: 'RESOLVED',
      description: fixturer.thingName(fixturer.random(7, 42)),
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
    processInstanceId: null,
    executionId: uuid(),
    taskId: null,
    activityInstanceId: 'Task_1:b68b71ca-e310-11e2-beb0-f0def1557726'
  };
}

_store.pile = {};
_.each([
  {
    id: uuid(),
    name: 'Mines',
    description: '',
    filters: [
      {
        key: 'assignee',
        value: '{self}'
      }
    ],
    color: '#AFB3E2'
  },
  {
    id: uuid(),
    name: 'Overdue',
    description: '',
    filters: [
      {
        key: 'dueBefore',
        // operator: 'smaller',
        value: '{now}'
      }
    ],
    color: '#FFB4B4'
  },
  {
    id: uuid(),
    name: 'Due in 3 days',
    description: '',
    filters: [
      {
        key: 'dueBefore',
        // operator: 'smaller',
        value: '{now} + ({day} * 3)'
      }
    ],
    color: '#FFD2D2'
  },
  {
    id: uuid(),
    name: 'Group A',
    description: '',
    filters: [
      {
        key: 'candidateGroup',
        // operator: 'has',
        value: 'group-a'
      }
    ],
    color: ''
  },
  {
    id: uuid(),
    name: 'Group B',
    description: '',
    filters: [
      {
        key: 'candidateGroup',
        // operator: 'has',
        value: 'group-a'
      }
    ],
    color: ''
  }
], function(pile) {
  _store.pile[pile.id] = pile;
});














function inPath(expected, given) {
  return given.slice(0, expected.length) === expected;
}


function filter(src, data) {
  var where = {
    exact:  {},
    like:   {},
    before: {},
    after:  {}
  };
  var notFilters = [
    'sortBy',
    'sortOrder',
    'firstResult',
    'maxResults'
  ];

  var likeExp = /Like$/;
  var beforeExp = /Before$/;
  var afterExp = /After$/;

  _.each(data, function(val, key) {
    if (notFilters.indexOf(key) > -1) { return; }

    /* jshint evil: true */
    if (beforeExp.test(key)) {
      where.before[key.split(beforeExp).shift()] = new Date(eval(val) * 1000);
    }
    else if (afterExp.test(key)) {
      where.after[key.split(afterExp).shift()] = new Date(eval(val) * 1000);
    }
    /* jshint evil: false */
    else if (likeExp.test(key)) {
      where.like[key.split(likeExp).shift()] = new RegExp((''+ val).slice(1).slice(0, -1), 'g');
    }
    else {
      where.exact[key] = val;
    }
  });

  var found = _.size(where.exact) ? _.where(src, where.exact) : _.toArray(src);

  found = _.size(where.like) ? _.filter(found, function(item) {
    var keep = true;
    var realKey;
    _.each(where.like, function(search, key) {
      if (!keep) { return; }
      keep = search.test(''+ item[key]);
    });
    return keep;
  }) : found;

  found = _.size(where.before) ? _.filter(found, function(item) {
    var keep = true;
    _.each(where.before, function(val, key) {
      if (!keep) { return; }
      keep = item[key] <= val;
    });
    return keep;
  }) : found;

  found = _.size(where.after) ? _.filter(found, function(item) {
    var keep = true;
    _.each(where.after, function(val, key) {
      if (!keep) { return; }
      keep = item[key] >= val;
    });
    return keep;
  }) : found;

  console.info('found', found.length, where);

  return found;
}


function genericGet(wanted, items, where) {
  var returned;

  if (wanted === 'key') {
    returned = _.findWhere(items, {key: wanted});
  }

  else if (!wanted || wanted === 'count') {
    // var safe = _.clone(where);
    // delete safe.maxResults;
    // delete safe.firstResult;
    // delete safe.sortBy;
    // delete safe.sortOrder;
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
HttpClient.prototype.post = function(path, options) {
  options = options || {};

  var done = options.done || function() {};
  var results;

  var pathParts = path.split('/');
  var resourceName = pathParts.shift();
  console.info('SDK MOCKING: "POST" request on "'+ resourceName +'"', pathParts.join(', '), options.data);

  switch (resourceName) {
    case 'process-definition':
      var action = pathParts[pathParts.length - 1];
      var definition;
      if (pathParts[0] === 'key') {
        definition = _.findWhere(_store.processDefinition, {key: pathParts[1]});
      }
      else {
        definition = _store.processDefinition[pathParts[0]];
      }


      switch (action) {
        case 'submit-form':
          var id = uuid();
          _store.processInstance[id] = {
            id: id,
            definitionId: definition.id,
            businessKey: 'myBusinessKey',
            ended: false,
            suspended: false
          };

          results = _.extend({
            links:[
              {
                method: 'GET',
                href: 'http://localhost:8080/rest-test/process-instance/'+ id,
                rel: 'self'
              }
            ],
          }, _store.processInstance[id]);
          break;
      }
      break;
  }

  // postpone the response to simulate latency
  setTimeout(function() {
    done(null, results);
  }, fixturer.random(300, 700));
};


/**
 * Performs a GET HTTP request
 */
HttpClient.prototype.get = function(path, options) {
  options = options || {};

  var done = options.done || function() {};
  var results;

  var pathParts = path.split('/');
  var resourceName = pathParts.shift();
  console.info('SDK MOCKING: "GET" request on "'+ resourceName +'"', pathParts.join(', '), options.data);

  switch (resourceName) {
    case 'process-definition':
      results = genericGet(pathParts[0], _store.processDefinition, options.data);
      break;

    case 'process-instance':
      results = genericGet(pathParts[0], _store.processInstance, options.data);
      break;

    case 'pile':
      results = genericGet(pathParts[0], _store.pile, options.data);
      break;

    case 'task':
      results = genericGet(pathParts[0], _store.task, options.data);
      break;

    case 'user':
      results = genericGet(pathParts[0], _store.user, options.data);
      break;

    case 'variable-instance':
      results = genericGet(pathParts[0], _store.variable, options.data);
      break;
  }

  // postpone the response to simulate latency
  setTimeout(function() {
    done(null, results);
  }, fixturer.random(300, 700));
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

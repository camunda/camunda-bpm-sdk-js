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

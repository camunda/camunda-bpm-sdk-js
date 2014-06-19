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



/**
 * Performs a GET HTTP request
 */
HttpClient.prototype.get = function(path, options) {
  options = options || {};
  var done = options.done || function() {};

  console.info('Mocking GET '+ path +' call');

  var results = {};

  if (path === 'process-definition/count') {
    results = {count: 40};
  }
  else if (path === 'process-definition') {
    results = [
      {
        // ...
      },
      {
        // ...
      }
    ];
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

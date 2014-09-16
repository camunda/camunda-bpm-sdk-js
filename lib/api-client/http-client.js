'use strict';

var request = require('superagent');
var Events = require('./../events');
var utils = require('./../utils');
var noop = function() {};

/**
 * HttpClient
 *
 * A HTTP request abstraction layer to be used in node.js / browsers environments.
 *
 * @class
 * @memberof CamSDK.client
 */
var HttpClient = function(config) {
  config = config || {};

  if (!config.baseUrl) {
    throw new Error('HttpClient needs a `baseUrl` configuration property.');
  }

  Events.attach(this);

  this.config = config;
};

function toDone(response, done) {
  // superagent puts the parsed data into a property named "body"
  // and the "raw" content in property named "text"
  // and.. it does not parse the response if it does not have
  // the "application/json" type.
  if (response.type === 'application/hal+json') {
    if (!response.body) {
      response.body = JSON.parse(response.text);
    }

    // and process embedded resources
    response.body = utils.solveHALEmbedded(response.body);
  }

  // TODO: investigate the possibility of getting a response without content
  done(null, response.body ? response.body : (response.text ? response.text : ''));
}

/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.post = function(path, options) {
  options = options || {};
  var done = options.done || noop;
  var self = this;
  var url = this.config.baseUrl + (path ? '/'+ path : '');
  var req = request
    .post(url)
    .set('Accept', 'application/hal+json, application/json; q=0.5')
    .send(options.data || {});

  req.end(function(err, response) {
    // TODO: investigate the possible problems related to response without content
    if (err || (!response.ok && !response.noContent)) {
      err = err || response.error || new Error('The POST request on '+ url +' failed');
      self.trigger('error', err);
      return done(err);
    }

    toDone(response, done);
  });
};



/**
 * Performs a GET HTTP request
 */
HttpClient.prototype.get = function(path, options) {
  var url = this.config.baseUrl + (path ? '/'+ path : '');
  return this.load(url, options);
};

/**
 * Loads a resource using http GET
 */
HttpClient.prototype.load = function(url, options) {
  options = options || {};
  var done = options.done || noop;
  var self = this;

  var req = request
    .get(url)
    .set('Accept', 'application/hal+json, application/json; q=0.5')
    .query(options.data || {});

  req.end(function(err, response) {
    if (err || !response.ok) {
      err = err || response.error || new Error('The GET request on '+ url +' failed');
      self.trigger('error', err);
      return done(err);
    }

    toDone(response, done);
  });
};


/**
 * Performs a PUT HTTP request
 */
HttpClient.prototype.put = function(path, options) {
  options = options || {};
  var done = options.done || noop;
  var self = this;
  var url = this.config.baseUrl + (path ? '/'+ path : '');

  var req = request
    .put(url)
    .set('Accept', 'application/hal+json, application/json; q=0.5')
    .send(options.data || {});

  req.end(function(err, response) {
    if (err || !response.ok) {
      err = err || response.error || new Error('The PUT request on '+ url +' failed');
      self.trigger('error', err);
      return done(err);
    }

    toDone(response, done);
  });
};



/**
 * Performs a DELETE HTTP request
 */
HttpClient.prototype.del = function(path, options) {
  options = options || {};
  var done = options.done || noop;
  var self = this;
  var url = this.config.baseUrl + (path ? '/'+ path : '');

  var req = request
    .del(url)
    .set('Accept', 'application/hal+json, application/json; q=0.5')
    .send(options.data || {});

  req.end(function(err, response) {
    if (err || !response.ok) {
      err = err || response.error || new Error('The DELETE request on '+ url +' failed');
      self.trigger('error', err);
      return done(err);
    }

    toDone(response, done);
  });
};

module.exports = HttpClient;

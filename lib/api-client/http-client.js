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

  config.headers = config.headers || {};
  if (!config.headers.Accept) {
    config.headers.Accept = 'application/hal+json, application/json; q=0.5';
  }

  if (!config.baseUrl) {
    throw new Error('HttpClient needs a `baseUrl` configuration property.');
  }

  Events.attach(this);

  this.config = config;
};

function end(self, done) {
  return function(err, response) {
    // TODO: investigate the possible problems related to response without content
    if (err || (!response.ok && !response.noContent)) {
      err = err || response.error || new Error('The '+ response.req.method +' request on '+ response.req.url +' failed');
      if (response && response.body) {
        if (response.body.message) {
          err.message = response.body.message;
        }
      }
      self.trigger('error', err);
      return done(err);
    }

    // superagent puts the parsed data into a property named "body"
    // and the "raw" content in property named "text"
    // and.. it does not parse the response if it does not have
    // the "application/json" type.
    if (response.type === 'application/hal+json') {
      if (!response.body || Object.keys(response.body).length === 0) {
        response.body = JSON.parse(response.text);
      }

      // and process embedded resources
      response.body = utils.solveHALEmbedded(response.body);
    }

    done(null, response.body ? response.body : (response.text ? response.text : ''));
  };
}

/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.post = function(path, options) {
  options = options || {};
  var done = options.done || noop;
  var self = this;
  var url = this.config.baseUrl + (path ? '/'+ path : '');
  var req = request.post(url);

  // Buffer object is only available in node.js environement
  if (typeof Buffer !== 'undefined') {
    Object.keys(options.fields || {}).forEach(function (field) {
      req.field(field, options.fields[field]);
    });

    (options.attachments || []).forEach(function (file) {
      req.attach('data', new Buffer(file.content), {
        filename: file.name
      });
    });
  }
  else if (!!options.fields || !!options.attachments) {
    return done(new Error('Multipart request is only supported in node.js environement.'));
  }

  req
    .set(this.config.headers)
    .send(options.data || {})
    .query(options.query || {});

  req.end(end(self, done));
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

  if (options.accept) {
    this.config.headers.Accept = options.accept;
  }

  var req = request
    .get(url)
    .set(this.config.headers)
    .query(options.data || {});

  req.end(end(self, done));
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
    .set(this.config.headers)
    .send(options.data || {});

  req.end(end(self, done));
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
    .set(this.config.headers)
    .send(options.data || {});

  req.end(end(self, done));
};



/**
 * Performs a OPTIONS HTTP request
 */
HttpClient.prototype.options = function(path, options) {
  options = options || {};
  var done = options.done || noop;
  var self = this;
  var url = this.config.baseUrl + (path ? '/'+ path : '');

  var req = request('OPTIONS', url)
    .set(this.config.headers);

  req.end(end(self, done));
};


module.exports = HttpClient;

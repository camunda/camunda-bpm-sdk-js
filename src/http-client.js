'use strict';

// Notes:
// - investigate possible use of XHR libraries
//   - for node.js
//     - https://github.com/mikeal/request
//   - for browsers
//     - rqst: https://github.com/voronianski/rqst very small
//     - reqwest: https://github.com/ded/reqwest full-featured
// - investigate mocking implementation

/**
 * HttpClient
 * @exports cam.sdk.HttpClient
 */

/**
 * HttpClient
 * @class
 * @classdesc A HTTP request abstraction layer to be used in node.js / browsers environments.
 */
var HttpClient = function(resource) {
  this.instance = resource;
};



/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.post = function(data, options) {
  var instance = this.instance;
  data = data || {};
  options = options || {};
};



/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.get = function(data, options) {
  var instance = this.instance;
  data = data || {};
  options = options || {};
};



/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.put = function(data, options) {
  var instance = this.instance;
  data = data || {};
  options = options || {};
};



/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.del = function(data, options) {
  var instance = this.instance;
  data = data || {};
  options = options || {};
};

module.exports = HttpClient;

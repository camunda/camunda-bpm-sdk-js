'use strict';

/**
 * @namespace CamSDK
 */

/**
 * Entry point of the module
 * @exports Cam
 * @constructor
 *
 * @param  {Object} config        used to provide necessary configuration
 * @param  {String} [config.engine=default] ...
 * @param  {String} config.appUri ...
 *
 * @return {Object}               ...
 */
function Cam(config) {
  if (!config) {
    throw new Error('Needs configuration');
  }

  if (!config.apiUri) {
    throw new Error('An apiUri is required');
  }

  config.engine = config.engine || 'default';

  this.HttpClient = config.HttpClient || require('./http-client');

  this.baseUrl = config.apiUri;
  if(this.baseUrl.indexOf("/", this.baseUrl.length - 1) === -1) {
    this.baseUrl += '/';
  }
  this.baseUrl += 'engine/'+ config.engine;

  this.config = config;

  this.initialize();
}


// provide an isolated scope
(function(proto){
  /**
   * configuration storage
   * @memberOf Cam.prototype
   * @name  config
   * @type {Object}
   */
  proto.config = {};

  var _resources = {};

  /**
   * Prepare the instance
   * @memberOf Cam.prototype
   * @name  initialize
   */
  proto.initialize = function() {
    var name;

    /* jshint sub: true */
    _resources['pile']                = require('./resources/pile');
    _resources['process-definition']  = require('./resources/process-definition');
    _resources['process-instance']    = require('./resources/process-instance');
    _resources['task']                = require('./resources/task');
    _resources['session']             = require('./resources/session');
    _resources['variable']            = require('./resources/variable');
    /* jshint sub: false */

    var httpClient = new this.HttpClient({
      baseUrl: this.baseUrl
    });

    for (name in _resources) {
      _resources[name].http = httpClient;
    }
  };

  /**
   * Allows to get a resource from SDK by its name
   * @memberOf Cam.prototype
   * @name resource
   *
   * @param  {String} name [description]
   * @return {CamSDK.GenericResource}      [description]
   */
  proto.resource = function(name) {
    return _resources[name];
  };
}(Cam.prototype));


module.exports = Cam;


/**
 * A [universally unique identifier]{@link en.wikipedia.org/wiki/Universally_unique_identifier}
 * @typedef {String} uuid
 */


/**
 * This callback is displayed as part of the Requester class.
 * @callback requestCallback
 * @param {?Object} error
 * @param {CamSDK.GenericResource|CamSDK.GenericResource[]} [results]
 */


/**
 * Function who does not perform anything
 * @callback noopCallback
 */

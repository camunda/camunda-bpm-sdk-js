'use strict';

var HttpClient = require('./http-client');

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

  if (!config.appUri) {
    throw new Error('A appUri is required');
  }

  // http://localhost:8080/camunda/api/engine/engine/default/process-definition/statistics?incidents=true
  config.hostname = config.hostname || false;

  config.engine = config.engine || 'default';

  this.baseUrl = '';
  if (config.hostname) {
    this.baseUrl = config.protocol +'://';
    this.baseUrl += config.hostname;

    if ((''+ config.port) !== '80' && config.port) {
      this.baseUrl += ':'+ config.port;
    }
  }

  this.baseUrl += '/'+ config.appUri;
  this.baseUrl += '/'+ config.engine;

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
    _resources['process-definition']  = require('./resources/process-definition');
    _resources['process-instance']    = require('./resources/process-instance');
    _resources['task']                = require('./resources/task');
    _resources['variable']            = require('./resources/variable');
    /* jshint sub: false */

    for (name in _resources) {
      _resources[name].http = new HttpClient({
        baseUrl: this.baseUrl +'/'+ _resources[name].path
      });
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
 * This callback is displayed as part of the Requester class.
 * @callback requestCallback
 * @param {?Object} error
 * @param {CamSDK.GenericResource|CamSDK.GenericResource[]} [results]
 */


/**
 * Function who does not perform anything
 * @callback noopCallback
 */

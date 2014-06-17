'use strict';

var HttpClient = require('./http-client');

/**
 * Entry point of the module
 * @exports CamSDK
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
   * @memberOf CamSDK.prototype
   * @name  config
   * @type {Object}
   */
  proto.config = {};

  var _resources = {};

  /**
   * Prepare the instance
   * @memberOf CamSDK.prototype
   * @name  initialize
   */
  proto.initialize = function() {
    var resource, Resource, name;
    var resources = this.config.resources || [
      'process-definition',
      'process-instance',
      'variable',
      'task'
    ];

    for (resource in resources) {
      name = resources[resource];

      Resource = require('./resources/'+ name);
      Resource.http = new HttpClient({
        baseUrl: this.baseUrl +'/'+ Resource.path
      });

      _resources[name] = Resource;
    }
  };

  /**
   * Allows to get a resource from SDK by its name
   * @memberOf CamSDK.prototype
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
 * @param {Object} ?error
 * @param {CamSDK.GenericResource|CamSDK.GenericResource[]} [results]
 */


/**
 * Function who does not perform anything
 * @callback noopCallback
 */

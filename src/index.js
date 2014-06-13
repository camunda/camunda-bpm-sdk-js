'use strict';

/**
 * @module  cam.sdk
 */






/**
 * Entry point of the module
 *
 * @param  {Object} config        used to provide necessary configuration
 * @param  {String} config.engine ...
 * @param  {String} config.app    ...
 *
 * @return {Object}               ...
 */
var cam = function(config) {
  if (!config) {
    throw new Error('Needs configuration');
  }

  if (!config.appUri) {
    throw new Error('A appUri is required');
  }

  this.config = config;

  this.initialize();
};

/**
 * Prepare the instance
 */
cam.prototype.initialize = function() {
  var resources = this.config.resources || [
    'process-definition',
    'process-instance',
    'task'
  ];

  for (var resource in resources) {
    this[resource] = require('./'+ resource);
  }
};


module.exports = cam;




/**
 * This callback is displayed as part of the Requester class.
 * @callback requestCallback
 * @param {Object} ?error
 * @param {GenericResource|GenericResource[]} [results]
 */


/**
 * Function who does not perform anything
 * @callback noopCallback
 */

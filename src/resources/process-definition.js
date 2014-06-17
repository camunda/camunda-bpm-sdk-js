'use strict';

var GenericResource = require("./../generic-resource");




/**
 * Process definition resource
 * @exports CamSDK.ProcessDefinition
 * @constructor
 */

/**
 * ProcessDefinition
 * @class
 * @classdesc A process definition resource
 * @augments CamSDK.GenericResource
 */
var ProcessDefinition = GenericResource.extend();


/**
 * API path for the process definition resource
 * @type {String}
 */
ProcessDefinition.path = 'process-definition';


/**
 * Get a list of process definitions
 * @param  {Object}   params   [description]
 * @param  {requestCallback} [done] [description]
 */
ProcessDefinition.list = function(params, callback) {
  return this.http.get(this.path, {
    done: callback
  });
};



/**
 * Suspends the process definition instance
 * @param  {Object.<String, *>}   params   [description]
 * @param  {requestCallback} [done] [description]
 */
ProcessDefinition.prototype.suspend = function(params, done) {};



/**
 * Suspends one or more process definitions
 * @param  {String|String[]}   ids       [description]
 * @param  {Object.<String, *>}   params   [description]
 * @param  {requestCallback} [done] [description]
 */
ProcessDefinition.suspend = function(ids, params, done) {};

module.exports = ProcessDefinition;


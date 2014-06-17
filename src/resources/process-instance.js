'use strict';

var GenericResource = require("./../generic-resource");




/**
 * Process instance resource
 * @exports CamSDK.ProcessInstance
 *
 */



/**
 * ProcessInstance
 * @class
 * @classdesc A process instance resource
 * @augments CamSDK.GenericResource
 */
var ProcessInstance = GenericResource.extend();


/**
 * API path for the process instance resource
 * @type {String}
 */
ProcessInstance.path = 'process-instance';



/**
 * Creates a process instance from a process definition
 * @param  {Object}   params                        [description]
 * @param  {String}   [params.id]                   [description]
 * @param  {String}   [params.key]                  [description]
 * @param  {Object.<String, *>} [params.variables]  [description]
 * @param  {requestCallback} [done]                 [description]
 */
ProcessInstance.create = function(params, done) {
  return this.http.post(params, done);
};



/**
 * Get a list of process instances
 * @param  {Object}   params   [description]
 * @param  {requestCallback} [done] [description]
 */
ProcessInstance.list = function(params, done) {
  return this.http.get("/", params, done);
};


module.exports = ProcessInstance;


'use strict';

var AbstractClientResource = require("./../abstract-client-resource");




/**
 * Process Instance Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var ProcessInstance = AbstractClientResource.extend();


/**
 * API path for the process instance resource
 * @type {String}
 */
ProcessInstance.path = 'process-instance';



/**
 * Creates a process instance from a process definition
 * @param  {Object}   params
 * @param  {String}   [params.id]
 * @param  {String}   [params.key]
 * @param  {Object.<String, *>} [params.variables]
 * @param  {requestCallback} [done]
 */
ProcessInstance.create = function(params, done) {
  return this.http.post(params, done);
};



/**
 * Get a list of process instances
 * @param  {Object}   params
 * @param  {requestCallback} [done]
 */
ProcessInstance.list = function(params, done) {
  return this.list(params, done);
};


module.exports = ProcessInstance;


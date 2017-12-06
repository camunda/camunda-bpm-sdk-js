'use strict';

var AbstractClientResource = require('./../abstract-client-resource');
var utils = require('../../utils');

/**
 * CaseInstance Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var CaseInstance = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
CaseInstance.path = 'case-instance';



CaseInstance.get = function(instanceId, done) {
  return this.http.get(this.path +'/'+ instanceId, {
    done: done
  });
};

CaseInstance.list = function(params, done) {
  return this.http.get(this.path, {
    data: params,
    done: done
  });
};

CaseInstance.close = function(instanceId, params, done) {
  return this.http.post(this.path + '/' + instanceId + '/close', {
    data: params,
    done: done
  });
};

CaseInstance.terminate = function(instanceId, params, done) {
  return this.http.post(this.path + '/' + instanceId + '/terminate', {
    data: params,
    done: done
  });
};

/**
 * Sets a variable of a given case instance by id.
 *
 * @see http://docs.camunda.org/manual/develop/reference/rest/case-instance/variables/put-variable/
 *
 * @param   {uuid}              id
 * @param   {Object}            params
 * @param   {requestCallback}   done
 */
CaseInstance.setVariable = function(id, params, done) {
  var url = this.path + '/' + id + '/variables/' + utils.escapeUrl(params.name);
  return this.http.put(url, {
    data: params,
    done: done
  });
};

module.exports = CaseInstance;

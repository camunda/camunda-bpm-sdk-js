'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * No-Op callback
 */
function noop() {}

/**
 * CaseExecution Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var CaseExecution = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
CaseExecution.path = 'case-execution';

CaseExecution.list = function(params, done) {
  done = done || noop;
  return this.http.get(this.path, {
    data: params,
    done: done
  });
};

CaseExecution.disable = function(executionId, params, done) {
  return this.http.post(this.path + '/' + executionId + '/disable', {
    data: params,
    done: done
  });
};

CaseExecution.reenable = function(executionId, params, done) {
  return this.http.post(this.path + '/' + executionId + '/reenable', {
    data: params,
    done: done
  });
};

CaseExecution.manualStart = function(executionId, params, done) {
  return this.http.post(this.path + '/' + executionId + '/manual-start', {
    data: params,
    done: done
  });
};

CaseExecution.complete = function(executionId, params, done) {
  return this.http.post(this.path + '/' + executionId + '/complete', {
    data: params,
    done: done
  });
};

/**
 * Deletes a variable in the context of a given case execution. Deletion does not propagate upwards in the case execution hierarchy.
 */
CaseExecution.deleteVariable = function(data, done) {
  return this.http.del(this.path + '/' + data.id + '/localVariables/' + data.varId, {
    done: done
  });
};


/**
 * Updates or deletes the variables in the context of an execution.
 * The updates do not propagate upwards in the execution hierarchy.
 * Deletion precede updates.
 * So, if a variable is updated AND deleted, the updates overrides the deletion.
 */
CaseExecution.modifyVariables = function(data, done) {
  return this.http.post(this.path + '/' + data.id + '/localVariables', {
    data: data,
    done: done
  });
};

module.exports = CaseExecution;

'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * No-Op callback
 */
function noop() {}

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

CaseInstance.list = function(params, done) {
  return this.http.get(this.path, {
    data: params,
    done: done
  });
};

CaseInstance.count = function(params, done) {
  if (arguments.length === 1 && typeof params === 'function') {
    done = params;
    params = {};
  }

  params = params || {};

  return this.http.get(this.path + '/count', {
    data: params,
    done: done || noop
  });
};

CaseInstance.close = function(instanceId, params, done) {
  return this.http.post(this.path + '/' + instanceId + '/close', {
    data: params,
    done: done
  });
};

module.exports = CaseInstance;

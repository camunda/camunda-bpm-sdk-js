'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

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
  return this.http.get(this.path, {
    data: params,
    done: function(err, data) {
      if (err) {
        return done(err);
      }

      done(null, data);
    }
  });
};

CaseExecution.disable = function(executionId, params, done) {
  this.http.post(this.path + '/' + executionId + '/disable', {
    data: params,
    done: done
  });
};

CaseExecution.reenable = function(executionId, params, done) {
  this.http.post(this.path + '/' + executionId + '/reenable', {
    data: params,
    done: done
  });
};

CaseExecution.manualStart = function(executionId, params, done) {
  this.http.post(this.path + '/' + executionId + '/manual-start', {
    data: params,
    done: done
  });
};

CaseExecution.complete = function(executionId, params, done) {
  this.http.post(this.path + '/' + executionId + '/complete', {
    data: params,
    done: done
  });
};

module.exports = CaseExecution;

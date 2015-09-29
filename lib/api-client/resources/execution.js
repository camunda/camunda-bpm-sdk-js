'use strict';

var AbstractClientResource = require('./../abstract-client-resource');



/**
 * Execution Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Execution = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Execution.path = 'execution';

/**
 * Deletes a variable in the context of a given execution. Deletion does not propagate upwards in the execution hierarchy.
 */
Execution.deleteVariable = function (data, done) {
  this.http.del(this.path + '/' + data.id + '/localVariables/' + data.varId, {
    data: data,
    done: done
  });
};

module.exports = Execution;


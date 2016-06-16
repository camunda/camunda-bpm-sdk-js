'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * No-Op callback
 */
function noop() {}


/**
 * Task Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var TaskReport = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
TaskReport.path = 'task/report';


/**
 * Fetch the count of tasks grouped by candidate group.
 *
 * @param {Function} done
 */
TaskReport.countByCandidateGroup = function(done) {
  return this.http.get(this.path + '/candidate-group-count', {
    done: done
  });
};

module.exports = TaskReport;


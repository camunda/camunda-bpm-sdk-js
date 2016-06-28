'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

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

/**
 * Query for process instance durations report.
 * @param  {Object}   [params]
 * @param  {Object}   [params.reportType]           Must be 'duration'.
 * @param  {Object}   [params.periodUnit]           Can be one of `month` or `quarter`, defaults to `month`
 * @param  {Object}   [params.processDefinitionIn]  Comma separated list of process definition IDs
 * @param  {Object}   [params.startedAfter]         Date after which the process instance were started
 * @param  {Object}   [params.startedBefore]        Date before which the process instance were started
 * @param  {Function} done
 */
TaskReport.countByCandidateGroupAsCsv = function(done) {
  return this.http.get(this.path + '/candidate-group-count', {
    accept: 'text/csv',
    done: done
  });
};

module.exports = TaskReport;


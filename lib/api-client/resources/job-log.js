'use strict';

var AbstractClientResource = require('./../abstract-client-resource');



/**
 * JobLog Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var JobLog = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
JobLog.path = 'history/job-log';

/**
 * Query for historic job logs that fulfill the given parameters.
 * @param  {Object}   params
 * @param  {String}   [params.logId]                          Filter by historic job log id.
 * @param  {String}   [params.jobId]                          Filter by job id.
 * @param  {}         [params.jobExceptionMessage]            Filter by job exception message.
 * @param  {String}   [params.jobDefinitionId]                Filter by job definition id.
 * @param  {}         [params.jobDefinitionType]              Filter by job definition type.
 * @param  {}         [params.jobDefinitionConfiguration]     Filter by job definition configuration.
 * @param  {String}   [params.activityIdIn]                   Only include historic job logs which belong to one of the passed activity ids.
 * @param  {String}   [params.executionIdIn]                  Only include historic job logs which belong to one of the passed execution ids.
 * @param  {String}   [params.processInstanceId]              Filter by process instance id.
 * @param  {String}   [params.processDefinitionId]            Filter by process definition id.
 * @param  {String}   [params.processDefinitionKey]           Filter by process definition key.
 * @param  {String}   [params.deploymentId]                   Filter by deployment id.
 * @param  {String}   [params.tenantIdIn]                     Only include historic job log entries which belong to one of the passed and comma-separated tenant ids.
 * @param  {}         [params.jobPriorityLowerThanOrEquals]   Only include logs for which the associated job had a priority lower than or equal to the given value. Value must be a valid long value.
 * @param  {}         [params.jobPriorityHigherThanOrEquals]  Only include logs for which the associated job had a priority higher than or equal to the given value. Value must be a valid long value.
 * @param  {Boolean}  [params.creationLog]                    Only include creation logs. Value may only be true, as false is the default behavior.
 * @param  {Boolean}  [params.failureLog]                     Only include failure logs. Value may only be true, as false is the default behavior.
 * @param  {Boolean}  [params.successLog]                     Only include success logs. Value may only be true, as false is the default behavior.
 * @param  {Boolean}  [params.deletionLog]                    Only include deletion logs. Value may only be true, as false is the default behavior.
 * @param  {Array}    [params.sorting]                        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e. whether it is primary, secondary, etc.
 * @param  {String}   params.sorting.sortBy                   Sort the results lexicographically by a given criterion. Valid values are
 *                                                             - timestamp
 *                                                             - jobId
 *                                                             - jobDefinitionId
 *                                                             - jobDueDate
 *                                                             - jobRetries
 *                                                             - jobPriority
 *                                                             - activityId
 *                                                             - executionId
 *                                                             - processInstanceId
 *                                                             - processDefinitionId
 *                                                             - processDefinitionKey
 *                                                             - deploymentId
 *                                                             - occurrence
 *                                                             - tenantId
 *                                                            Must be used in conjunction with the sortOrder parameter.
 * @param  {String}   params.sorting.sortOrder                Sort the results in a given order. Values may be asc for ascending order or desc for descending order.
 * @param  {String}   [params.firstResult]                    Pagination of results. Specifies the index of the first result to return.
 * @param  {String}   [params.maxResults]                     Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.
 * @param  {Function} done
 */
JobLog.list = function(params, done) {

  var path = this.path;

  // those parameters have to be passed in the query and not body
  path += '?firstResult='+ (params.firstResult || 0);
  if(params.maxResults) {
    path += '&maxResults='+ (params.maxResults);
  }


  return this.http.post(path, {
    data: params,
    done: done
  });
};



/**
 * Query for the number of historic job logs that fulfill the given parameters.
 * @param  {Object}   params
 * @param  {String}   [params.logId]                          Filter by historic job log id.
 * @param  {String}   [params.jobId]                          Filter by job id.
 * @param  {}         [params.jobExceptionMessage]            Filter by job exception message.
 * @param  {String}   [params.jobDefinitionId]                Filter by job definition id.
 * @param  {}         [params.jobDefinitionType]              Filter by job definition type.
 * @param  {}         [params.jobDefinitionConfiguration]     Filter by job definition configuration.
 * @param  {String}   [params.activityIdIn]                   Only include historic job logs which belong to one of the passed activity ids.
 * @param  {String}   [params.executionIdIn]                  Only include historic job logs which belong to one of the passed execution ids.
 * @param  {String}   [params.processInstanceId]              Filter by process instance id.
 * @param  {String}   [params.processDefinitionId]            Filter by process definition id.
 * @param  {String}   [params.processDefinitionKey]           Filter by process definition key.
 * @param  {String}   [params.deploymentId]                   Filter by deployment id.
 * @param  {String}   [params.tenantIdIn]                     Only include historic job log entries which belong to one of the passed and comma-separated tenant ids.
 * @param  {}         [params.jobPriorityLowerThanOrEquals]   Only include logs for which the associated job had a priority lower than or equal to the given value. Value must be a valid long value.
 * @param  {}         [params.jobPriorityHigherThanOrEquals]  Only include logs for which the associated job had a priority higher than or equal to the given value. Value must be a valid long value.
 * @param  {Boolean}  [params.creationLog]                    Only include creation logs. Value may only be true, as false is the default behavior.
 * @param  {Boolean}  [params.failureLog]                     Only include failure logs. Value may only be true, as false is the default behavior.
 * @param  {Boolean}  [params.successLog]                     Only include success logs. Value may only be true, as false is the default behavior.
 * @param  {Boolean}  [params.deletionLog]                    Only include deletion logs. Value may only be true, as false is the default behavior.
 * @param  {Function} done
 */
JobLog.count = function(params, done) {

  var path = this.path + '/count';

  return this.http.post(path, {
    data: params,
    done: done
  });
};



/**
 * Retrieves the corresponding exception stacktrace to the passed historic job log id.
 * @param  {String}   id    A job Id
 * @param  {Function} done
 */
JobLog.stacktrace = function(id, done) {

  var path = this.path + '/' + id + '/stacktrace';

  return this.http.post(path, {
    data: {},
    done: done
  });
};


module.exports = JobLog;

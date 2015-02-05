'use strict';

var AbstractClientResource = require("./../abstract-client-resource");



/**
 * History Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var History = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
History.path = 'history';


/**
 * Query for user operation log entries that fulfill the given parameters.
 *
 * @param {Object} params
 * @param {String} [params.processDefinitionId]   Filter by process definition id.
 * @param {String} [params.processDefinitionKey]  Filter by process definition key.
 * @param {String} [params.processInstanceId]     Filter by process instance id.
 * @param {String} [params.executionId]           Filter by execution id.
 * @param {String} [params.caseDefinitionId]      Filter by case definition id.
 * @param {String} [params.caseInstanceId]        Filter by case instance id.
 * @param {String} [params.caseExecutionId]       Filter by case execution id.
 * @param {String} [params.taskId]                Only include operations on this task.
 * @param {String} [params.userId]                Only include operations of this user.
 * @param {String} [params.operationId]           Filter by the id of the operation. This allows fetching of multiple entries which are part of a composite operation.
 * @param {String} [params.operationType]         Filter by the type of the operation like Claim or Delegate.
 * @param {String} [params.entityType]            Filter by the type of the entity that was affected by this operation, possible values are Task, Attachment or IdentityLink.
 * @param {String} [params.property]              Only include operations that changed this property, e.g. owner or assignee
 * @param {String} [params.afterTimestamp]        Restrict to entries that were created after the given timestamp. The timestamp must have the format yyyy-MM-dd'T'HH:mm:ss, e.g. 2014-02-25T14:58:37
 * @param {String} [params.beforeTimestamp]       Restrict to entries that were created before the given timestamp. The timestamp must have the format yyyy-MM-dd'T'HH:mm:ss, e.g. 2014-02-25T14:58:37
 * @param {String} [params.sortBy]                Sort the results by a given criterion. At the moment the query only supports sorting based on the timestamp.
 * @param {String} [params.sortOrder]             Sort the results in a given order. Values may be asc for ascending order or desc for descending order. Must be used in conjunction with the sortBy parameter.
 * @param {String} [params.firstResult]           Pagination of results. Specifies the index of the first result to return.
 * @param {String} [params.maxResults]            Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.
 * @param {Function} done
 */
History.userOperation = function(params, done) {
  return this.http.get(this.path + "/user-operation", {
      data: params,
      done: done
  });
};

History.processInstance = function(params, pagingParams, done) {
  return this.http.post(this.path + "/process-instance", {
    data: params,
    query: pagingParams,
    done: done
  });
};

History.processInstanceCount = function(params, done) {
  return this.http.post(this.path + "/process-instance/count", {
    data: params,
    done: done
  });
};

module.exports = History;


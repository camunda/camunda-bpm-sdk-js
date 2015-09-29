'use strict';

var AbstractClientResource = require("./../abstract-client-resource");




/**
 * Process Instance Resource
 *
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var ProcessInstance = AbstractClientResource.extend(
/** @lends  CamSDK.client.resource.ProcessInstance.prototype */
{

},

/** @lends  CamSDK.client.resource.ProcessInstance */
{
  /**
   * API path for the process instance resource
   */
  path: 'process-instance',


  /**
   * Creates a process instance from a process definition
   *
   * @param  {Object}   params
   * @param  {String}   [params.id]
   * @param  {String}   [params.key]
   * @param  {Object.<String, *>} [params.variables]
   * @param  {requestCallback} [done]
   */
  create: function (params, done) {
    return this.http.post(params, done);
  },


  /**
   * Get a list of process instances
   *
   * @param  {Object}   params
   * @param {String} [params.processInstanceIds]      Filter by a comma-separated list of process
   *                                                  instance ids.
   * @param {String} [params.businessKey]             Filter by process instance business key.
   * @param {String} [params.caseInstanceId]          Filter by case instance id.
   * @param {String} [params.processDefinitionId]     Filter by the process definition the
   *                                                  instances run on.
   * @param {String} [params.processDefinitionKey]    Filter by the key of the process definition
   *                                                  the instances run on.
   * @param {String} [params.superProcessInstance]    Restrict query to all process instances that
   *                                                  are sub process instances of the given process
   *                                                  instance. Takes a process instance id.
   * @param {String} [params.subProcessInstance]      Restrict query to all process instances that
   *                                                  have the given process instance as a sub
   *                                                  process instance. Takes a process instance id.
   * @param {String} [params.active]                  Only include active process instances.
   *                                                  Values may be true or false.
   * @param {String} [params.suspended]               Only include suspended process instances.
   *                                                  Values may be true or false.
   * @param {String} [params.incidentId]              Filter by the incident id.
   * @param {String} [params.incidentType]            Filter by the incident type.
   * @param {String} [params.incidentMessage]         Filter by the incident message. Exact match.
   * @param {String} [params.incidentMessageLike]     Filter by the incident message that the
   *                                                  parameter is a substring of.
   * @param {String} [params.variables]               Only include process instances that have
   *                                                  variables with certain values.
   *                                                  Variable filtering expressions are
   *                                                  comma-separated and are structured as follows:
   *                                                  A valid parameter value has the form
   *                                                  key_operator_value. key is the variable name,
   *                                                  operator is the comparison operator to be used
   *                                                  and value the variable value.
   *                                                  Note: Values are always treated as String
   *                                                  objects on server side.
   *                                                  Valid operator values are:
   *                                                  - eq - equal to;
   *                                                  - neq - not equal to;
   *                                                  - gt - greater than;
   *                                                  - gteq - greater than or equal to;
   *                                                  - lt - lower than;
   *                                                  - lteq - lower than or equal to;
   *                                                  - like.
   *                                                  key and value may not contain underscore or
   *                                                  comma characters.
   * @param {String} [params.sortBy]                  Sort the results lexicographically by a given
   *                                                  criterion.
   *                                                  Valid values are:
   *                                                  - instanceId
   *                                                  - definitionKey
   *                                                  - definitionId.
   *                                                  Must be used in conjunction with the sortOrder
   *                                                  parameter.
   * @param {String} [params.sortOrder]               Sort the results in a given order.
   *                                                  Values may be asc for ascending order
   *                                                  or desc for descending order.
   *                                                  Must be used in conjunction with sortBy param.
   * @param {String} [params.firstResult]             Pagination of results. Specifies the index of
   *                                                  the first result to return.
   * @param {String} [params.maxResults]              Pagination of results. Specifies the maximum
   *                                                  number of results to return.
   *                                                  Will return less results if there are no more
   *                                                  results left.
   * @param  {requestCallback} done
   */
  list: function (params, done) {
    AbstractClientResource.list.apply(this, arguments);
  },

  /**
   * Query for process instances using a list of parameters and retrieves the count
   *
   * @param  {Object}   params
   * @param {String} [params.processInstanceIds]      Filter by a comma-separated list of process
   *                                                  instance ids.
   * @param {String} [params.businessKey]             Filter by process instance business key.
   * @param {String} [params.caseInstanceId]          Filter by case instance id.
   * @param {String} [params.processDefinitionId]     Filter by the process definition the
   *                                                  instances run on.
   * @param {String} [params.processDefinitionKey]    Filter by the key of the process definition
   *                                                  the instances run on.
   * @param {String} [params.superProcessInstance]    Restrict query to all process instances that
   *                                                  are sub process instances of the given process
   *                                                  instance. Takes a process instance id.
   * @param {String} [params.subProcessInstance]      Restrict query to all process instances that
   *                                                  have the given process instance as a sub
   *                                                  process instance. Takes a process instance id.
   * @param {String} [params.active]                  Only include active process instances.
   *                                                  Values may be true or false.
   * @param {String} [params.suspended]               Only include suspended process instances.
   *                                                  Values may be true or false.
   * @param {String} [params.incidentId]              Filter by the incident id.
   * @param {String} [params.incidentType]            Filter by the incident type.
   * @param {String} [params.incidentMessage]         Filter by the incident message. Exact match.
   * @param {String} [params.incidentMessageLike]     Filter by the incident message that the
   *                                                  parameter is a substring of.
   * @param {String} [params.variables]               Only include process instances that have
   *                                                  variables with certain values.
   *                                                  Variable filtering expressions are
   *                                                  comma-separated and are structured as follows:
   *                                                  A valid parameter value has the form
   *                                                  key_operator_value. key is the variable name,
   *                                                  operator is the comparison operator to be used
   *                                                  and value the variable value.
   *                                                  Note: Values are always treated as String
   *                                                  objects on server side.
   *                                                  Valid operator values are:
   *                                                  - eq - equal to;
   *                                                  - neq - not equal to;
   *                                                  - gt - greater than;
   *                                                  - gteq - greater than or equal to;
   *                                                  - lt - lower than;
   *                                                  - lteq - lower than or equal to;
   *                                                  - like.
   *                                                  key and value may not contain underscore or
   *                                                  comma characters.
   * @param {String} [params.sortBy]                  Sort the results lexicographically by a given
   *                                                  criterion.
   *                                                  Valid values are:
   *                                                  - instanceId
   *                                                  - definitionKey
   *                                                  - definitionId.
   *                                                  Must be used in conjunction with the sortOrder
   *                                                  parameter.
   * @param {String} [params.sortOrder]               Sort the results in a given order.
   *                                                  Values may be asc for ascending order
   *                                                  or desc for descending order.
   *                                                  Must be used in conjunction with sortBy param.
   * @param {String} [params.firstResult]             Pagination of results. Specifies the index of
   *                                                  the first result to return.
   * @param {String} [params.maxResults]              Pagination of results. Specifies the maximum
   *                                                  number of results to return.
   *                                                  Will return less results if there are no more
   *                                                  results left.
   * @param  {requestCallback} done
   */
  count: function(params, done) {
    if (arguments.length === 1 && typeof params === 'function') {
      done = params;
      params = {};
    }

    params = params || {};

    this.http.get(this.path + '/count', {
      data: params,
      done: done || function () {}
    });
  },

  /**
   * Post process instance modifications
   * @see http://docs.camunda.org/api-references/rest/#process-instance-modify-process-instance-execution-state-method
   *
   * @param  {Object}           params
   * @param  {UUID}             params.id                     process instance UUID
   *
   * @param  {Array}            params.instructions           Array of instructions
   *
   * @param  {Boolean}          [params.skipCustomListeners]  Skip execution listener invocation for
   *                                                          activities that are started or ended
   *                                                          as part of this request.
   *
   * @param  {Boolean}          [params.skipIoMappings]       Skip execution of input/output
   *                                                          variable mappings for activities that
   *                                                          are started or ended as part of
   *                                                          this request.
   *
   * @param  {requestCallback}  done
   */
  modify: function (params, done) {
    this.http.post(this.path + '/' + params.id + '/modification', {
      data: {
        instructions:         params.instructions,
        skipCustomListeners:  params.skipCustomListeners,
        skipIoMappings:       params.skipIoMappings
      },
      done: done
    });
  }
});


module.exports = ProcessInstance;

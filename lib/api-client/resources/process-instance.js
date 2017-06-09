'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

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
   * Retrieve a single process instance
   *
   * @param  {uuid}     id    of the process instance to be requested
   * @param  {Function} done
   */
    get: function(id, done) {
      return this.http.get(this.path +'/'+ id, {
        done: done
      });
    },


  /**
   * Creates a process instance from a process definition
   *
   * @param  {Object}   params
   * @param  {String}   [params.id]
   * @param  {String}   [params.key]
   * @param  {Object.<String, *>} [params.variables]
   * @param  {requestCallback} [done]
   */
    create: function(params, done) {
      return this.http.post(params, done);
    },

    /**
     * Queries for process instances that fulfill given parameters.
     * @see https://docs.camunda.org/manual/latest/reference/rest/process-instance/get-query/
     *
     * @param  {Object}          params
     * @param  {requestCallback} done
     */
    list: function(params, done) {
      var path = this.path;

    // those parameters have to be passed in the query and not body
      path += '?firstResult='+ (params.firstResult || 0);
      path += '&maxResults='+ (params.maxResults || 15);

      return this.http.get(path, {
        data: params,
        done: done
      });
    },

    count: function(params, done) {
      var path = this.path + '/count';

      return this.http.post(path, {
        data: params,
        done: done
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
    modify: function(params, done) {
      return this.http.post(this.path + '/' + params.id + '/modification', {
        data: {
          instructions:         params.instructions,
          skipCustomListeners:  params.skipCustomListeners,
          skipIoMappings:       params.skipIoMappings
        },
        done: done
      });
    },

    /**
     * Delete multiple process instances asynchronously (batch).
     *
     * @see https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-delete/
     *
     * @param   {Object}            payload
     * @param   {requestCallback}   done
     *
     */
    deleteAsync: function(payload, done) {
      return this.http.post(this.path + '/delete', {
        data: payload,
        done: done
      });
    },

    /**
     * Delete a set of process instances asynchronously (batch) based on a historic process instance query.
     *
     * @see https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-delete-historic-query-based/
     *
     * @param   {Object}            payload
     * @param   {requestCallback}   done
     *
     */
    deleteAsyncHistoricQueryBased: function(payload, done) {
      return this.http.post(this.path + '/delete-historic-query-based', {
        data: payload,
        done: done
      });
    },

    /**
     * Set retries of jobs belonging to process instances asynchronously (batch).
     *
     * @see https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-set-job-retries
     *
     * @param   {Object}            payload
     * @param   {requestCallback}   done
     *
     */
    setJobsRetriesAsync: function(payload, done) {
      return this.http.post(this.path + '/job-retries', {
        data: payload,
        done: done
      });
    },

    /**
     * Create a batch to set retries of jobs asynchronously based on a historic process instance query.
     *
     * @see https://docs.camunda.org/manual/latest/reference/rest/process-instance/post-set-job-retries-historic-query-based
     *
     * @param   {Object}            payload
     * @param   {requestCallback}   done
     *
     */
    setJobsRetriesAsyncHistoricQueryBased: function(payload, done) {
      return this.http.post(this.path + '/job-retries-historic-query-based', {
        data: payload,
        done: done
      });
    }
  });


module.exports = ProcessInstance;

'use strict';

var AbstractClientResource = require("./../abstract-client-resource");



/**
 * Authorization Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Authorization = AbstractClientResource.extend();

/**
 * API path for the process definition resource
 * @type {String}
 */
Authorization.path = 'authorization';




/**
 * Fetch a list of authorizations
 * @param {Object} params
 *
 * @param {Object} [params.id]
 *                                              Filter by the id of the authorization.
 * @param {Object} [params.type]
 *                                              Filter by the type of the authorization.
 * @param {Object} [params.userIdIn]
 *                                              Filter by a comma-separated list of userIds
 * @param {Object} [params.groupIdIn]
 *                                              Filter by a comma-separated list of groupIds
 * @param {Object} [params.resourceType]
 *                                              Filter by resource type
 * @param {Object} [params.resourceId]
 *                                              Filter by resource id.
 * @param {Object} [params.sortBy]
 *                                              Sort the results lexicographically by a given criterion.
 *                                              Valid values are resourceType and resourceId.
 *                                              Must be used in conjunction with the sortOrder parameter.
 * @param {Object} [params.sortOrder]
 *                                              Sort the results in a given order.
 *                                              Values may be asc for ascending order or desc for descending order.
 *                                              Must be used in conjunction with the sortBy parameter.
 * @param {Object} [params.firstResult]
 *                                              Pagination of results. Specifies the index of the first result to return.
 * @param {Object} [params.maxResults]
 *                                              Pagination of results. Specifies the maximum number of results to return.
 *                                              Will return less results if there are no more results left.
 * @param {Function} done
 */
Authorization.list = function(params, done) {
  return this.http.get(this.path, {
    data: params,
    done: done
  });
};



/**
 * Retrieve a single authorization
 * @param  {uuid}     authorizationId   of the authorization to be requested
 * @param  {Function} done
 */
Authorization.get = function(authorizationId, done) {
  return this.http.get(this.path +'/'+ authorizationId, {
    done: done
  });
};


module.exports = Authorization;


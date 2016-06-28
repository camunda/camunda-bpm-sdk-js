'use strict';

var AbstractClientResource = require('./../abstract-client-resource');



/**
 * Job Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Metrics = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Metrics.path = 'metrics';

/**
 * Query for jobs that fulfill given parameters.
 * @param  {Object}   params
 * @param  {String}   [params.name]
 * @param  {String}   [params.startDate]
 * @param  {String}   [params.endDate]
 * @param  {Function} done
 */
Metrics.sum = function(params, done) {

  var path = this.path + '/' + params.name + '/sum';
  delete params.name;

  return this.http.get(path, { data: params, done: done });
};

module.exports = Metrics;

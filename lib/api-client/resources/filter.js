'use strict';

var AbstractClientResource = require("./../abstract-client-resource");



/**
 * Filter Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Filter = AbstractClientResource.extend();

/**
 * API path for the process definition resource
 * @type {String}
 */
Filter.path = 'filter';



/**
 * Retrieve a single filter
 * @param  {uuid}     filterId   of the filter to be requested
 * @param  {Function} done
 */
Filter.get = function(filterId, done) {
  return this.http.get(this.path +'/'+ filterId, {
    done: done
  });
};


module.exports = Filter;


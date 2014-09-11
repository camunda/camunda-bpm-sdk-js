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
 *
 * @param  {uuid}     filterId   of the filter to be requested
 * @param  {Function} done
 */
Filter.get = function(filterId, done) {
  return this.http.get(this.path +'/'+ filterId, {
    done: done
  });
};


/**
 * Creates a filter
 *
 * @param  {Object}   filter   is an object representation of a filter
 * @param  {Function} done
 */
Filter.create = function(filter, done) {
  return this.http.post(this.path, {
    data: filter,
    done: done
  });
};


/**
 * Update a filter
 *
 * @param  {Object}   filter   is an object representation of a filter
 * @param  {Function} done
 */
Filter.update = function(filter, done) {
  return this.http.put(this.path +'/'+ filter.id, {
    data: filter,
    done: done
  });
};



/**
 * Save a filter
 *
 * @see Filter.create
 * @see Filter.update
 *
 * @param  {Object}   filter   is an object representation of a filter, if it has
 *                             an id property, the filter will be updated, otherwise created
 * @param  {Function} done
 */
Filter.save = function(filter, done) {
  return Filter[filter.id ? 'update' : 'create'](filter, done);
};


module.exports = Filter;


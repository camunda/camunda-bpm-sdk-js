'use strict';

var AbstractClientResource = require('./../abstract-client-resource');



/**
 * Filter Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Filter = AbstractClientResource.extend();

/**
 * API path for the filter resource
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
 * Retrieve some filters
 *
 * @param  {Object}   data
 * @param  {Integer}  [data.firstResult]
 * @param  {Integer}  [data.maxResults]
 * @param  {String}   [data.sortBy]
 * @param  {String}   [data.sortOrder]
 * @param  {Bool}     [data.itemCount]
 * @param  {Function} done
 */
Filter.list = function(data, done) {
  return this.http.get(this.path, {
    data: data,
    done: done
  });
};


/**
 * Get the tasks result of filter
 *
 * @param  {(Object.<String, *>|uuid)}  data  uuid of a filter or parameters
 * @param  {uuid}     [data.id]               uuid of the filter to be requested
 * @param  {Integer}  [data.firstResult]
 * @param  {Integer}  [data.maxResults]
 * @param  {String}   [data.sortBy]
 * @param  {String}   [data.sortOrder]
 * @param  {Function} done
 */
Filter.getTasks = function(data, done) {
  var path = this.path +'/';

  if (typeof data === 'string') {
    path = path + data +'/list';
    data = {};
  }
  else {
    path = path + data.id +'/list';
    delete data.id;
  }

  // those parameters have to be passed in the query and not body
  path += '?firstResult='+ (data.firstResult || 0);
  path += '&maxResults='+ (data.maxResults || 15);

  return this.http.post(path, {
    data: data,
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
  return this.http.post(this.path +'/create', {
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


/**
 * Delete a filter
 *
 * @param  {uuid}     id   of the filter to delete
 * @param  {Function} done
 */
Filter.delete = function(id, done) {
  return this.http.del(this.path +'/'+ id, {
    done: done
  });
};


/**
 * Performs an authorizations lookup on the resource or entity
 *
 * @param  {uuid}     [id]   of the filter to get authorizations for
 * @param  {Function} done
 */
Filter.authorizations = function(id, done) {
  if (arguments.length === 1) {
    return this.http.options(this.path, {
      done: id,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  return this.http.options(this.path +'/'+ id, {
    done: done,
    headers: {
      Accept: 'application/json'
    }
  });
};


module.exports = Filter;


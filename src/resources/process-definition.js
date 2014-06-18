'use strict';

var GenericResource = require("./../generic-resource");

function noop() {}

/**
 * Process definition resource
 * @exports CamSDK.ProcessDefinition
 * @constructor
 */


/**
 * ProcessDefinition
 * @class
 * @classdesc A process definition resource
 * @augments CamSDK.GenericResource
 */
var ProcessDefinition = GenericResource.extend();


/**
 * API path for the process definition resource
 * @type {String}
 */
ProcessDefinition.path = 'process-definition';



// - name:                  Filter by process definition name.
// - nameLike:              Filter by process definition names that the parameter is a substring of.
// - deploymentId:          Filter by the deployment the id belongs to.
// - key:                   Filter by process definition key, i.e. the id in the BPMN 2.0 XML. Exact match.
// - keyLike:               Filter by process definition keys that the parameter is a substring of.
// - category:              Filter by process definition category. Exact match.
// - categoryLike:          Filter by process definition categories that the parameter is a substring of.
// - ver:                   Filter by process definition version.
// - latest:                Only include those process definitions that are latest versions. Values may be true or false.
// - resourceName:          Filter by the name of the process definition resource. Exact match.
// - resourceNameLike:      Filter by names of those process definition resources that the parameter is a substring of.
// - startableBy:           Filter by a user name who is allowed to start the process.
// - active:                Only include active process definitions. Values may be true or false.
// - suspended:             Only include suspended process definitions. Values may be true or false.
// - incidentId:            Filter by the incident id.
// - incidentType:          Filter by the incident type.
// - incidentMessage:       Filter by the incident message. Exact match.
// - incidentMessageLike:   Filter by the incident message that the parameter is a substring of.
//
// - sortBy:                Sort the results lexicographically by a given criterion.
//                          Valid values are category, key, id, name, version and deploymentId.
//                          Must be used in conjunction with the sortOrder parameter.
// - sortOrder:             Sort the results in a given order.
//                          Values may be asc for ascending order or desc for descending order.
//                          Must be used in conjunction with the sortBy parameter.
//
// - firstResult:           Pagination of results. Specifies the index of the first result to return.
// - maxResults:            Pagination of results. Specifies the maximum number of results to return.
//                          Will return less results, if there are no more results left.

/**
 * Get a list of process definitions
 * @param  {Object}           [params] ...
 * @param  {requestCallback}  [done]   ...
 *
 * @example
 * // TODO
 */
ProcessDefinition.list = function(params, done) {
  // allows to pass only a callback
  if (typeof params === 'function') {
    done = params;
    params = {};
  }
  params = params || {};
  done = done || noop;

  return this.http.get(this.path, {
    done: done
  });
};



/**
 * Suspends the process definition instance
 * @param  {Object.<String, *>} [params] ...
 * @param  {requestCallback}    [done]   ...
 */
ProcessDefinition.prototype.suspend = function(params, done) {
  // allows to pass only a callback
  if (typeof params === 'function') {
    done = params;
    params = {};
  }
  params = params || {};
  done = done || noop;

  return this.http.post(this.path, {
    done: done
  });
};



/**
 * Suspends one or more process definitions
 * @param  {String|String[]}    ids      ...
 * @param  {Object.<String, *>} [params] ...
 * @param  {requestCallback}    [done]   ...
 */
ProcessDefinition.suspend = function(ids, params, done) {
  // allows to pass only a callback
  if (typeof params === 'function') {
    done = params;
    params = {};
  }
  params = params || {};
  done = done || noop;
  // allows to pass a single ID
  ids = Array.isArray(ids) ? ids : [ids];

  return this.http.post(this.path, {
    done: done
  });
};

/**
 * Retrieves the statistics of a process definition.
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.stats = function(done) {
  return this.http.post(this.path, {
    done: done || noop
  });
};

/**
 * Retrieves the BPMN 2.0 XML document of a process definition.
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.xml = function(done) {
  return this.http.post(this.path, {
    done: done || noop
  });
};

/**
 * Retrieves the form of a process definition.
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.form = function(done) {
  return this.http.post(this.path, {
    done: done || noop
  });
};

/**
 * Submits the form of a process definition.
 * @param  {Object} [data]    ...
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.submit = function(data, done) {
  return this.http.post(this.path, {
    data: {},
    done: done
  });
};

/**
 * Starts a process instance from a process definition.
 * @param  {Object} [varname]  ...
 * @param  {Function} [done]   ...
 */
ProcessDefinition.prototype.start = function(done) {
  return this.http.post(this.path, {
    data: {},
    done: done
  });
};


module.exports = ProcessDefinition;


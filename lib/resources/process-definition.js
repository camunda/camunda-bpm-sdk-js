'use strict';

var GenericResource = require("./../generic-resource");

/**
 * No-Op callback
 */
function noop() {}

/**
 * Process Definition Resource
 * @class
 * @classdesc A process definition resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.ProcessDefinition
 * @constructor
 */
var ProcessDefinition = GenericResource.extend();


/**
 * API path for the process definition resource
 * @type {String}
 */
ProcessDefinition.path = 'process-definition';

/**
 * Get a list of process definitions
 * @param  {Object} [params]                      Query parameters as follow
 * @param  {String} [params.name]                 Filter by name.
 * @param  {String} [params.nameLike]             Filter by names that the parameter is a substring of.
 * @param  {String} [params.deploymentId]         Filter by the deployment the id belongs to.
 * @param  {String} [params.key]                  Filter by key, i.e. the id in the BPMN 2.0 XML. Exact match.
 * @param  {String} [params.keyLike]              Filter by keys that the parameter is a substring of.
 * @param  {String} [params.category]             Filter by category. Exact match.
 * @param  {String} [params.categoryLike]         Filter by categories that the parameter is a substring of.
 * @param  {String} [params.ver]                  Filter by version.
 * @param  {String} [params.latest]               Only include those process definitions that are latest versions.
 *                                                Values may be "true" or "false".
 * @param  {String} [params.resourceName]         Filter by the name of the process definition resource. Exact match.
 * @param  {String} [params.resourceNameLike]     Filter by names of those process definition resources that the parameter is a substring of.
 * @param  {String} [params.startableBy]          Filter by a user name who is allowed to start the process.
 * @param  {String} [params.active]               Only include active process definitions.
 *                                                Values may be "true" or "false".
 * @param  {String} [params.suspended]            Only include suspended process definitions.
 *                                                Values may be "true" or "false".
 * @param  {String} [params.incidentId]           Filter by the incident id.
 * @param  {String} [params.incidentType]         Filter by the incident type.
 * @param  {String} [params.incidentMessage]      Filter by the incident message. Exact match.
 * @param  {String} [params.incidentMessageLike]  Filter by the incident message that the parameter is a substring of.
 *
 * @param  {String} [params.sortBy]               Sort the results lexicographically by a given criterion.
 *                                                Valid values are category, "key", "id", "name", "version" and "deploymentId".
 *                                                Must be used in conjunction with the "sortOrder" parameter.
 *
 * @param  {String} [params.sortOrder]            Sort the results in a given order.
 *                                                Values may be asc for ascending "order" or "desc" for descending order.
 *                                                Must be used in conjunction with the sortBy parameter.
 *
 * @param  {Integer} [params.firstResult]         Pagination of results. Specifies the index of the first result to return.
 * @param  {Integer} [params.maxResults]          Pagination of results. Specifies the maximum number of results to return.
 *                                                Will return less results, if there are no more results left.

 * @param  {requestCallback} [done]       ...
 *
 * @example
 * CamSDK.resource('process-definition').list({
 *   nameLike: 'Process'
 * }, function(err, results) {
 *   // ...
 * });
 */
ProcessDefinition.list = function(params, done) {
  // allows to pass only a callback
  if (typeof params === 'function') {
    done = params;
    params = {};
  }
  params = params || {};
  done = done || noop;

  var self = this;
  var likeExp = /Like$/;
  var results = {
    count: 0,
    items: []
  };

  var where = {};
  var name, value;
  for (name in params) {
    value = params[name];

    if (likeExp.test(name)) {
      value = '%'+ value +'%';
    }

    where[name] = value;
  }

  // until a new webservice is made available,
  // we need to perform 2 requests
  return this.http.get(this.path +'/count', {
    data: where,
    done: function(err, countRes) {
      if (err) {
        /**
         * @event CamSDK.ProcessDefinition#error
         * @type {Error}
         */
        self.trigger('error', err);
        return done(err);
      }

      results.count = countRes.count;

      self.http.get(self.path, {
        data: where,
        done: function(err, itemsRes) {
          if (err) {
            /**
             * @event CamSDK.ProcessDefinition#error
             * @type {Error}
             */
            self.trigger('error', err);
            return done(err);
          }

          results.items = itemsRes;


          /**
           * @event CamSDK.ProcessDefinition#loaded
           * @type {Object}
           * @property {Number} count is the total of items matching on backend
           * @property {Array} items  is an array of items
           */
          self.trigger('loaded', results);
          done(err, results);
        }
      });
    }
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
ProcessDefinition.submit = function(data, done) {
  var path = this.path;
  if (data.key) {
    path += '/key/'+ data.key;
  }
  else {
    path += '/'+ data.id;
  }
  path += '/submit-form';

  return this.http.post(path, {
    data: data,
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


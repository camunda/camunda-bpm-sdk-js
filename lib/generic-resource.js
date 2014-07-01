'use strict';

var HttpClient = require('./http-client');
var Events = require('./events');


function noop() {}

/**
 * Abstract class for resources
 * @exports CamSDK.GenericResource
 * @constructor
 * @mixes CamSDK.Events
 *
 *
 * @example
 *
 * // create a resource Model
 * var Model = GenericResource.extend({
 *   apiUri: 'path-to-the-endpoint'
 *   doSomethingOnInstance: function() {
 *     // ...
 *   }
 * }, {
 *   somethingStatic: {}
 * });
 *
 * // use the generated Model statically
 * // with events
 * Model.on('eventname', function(results) {
 *   // You probably have something like
 *   var total = results.count;
 *   var instances = results.items;
 * });
 * Model.list({ nameLike: '%call%' });
 *
 * // or alternatively by using a callback
 * Model.list({ nameLike: '%call%' }, function(err, results) {
 *   if (err) {
 *     throw err;
 *   }
 *
 *   var total = results.count;
 *   var instances = results.items;
 * });
 *
 * var instance = new Model();
 * instance.claim(function(err, result) {
 *
 * });
 */
function GenericResource() {
  this.initialize();
}




/**
 * Creates a new Resource Class, very much inspired from Backbone.Model.extend.
 * [Backbone helpers]{@link http://backbonejs.org/docs/backbone.html}
 * @param  {?Object.<String, *>} protoProps   ...
 * @param  {Object.<String, *>} [staticProps] ...
 * @return {CamSDK.GenericResource}           ...
 */
GenericResource.extend = function(protoProps, staticProps) {
  protoProps = protoProps || {};
  staticProps = staticProps || {};

  var parent = this;
  var child, Surrogate, s, i;

  if (protoProps && Object.hasOwnProperty.call(parent, 'constructor')) {
    child = protoProps.constructor;
  }
  else {
    child = function(){ return parent.apply(this, arguments); };
  }

  for (s in parent) {
    child[s] = parent[s];
  }
  for (s in staticProps) {
    child[s] = staticProps[s];
  }

  Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  for (i in protoProps) {
    child.prototype[i] = protoProps[i];
  }

  return child;
};




/**
 * Path used by the resource to perform HTTP queries
 * @abstract
 *
 * @type {String}
 */
GenericResource.path = '';



/**
 * Initializes a GenericResource instance
 *
 * This method is aimed to be overriden by other implementations
 * of the GenericResource.
 * @abstract
 */
GenericResource.prototype.initialize = function() {
  // do something to initialize the instance
  // like copying the Model http property to the "this" (instanciated)
  this.http = this.constructor.http;
};


Events.attach(GenericResource);


/**
 * Object hosting the methods for HTTP queries.
 * @abstract
 *
 * @type {HttpClient}
 */
GenericResource.http = {};



/**
 * Create an instance on the backend
 * @abstract
 *
 * @param  {!Object|Object[]}  attributes        ...
 * @param  {requestCallback} [done]              ...
 */
GenericResource.create = function(attributes, done) {};



/**
 * Fetch a list of instances
 * @abstract
 *
 * @fires CamSDK.GenericResource#error
 * @fires CamSDK.GenericResource#loaded
 *
 * @param  {?Object.<String, String>} params  ...
 * @param  {requestCallback} [done]           ...
 */
GenericResource.list = function(params, done) {
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

  // until a new webservice is made available,
  // we need to perform 2 requests
  return this.http.get(this.path +'/count', {
    data: params,
    done: function(err, countRes) {
      if (err) {
        /**
         * @event CamSDK.GenericResource#error
         * @type {Error}
         */
        self.trigger('error', err);
        return done(err);
      }

      results.count = countRes.count;

      self.http.get(self.path, {
        data: params,
        done: function(err, itemsRes) {
          if (err) {
            /**
             * @event CamSDK.GenericResource#error
             * @type {Error}
             */
            self.trigger('error', err);
            return done(err);
          }

          results.items = itemsRes;
          // QUESTION: should we return that too?
          results.firstResult = parseInt(params.firstResult || 0, 10);
          results.maxResults = results.firstResult + parseInt(params.maxResults || 10, 10);


          /**
           * @event CamSDK.GenericResource#loaded
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
 * Update one or more instances
 * @abstract
 *
 * @param  {!String|String[]}     ids           ...
 * @param  {Object.<String, *>}   attributes    ...
 * @param  {requestCallback} [done]   ...
 */
GenericResource.update = function(ids, attributes, done) {};



/**
 * Delete one or more instances
 * @abstract
 *
 * @param  {!String|String[]}  ids   ...
 * @param  {requestCallback} [done]   ...
 */
GenericResource.delete = function(ids, done) {};



/**
 * Update one or more instances.
 * @abstract
 *
 * @param  {Object}   attributes    ...
 * @param  {requestCallback} [done]  ...
 */
GenericResource.prototype.update = function(attributes, done) {};



/**
 * Delete one or more instances
 * @abstract
 *
 * @param  {requestCallback} [done] ...
 */
GenericResource.prototype.delete = function(done) {};



module.exports = GenericResource;

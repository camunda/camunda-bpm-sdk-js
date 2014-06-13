'use strict';

var HttpClient = require('./http-client');


/**
 * Abstract class for resources
 * @exports cam.sdk.GenericResource
 * @constructor
 *
 * @example
 *
 * // create a resource Model
 * var Model = GenericResource.extend({
 *   appUri: 'path-to-the-endpoint'
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
 * Model.list({ nameLike: ''%call%' }, function(err, results) {
 *   if (err) {
 *     throw err;
 *   }
 *
 *   var total = results.count;
 *   var instances = results.items;
 * });
 */
function GenericResource() {
  this.initialize();
}




/**
 * Creates a new Resource Class, very much inspired from Backbone.Model.extend.
 * [Backbone helpers]{@link http://backbonejs.org/docs/backbone.html}
 * @param  {?Object.<String, *>} protoProps   ...
 * @param  {Object.<String, *>=} staticProps  ...
 * @return {cam.sdk.GenericResource}          ...
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
  this.http = new HttpClient({
    resource: this
  });
};


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
 * @param  {requestCallback=}        done              ...
 */
GenericResource.create = function(attributes, done) {};



/**
 * Fetch a list of instances
 * @abstract
 *
 * @param  {?Object.<String, String>}     where ...
 * @param  {requestCallback=}  done  ...
 */
GenericResource.list = function(where, done) {};



/**
 * Update one or more instances
 * @abstract
 *
 * @param  {!String|String[]}     ids           ...
 * @param  {Object.<String, *>}   attributes    ...
 * @param  {requestCallback=}     done   ...
 */
GenericResource.update = function(ids, attributes, done) {};



/**
 * Delete one or more instances
 * @abstract
 *
 * @param  {!String|String[]}  ids   ...
 * @param  {requestCallback=} done   ...
 */
GenericResource.delete = function(ids, done) {};



/**
 * Update one or more instances.
 * @abstract
 *
 * @param  {Object}   attributes    ...
 * @param  {requestCallback=} done  ...
 */
GenericResource.prototype.update = function(attributes, done) {};



/**
 * Delete one or more instances
 * @abstract
 *
 * @param  {requestCallback=} done ...
 */
GenericResource.prototype.delete = function(done) {};



module.exports = GenericResource;

'use strict';

/**
 * @exports Events
 */

var Events = {};


/**
 * Converts an object into array
 * @param  {*} obj  ...
 * @return {Array}  ...
 */
function toArray(obj) {
  var a, arr = [];
  for (a in obj) {
    arr.push(obj[a]);
  }
  return arr;
}


/**
 * Ensure an object to have the needed _events property
 * @param  {*} obj        ...
 * @param  {String} name  ...
 */
function ensureEvents(obj, name) {
  obj._events = obj._events || {};
  obj._events[name] = obj._events[name] || [];
}


/**
 * Add the relevant Events methods to an object
 * @param  {*} obj  ...
 */
Events.attach = function(obj) {
  obj.on      = this.on;
  obj.once    = this.once;
  obj.off     = this.off;
  obj.trigger = this.trigger;
  obj._events = {};
};


/**
 * Bind a callback to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} callback  ...
 */
Events.on = function(eventName, callback) {
  ensureEvents(this, eventName);

  this._events[eventName].push(callback);

  return this;
};


/**
 * Bind a callback who will only be called once to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} callback  ...
 */
Events.once = function(eventName, callback) {
  ensureEvents(this, eventName);

  return this;
};


/**
 * Unbind one or all callbacks originally bound to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} callback  ...
 */
Events.off = function(eventName, callback) {
  ensureEvents(this, eventName);

  if (!callback) {
    delete this._events[eventName];
    return this;
  }

  var e, ev;
  for (e in this._events[eventName]) {
    if (this._events[eventName][e] === callback) {
      delete this._events[eventName][e];
    }
  }

  return this;
};


/**
 * Call the functions bound to `eventName`
 * @param  {String} eventName ...
 * @param {...*} [params]     ...
 */
Events.trigger = function(eventName) {
  var args = toArray(arguments);
  eventName = args.shift();
  ensureEvents(this, eventName);

  var e, ev;
  for (e in this._events[eventName]) {
    this._events[eventName][e](this, args);
  }

  return this;
};


module.exports = Events;

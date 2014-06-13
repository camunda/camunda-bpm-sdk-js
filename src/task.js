'use strict';

var GenericResource = require("./generic-resource");




/**
 * Task resource
 * @exports cam.sdk.Task
 *
 */



/**
 * Task
 * @class
 * @classdesc A process instance
 * @augments cam.sdk.GenericResource
 */
var Task = GenericResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Task.path = '/task';


/**
 * Assign the task instance to a user
 *
 * @param {String} id [description]
 * @param {requestCallback=} done
 */
Task.prototype.assign = function(id, done) {};


/**
 * Delegate the task instance to a user
 *
 * @param {String} id [description]
 * @param {requestCallback=} done
 */
Task.prototype.delegate = function(done) {};


/**
 * Allow a user to claim (assign to hisself) a task instance
 *
 * @param {requestCallback=} done
 */
Task.prototype.claim = function(done) {};


/**
 * Allow a user to unclaim (unassign to hisself) a task instance
 *
 * @param {requestCallback=} done
 */
Task.prototype.unclaim = function(done) {};


/**
 * Set a task instance as resolved
 *
 * @param {requestCallback=} done
 */
Task.prototype.resolve = function(done) {};


/**
 * Set a task instance as completed
 *
 * @param {requestCallback=} done
 */
Task.prototype.complete = function(done) {};



module.exports = Task;


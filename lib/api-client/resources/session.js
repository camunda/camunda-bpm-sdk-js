'use strict';

var GenericResource = require("./../generic-resource");



/**
 * Session Resource
 * @class
 * @classdesc A variable resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.Session
 * @constructor
 */
var Session = GenericResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Session.path = '';


module.exports = Session;

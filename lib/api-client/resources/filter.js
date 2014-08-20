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

module.exports = Filter;


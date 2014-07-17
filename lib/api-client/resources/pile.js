'use strict';

var GenericResource = require("./../generic-resource");



/**
 * Pile Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.GenericResource
 */
var Pile = GenericResource.extend();

/**
 * API path for the process definition resource
 * @type {String}
 */
Pile.path = 'pile';

module.exports = Pile;


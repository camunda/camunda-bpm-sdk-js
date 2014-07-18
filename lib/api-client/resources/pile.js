'use strict';

var AbstractClientResource = require("./../abstract-client-resource");



/**
 * Pile Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Pile = AbstractClientResource.extend();

/**
 * API path for the process definition resource
 * @type {String}
 */
Pile.path = 'pile';

module.exports = Pile;


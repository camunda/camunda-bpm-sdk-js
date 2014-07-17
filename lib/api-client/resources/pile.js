'use strict';

var GenericResource = require("./../generic-resource");



/**
 * Pile Resource
 * @class
 * @classdesc A variable resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.Pile
 * @constructor
 */
var Pile = GenericResource.extend();

/**
 * API path for the process definition resource
 * @type {String}
 */
Pile.path = 'pile';

module.exports = Pile;


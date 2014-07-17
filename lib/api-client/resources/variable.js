'use strict';

var GenericResource = require("./../generic-resource");



/**
 * Variable Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.GenericResource
 */
var Variable = GenericResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Variable.path = 'variable-instance';

module.exports = Variable;


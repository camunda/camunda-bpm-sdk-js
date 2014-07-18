'use strict';

var AbstractClientResource = require("./../abstract-client-resource");



/**
 * Variable Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Variable = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Variable.path = 'variable-instance';

module.exports = Variable;


'use strict';

var AbstractClientResource = require('./../abstract-client-resource');



/**
 * Batch Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Batch = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Batch.path = 'batch';

module.exports = Batch;

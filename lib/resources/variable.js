'use strict';

var GenericResource = require("./../generic-resource");



/**
 * Variable Resource
 * @class
 * @classdesc A variable resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.Variable
 * @constructor
 */
var Variable = GenericResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Variable.path = 'variable-instance';

module.exports = Variable;


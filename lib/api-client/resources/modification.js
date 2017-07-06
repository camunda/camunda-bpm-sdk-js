'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * Modification Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Modification = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Modification.path = 'modification';

/**
 * Execute a modification
 * @param  {Object}   params
 * @param  {String}   [params.processDefinitionId]
 * @param  {String}   [params.skipCustomListeners]
 * @param  {String}   [params.skipIoMappings]
 * @param  {String}   [params.processInstanceIds]
 * @param  {String}   [params.processInstanceQuery]
 * @param  {String}   [params.instructions]
 * @param  {Function} done
 */
Modification.execute = function(params, done) {
  var path = this.path + '/execute';

  return this.http.post(path, {
    data: params,
    done: done
  });
};

/**
 * Execute a modification asynchronously
 * @param  {Object}   params
 * @param  {String}   [params.processDefinitionId]
 * @param  {String}   [params.skipCustomListeners]
 * @param  {String}   [params.skipIoMappings]
 * @param  {String}   [params.processInstanceIds]
 * @param  {String}   [params.processInstanceQuery]
 * @param  {String}   [params.instructions]
 * @param  {Function} done
 */
Modification.executeAsync = function(params, done) {
  var path = this.path + '/executeAsync';

  return this.http.post(path, {
    data: params,
    done: done
  });
};

module.exports = Modification;

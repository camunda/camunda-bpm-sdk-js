'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * Migration Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Migration = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Migration.path = 'migration';

/**
 * Generate a migration plan for a given source and target process definition
 * @param  {Object}   params
 * @param  {String}   [params.sourceProcessDefinitionId]
 * @param  {String}   [params.targetProcessDefinitionId]
 * @param  {Function} done
 */
Migration.generate = function (params, done) {
  var path = this.path + '/generate';

  return this.http.post(path, {
    data: params,
    done: done
  });
};

/**
 * Execute a migration plan
 * @param  {Object}   params
 * @param  {String}   [params.migrationPlan]
 * @param  {String}   [params.processInstanceIds]
 * @param  {Function} done
 */
Migration.execute = function (params, done) {
  var path = this.path + '/execute';

  return this.http.post(path, {
    data: params,
    done: done
  });
};

module.exports = Migration;

'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * CaseDefinition Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var CaseDefinition = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
CaseDefinition.path = 'case-definition';



  /**
   * Retrieve a single case definition
   *
   * @param  {uuid}     id    of the case definition to be requested
   * @param  {Function} done
   */
CaseDefinition.get = function(id, done) {
    return this.http.get(this.path +'/'+ id, {
      done: done
    });
};


  /**
   * Retrieve a single cace definition
   *
   * @param  {String}   key    of the case definition to be requested
   * @param  {Function} done
   */
CaseDefinition.getByKey = function(key, done) {
    return this.http.get(this.path +'/key/'+ key, {
      done: done
    });
};

CaseDefinition.list = function(params, done) {
  return this.http.get(this.path, {
    data: params,
    done: done
  });
};

/**
 * Instantiates a given case definition.
 *
 * @param {Object} [params]
 * @param {String} [params.id]              The id of the case definition to be instantiated. Must be omitted if key is provided.
 * @param {String} [params.key]             The key of the case definition (the latest version thereof) to be instantiated. Must be omitted if id is provided.
 * @param {String} [params.variables]       A JSON object containing the variables the case is to be initialized with. Each key corresponds to a variable name and each value to a variable value.
 * @param {String} [params.businessKey]     The business key the case instance is to be initialized with. The business key identifies the case instance in the context of the given case definition.
 */
CaseDefinition.create = function(params, done) {
  return this.http.post(this.path + '/' + (params.id ? params.id : 'key/' + params.key ) + '/create', {
    data: params,
    done: done
  });
};

module.exports = CaseDefinition;

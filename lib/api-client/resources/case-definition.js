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

CaseDefinition.list = function(params, done) {
  return this.http.get(this.path, {
    data: params,
    done: done
  });
};

CaseDefinition.create = function(caseDefinitionId, params, done) {
  this.http.post(this.path + '/' + caseDefinitionId + '/create', {
    data: params,
    done: done
  });
};

module.exports = CaseDefinition;

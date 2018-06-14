'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * Message Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Message = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Message.path = 'message';


/**
 * correlates a message
 *
 * @param {Object} [params]
 * @param {String} [params.messageName]     The message name of the message to be corrolated
 * @param {String} [params.businessKey]     The business key the workflow instance is to be initialized with. The business key identifies the workflow instance in the context of the given workflow definition.
 * @param {String} [params.correlationKeys]       A JSON object containing the keys the recieve task is to be corrolated with. Each key corresponds to a variable name and each value to a variable value.
 * @param {String} [params.processVariables]       A JSON object containing the variables the recieve task is to be corrolated with. Each key corresponds to a variable name and each value to a variable value.
 */
Message.correlate = function(params, done) {
  var url = this.path + '/';

  return this.http.post(url, {
    data: params,
    done: done
  });
};

module.exports = Message;

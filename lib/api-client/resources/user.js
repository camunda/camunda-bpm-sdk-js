'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * User Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var User = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
User.path = 'user';



User.create = function (options, done) {
  options = options || {};

  var data = {
    profile: {
      id: options.id
    },
    credentials: {
      password: options.password
    }
  };

  if (options.firstName) {
    data.profile.firstName = options.firstName;
  }
  if (options.lastName) {
    data.profile.lastName = options.lastName;
  }
  if (options.email) {
    data.profile.email = options.email;
  }

  return this.http.post(this.path +'/create', {
    data: data,
    done: done || function() {}
  });
};



module.exports = User;

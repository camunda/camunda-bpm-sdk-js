'use strict';

var Q = require('q');
var AbstractClientResource = require('./../abstract-client-resource');

/**
 * No-Op callback
 */
function noop() {}

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


/**
 * Creates a user
 * @param  {Object}   options
 * @param  {String}   options.id
 * @param  {String}   options.password
 * @param  {String}   options.firstName
 * @param  {String}   options.lastName
 * @param  {String}   [options.email]
 * @param  {Function} done
 */
User.create = function (options, done) {
  options = options || {};
  done = done || noop;

  var required = [
    'id',
    'firstName',
    'lastName',
    'password'
  ];
  for (var r in required) {
    var name = required[r];
    if (!options[name]) {
      var err = new Error('Missing ' + name + ' option to create user');
      done(err);
      return Q.reject(err);
    }
  }

  var data = {
    profile: {
      id: options.id,
      firstName: options.firstName,
      lastName: options.lastName
    },
    credentials: {
      password: options.password
    }
  };

  if (options.email) {
    data.profile.email = options.email;
  }

  return this.http.post(this.path +'/create', {
    data: data,
    done: done
  });
};


/**
 * List users
 * @param {Object} [options]
 * @param {String} [options.id]            Filter by the id of the user.
 * @param {String} [options.firstName]     Filter by the firstname of the user.
 * @param {String} [options.firstNameLike] Filter by the firstname that the parameter is a substring of.
 * @param {String} [options.lastName]      Filter by the lastname of the user.
 * @param {String} [options.lastNameLike]  Filter by the lastname that the parameter is a substring of.
 * @param {String} [options.email]         Filter by the email of the user.
 * @param {String} [options.emailLike]     Filter by the email that the parameter is a substring of.
 * @param {String} [options.memberOfGroup] Filter for users which are members of a group.
 * @param {String} [options.sortBy]        Sort the results lexicographically by a given criterion. Valid values are userId, firstName, lastName and email. Must be used in conjunction with the sortOrder parameter.
 * @param {String} [options.sortOrder]     Sort the results in a given order. Values may be asc for ascending order or desc for descending order. Must be used in conjunction with the sortBy parameter.
 * @param {String} [options.firstResult]   Pagination of results. Specifies the index of the first result to return.
 * @param {String} [options.maxResults]    Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.
 * @param  {Function} done
 */
User.list = function (options, done) {
  if (arguments.length === 1) {
    done = options;
    options = {};
  }
  else {
    options = options || {};
  }

  return this.http.get(this.path, {
    data: options,
    done: done || noop
  });
};


/**
 * Count the amount of users
 * @param {String} [options.id]            id of the user.
 * @param {String} [options.firstName]     firstname of the user.
 * @param {String} [options.firstNameLike] firstname that the parameter is a substring of.
 * @param {String} [options.lastName]      lastname of the user.
 * @param {String} [options.lastNameLike]  lastname that the parameter is a substring of.
 * @param {String} [options.email]         email of the user.
 * @param {String} [options.emailLike]     email that the parameter is a substring of.
 * @param {String} [options.memberOfGroup] users which are members of a group.
 * @param  {Function} done
 */
User.count = function (options, done) {
  if (arguments.length === 1) {
    done = options;
    options = {};
  }
  else {
    options = options || {};
  }

  return this.http.get(this.path + '/count', {
    data: options,
    done: done || noop
  });
};


/**
 * Get the profile of a user
 * @param  {Object|uuid}  options
 * @param  {uuid}         options.id
 * @param  {Function} done
 */
User.profile = function (options, done) {
  var id = typeof options === 'string' ? options : options.id;

  return this.http.get(this.path + '/' + id + '/profile', {
    done: done || noop
  });
};


/**
 * Updates the profile of a user
 * @param  {Object}   options
 * @param  {uuid}     options.id id of the user to be updated
 * @param  {String}   [options.firstName]
 * @param  {String}   [options.lastName]
 * @param  {String}   [options.email]
 * @param  {Function} done
 */
User.updateProfile = function (options, done) {
  options = options || {};
  done = done || noop;

  if (!options.id) {
    var err = new Error('Missing id option to update user profile');
    done(err);
    return Q.reject(err);
  }

  return this.http.put(this.path + '/' + options.id + '/profile', {
    data: options,
    done: done
  });
};



/**
 * Update the credentials of a user
 * @param {Object} options
 * @param {uuid} options.id                           The user's (who will be updated) id
 * @param {String} options.password                     The user's new password.
 * @param {String} [options.authenticatedUserPassword]  The password of the authenticated user who changes the password of the user (ie. the user with passed id as path parameter).
 * @param  {Function} done
 */
User.updateCredentials = function (options, done) {
  options = options || {};
  done = done || noop;
  var err;

  if (!options.id) {
    err = new Error('Missing id option to update user credentials');
    done(err);
    return Q.reject(err);
  }

  if (!options.password) {
    err = new Error('Missing password option to update user credentials');
    done(err);
    return Q.reject(err);
  }

  var data = {
    password: options.password
  };

  if (options.authenticatedUserPassword) {
    data.authenticatedUserPassword = options.authenticatedUserPassword;
  }

  return this.http.put(this.path + '/' + options.id + '/credentials', {
    data: data,
    done: done
  });
};


/**
 * Delete a user
 * @param  {Object|uuid} options You can either pass an object (with at least a id property) or the id of the user to be deleted
 * @param  {uuid} options.id
 * @param  {Function} done
 */
User.delete = function (options, done) {
  var id = typeof options === 'string' ? options : options.id;

  return this.http.del(this.path + '/' + id, {
    done: done || noop
  });
};

module.exports = User;

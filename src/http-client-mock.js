'use strict';

var request = require('superagent');
var Events = require('./events');


/**
 * HttpClient
 * @exports CamSDK.HttpClientMock
 * @augments {CamSDK.HttpClient}
 * @class
 * @classdesc A mocking implementation of CamSDK.HttpClient
 */
var HttpClient = function(config) {
  config = config || {};

  if (!config.baseUrl) {
    throw new Error('HttpClientMock needs a `baseUrl` configuration property.');
  }

  Events.attach(this);

  this.config = config;
};

module.exports = HttpClient;

'use strict';
var Events = require('./../events');

/**
 * For all API client related
 * @namespace CamSDK.client
 */

/**
 * For the resources implementations
 * @namespace CamSDK.client.resource
 */

/**
 * Entry point of the module
 *
 * @class CamundaClient
 * @memberof CamSDK.client
 *
 * @param  {Object} config                  used to provide necessary configuration
 * @param  {String} [config.engine=default]
 * @param  {String} config.apiUri
 * @param  {String} [config.headers]        Headers that should be used for all Http requests.
 */
function CamundaClient(config) {
  if (!config) {
    throw new Error('Needs configuration');
  }

  if (!config.apiUri) {
    throw new Error('An apiUri is required');
  }

  Events.attach(this);

  config.engine = config.engine || 'default';

  // mock by default.. for now
  config.mock =  typeof config.mock !== 'undefined' ? config.mock : true;

  config.resources = config.resources || {};

  this.HttpClient = config.HttpClient || CamundaClient.HttpClient;

  this.baseUrl = config.apiUri;
  if(this.baseUrl.slice(-1) !== '/') {
    this.baseUrl += '/';
  }
  this.baseUrl += 'engine/'+ config.engine;

  this.config = config;

  this.initialize();
}

/**
 * [HttpClient description]
 * @memberof CamSDK.client.CamundaClient
 * @name HttpClient
 * @type {CamSDK.client.HttpClient}
 */
CamundaClient.HttpClient = require('./http-client');

// provide an isolated scope
(function(proto){
  /**
   * configuration storage
   * @memberof CamSDK.client.CamundaClient.prototype
   * @name  config
   * @type {Object}
   */
  proto.config = {};

  var _resources = {};

  /**
   * @memberof CamSDK.client.CamundaClient.prototype
   * @name initialize
   */
  proto.initialize = function() {
    /* jshint sub: true */
    _resources['authorization']       = require('./resources/authorization');
    _resources['deployment']          = require('./resources/deployment');
    _resources['external-task']          = require('./resources/external-task');
    _resources['filter']              = require('./resources/filter');
    _resources['history']             = require('./resources/history');
    _resources['process-definition']  = require('./resources/process-definition');
    _resources['process-instance']    = require('./resources/process-instance');
    _resources['task']                = require('./resources/task');
    _resources['variable']            = require('./resources/variable');
    _resources['case-execution']      = require('./resources/case-execution');
    _resources['case-instance']       = require('./resources/case-instance');
    _resources['case-definition']     = require('./resources/case-definition');
    _resources['user']                = require('./resources/user');
    _resources['group']               = require('./resources/group');
    _resources['incident']            = require('./resources/incident');
    _resources['job']                 = require('./resources/job');
    _resources['metrics']             = require('./resources/metrics');
    _resources['decision-definition'] = require('./resources/decision-definition');
    _resources['execution']           = require('./resources/execution');
    _resources['migration']           = require('./resources/migration');
    /* jshint sub: false */
    var self = this;

    function forwardError(err) {
      self.trigger('error', err);
    }

    // create global HttpClient instance
    this.http = new this.HttpClient({baseUrl: this.baseUrl, headers: this.config.headers});

    // configure the client for each resources separately,
    var name, conf, resConf, c;
    for (name in _resources) {

      conf = {
        name:     name,
        // use the SDK config for some default values
        mock:     this.config.mock,
        baseUrl:  this.baseUrl,
        headers:  this.config.headers
      };
      resConf = this.config.resources[name] || {};

      for (c in resConf) {
        conf[c] = resConf[c];
      }

      // instanciate a HTTP client for the resource
      _resources[name].http = new this.HttpClient(conf);

      // forward request errors
      _resources[name].http.on('error', forwardError);
    }
  };

  /**
   * Allows to get a resource from SDK by its name
   * @memberof CamSDK.client.CamundaClient.prototype
   * @name resource
   *
   * @param  {String} name
   * @return {CamSDK.client.AbstractClientResource}
   */
  proto.resource = function(name) {
    return _resources[name];
  };
}(CamundaClient.prototype));


module.exports = CamundaClient;


/**
 * A [universally unique identifier]{@link en.wikipedia.org/wiki/Universally_unique_identifier}
 * @typedef {String} uuid
 */


/**
 * This callback is displayed as part of the Requester class.
 * @callback requestCallback
 * @param {?Object} error
 * @param {CamSDK.AbstractClientResource|CamSDK.AbstractClientResource[]} [results]
 */


/**
 * Function who does not perform anything
 * @callback noopCallback
 */

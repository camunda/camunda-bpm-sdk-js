'use strict';

var AbstractClientResource = require('./../abstract-client-resource');



var JobDefinition = AbstractClientResource.extend();

JobDefinition.path = 'job-definition';

JobDefinition.setRetries = function(params, done) {
  return this.http.put(this.path + '/' + params.id + '/retries', {
    data: params,
    done: done
  });
};

module.exports = JobDefinition;

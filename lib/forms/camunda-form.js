'use strict';
/* global CamSDK: false */
var $ = require('./dom-lib'),
    VariableManager = require('./variable-manager'),
    // BaseClass = require('./../base-class'),
    InputFieldHandler = require('./controls/input-field-handler'),
    ChoicesFieldHandler = require('./controls/choices-field-handler');

function CamundaForm(options) {

  if(!options) {
    throw new Error("CamundaForm need to be initialized with options.");
  }

  if (options.service) {
    this.service = options.service;
  }
  else {
    this.service = new CamSDK(options.serviceConfig || {});
  }

  if (!options.taskId && !options.processDefinitionId && !options.processDefinitionKey) {
    throw new Error("Cannot initialize Taskform: either 'taskId' or 'processDefinitionId' or 'processDefinitionKey' must be provided");
  }
  this.taskId = options.taskId;
  this.processDefinitionId = options.processDefinitionId;
  this.processDefinitionKey = options.processDefinitionKey;

  this.formElement = options.formElement;
  this.containerElement = options.containerElement;
  this.formUrl = options.formUrl;

  if(!this.formElement && !this.containerElement) {
    throw new Error("CamundaForm needs to be initilized with either 'formElement' or 'containerElement'");
  }

  if(!this.formElement && !this.formUrl) {
    throw new Error("Camunda form needs to be intialized with either 'formElement' or 'formUrl'");
  }

  this.variableManager = new VariableManager({
    service: this.service
  });

  this.formFieldHandlers = options.formFieldHandlers || [
    InputFieldHandler,
    ChoicesFieldHandler
  ];

  this.fields = [];

  this.initialize(options.initialized);
}

CamundaForm.prototype.initializeHandler = function(FieldHandler) {
  var self = this;
  var selector = FieldHandler.selector;
  $(selector, self.formElement).each(function() {
    self.fields.push(new FieldHandler(this, self.variableManager));
  });
};

CamundaForm.prototype.initialize = function(done) {
  done = done || function() {};
  var self = this;

  // check whether form needs to be loaded first
  if(this.formUrl) {
    this.service.http.load(this.formUrl, {
      done: function(err, result) {
        if(err) {
          return done(err);
        }

        self.renderForm(result);

        self.initializeForm(done);

      }
    });
  } else {
    this.initializeForm(done);
  }
};

CamundaForm.prototype.renderForm = function(formHtmlSource) {

  // apppend the form html to the container element,
  // we also wrap the formHtmlSource to limit the risks of breaking
  // the structure of the document
  $(this.containerElement).html('').append('<div class="injected-form-wrapper">'+formHtmlSource+'</div>');

  // extract and validate form element
  this.formElement = $("form[cam-form]", this.containerElement);
  if(this.formElement.length !== 1) {
    throw new Error("Form must provide exaclty one element <form cam-form ..>");
  }

};

CamundaForm.prototype.initializeForm = function(done) {
  var self = this;
  for(var FieldHandler in this.formFieldHandlers) {
    this.initializeHandler(this.formFieldHandlers[FieldHandler]);
  }

  this.fetchVariables(function(err, result) {
    if (err) {
      throw err;
    }

    // merge the variables
    self.mergeVariables(result);

    // apply the variables to the form fields
    self.applyVariables();

    // invoke callback
    done();
  });
};

CamundaForm.prototype.submit = function(callback) {

  // get values from form fields
  this.retrieveVariables();

  // submit the form variables
  this.submitVariables(function(err, result) {
    if(err) {
      return callback(err);
    }

    callback(null, result);
  });
};

CamundaForm.prototype.fetchVariables = function(done) {
  done = done || function(){};
  var data = {
    names: this.variableManager.variableNames()
  };

  // pass either the taskId, processDefinitionId or processDefinitionKey
  if (this.taskId) {
    data.id = this.taskId;
    this.service.resource('task').formVariables(data, done);
  }
  else {
    data.id = this.processDefinitionId;
    data.key = this.processDefinitionKey;
    this.service.resource('process-definition').formVariables(data, done);
  }
};

CamundaForm.prototype.submitVariables = function(done) {
  done = done || function() {};

  var vars = this.variableManager.variables;

  var variableData = {};
  for(var v in vars) {
    // only submit dirty variables
    if(!!vars[v].isDirty) {
      variableData[v] = {
        value: vars[v].value,
        type: vars[v].type
      };
    }
  }

  var data = { variables: variableData };

  // pass either the taskId, processDefinitionId or processDefinitionKey
  if (this.taskId) {
    data.id = this.taskId;
    this.service.resource('task').submitForm(data, done);
  }
  else {
    data.id = this.processDefinitionId;
    data.key = this.processDefinitionKey;
    this.service.resource('process-definition').submitForm(data, done);
  }


};

CamundaForm.prototype.mergeVariables = function(variables) {

  var vars = this.variableManager.variables;

  for (var v in variables) {
    if (vars[v]) {
      for (var p in variables[v]) {
        vars[v][p] = vars[v][p] || variables[v][p];
      }
    }
    else {
      vars[v] = variables[v];
    }
  }
};

CamundaForm.prototype.applyVariables = function() {

  for (var i in this.fields) {
    this.fields[i].applyValue();
  }

};

CamundaForm.prototype.retrieveVariables = function() {

  for (var i in this.fields) {
    this.fields[i].getValue();
  }

};

CamundaForm.$ = $;

module.exports = CamundaForm;


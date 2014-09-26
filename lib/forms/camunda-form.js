'use strict';
/* global CamSDK: false */

/**
 * For all API client related
 * @namespace CamSDK.form
 */

var $ = require('./dom-lib');

var VariableManager = require('./variable-manager');

var InputFieldHandler = require('./controls/input-field-handler');

var ChoicesFieldHandler = require('./controls/choices-field-handler');

var BaseClass = require('./../base-class');

var constants = require('./constants');

var Events = require('./../events');



/**
 * A class to help handling embedded forms
 *
 * @class
 * @memberof CamSDk.form
 *
 * @param {Object.<String,*>} options
 * @param {Cam}               options.client
 * @param {String}            [options.taskId]
 * @param {String}            [options.processDefinitionId]
 * @param {String}            [options.processDefinitionKey]
 * @param {Element}           [options.formContainer]
 * @param {Element}           [options.formElement]
 * @param {String}            [options.formUrl]
 */
function CamundaForm(options) {
  if(!options) {
    throw new Error("CamundaForm need to be initialized with options.");
  }

  if (options.client) {
    this.client = options.client;
  }
  else {
    this.client = new CamSDK.Client(options.clientConfig || {});
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

  /**
   * A VariableManager instance
   * @type {VariableManager}
   */
  this.variableManager = new VariableManager({
    client: this.client
  });

  /**
   * An array of FormFieldHandlers
   * @type {FormFieldHandlers[]}
   */
  this.formFieldHandlers = options.formFieldHandlers || [
    InputFieldHandler,
    ChoicesFieldHandler
  ];

  this.fields = [];

  this.scripts = [];

  this.options = options;

  // init event support
  Events.attach(this);

  this.initialize(options.initialized);
}



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.initializeHandler = function(FieldHandler) {
  var self = this;
  var selector = FieldHandler.selector;
  $(selector, self.formElement).each(function() {
    self.fields.push(new FieldHandler(this, self.variableManager));
  });
};



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.initialize = function(done) {
  done = done || function() {};
  var self = this;

  // check whether form needs to be loaded first
  if(this.formUrl) {
    this.client.http.load(this.formUrl, {
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



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.renderForm = function(formHtmlSource) {

  // apppend the form html to the container element,
  // we also wrap the formHtmlSource to limit the risks of breaking
  // the structure of the document
  $(this.containerElement).html('').append('<div class="injected-form-wrapper">'+formHtmlSource+'</div>');

  // extract and validate form element
  this.formElement = $("form", this.containerElement);
  if(this.formElement.length !== 1) {
    throw new Error("Form must provide exaclty one element <form ..>");
  }

};



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.initializeForm = function(done) {
  var self = this;

  // handle form scripts
  this.initializeFormScripts();

  // initialize field handlers
  for(var FieldHandler in this.formFieldHandlers) {
    this.initializeHandler(this.formFieldHandlers[FieldHandler]);
  }

  // execute the scripts
  this.executeFormScripts();

  // fire form loaded
  this.fireEvent('form-loaded');

  this.fetchVariables(function(err, result) {
    if (err) {
      throw err;
    }

    // merge the variables
    self.mergeVariables(result);

    // fire variables fetched
    self.fireEvent('variables-fetched');

    // apply the variables to the form fields
    self.applyVariables();

    // fire variables applied
    self.fireEvent('variables-applied');

    // invoke callback
    done();
  });
};

/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.initializeFormScripts = function() {
  var formScriptElements = $( 'script['+constants.DIRECTIVE_CAM_SCRIPT+']', this.formElement);
  for(var i = 0; i<formScriptElements.length; i++) {
    this.scripts.push(formScriptElements[i].text);
  }
};

CamundaForm.prototype.executeFormScripts = function() {
  for(var i = 0; i<this.scripts.length; i++) {
    this.executeFormScript(this.scripts[i]);
  }
};

CamundaForm.prototype.executeFormScript = function(script) {
  (function(camForm) {

    /* jshint evil: true */
    eval(script);
    /* jshint evil: false */

  })(this);
};

/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.submit = function(callback) {

  // fire submit event (event handler may prevent submit from being performed)
  this.submitPrevented = false;
  this.fireEvent('submit');
  if (!!this.submitPrevented) {
    return;
  }

  // get values from form fields
  this.retrieveVariables();

  var self = this;
  // submit the form variables
  this.submitVariables(function(err, result) {
    if(err) {
      self.fireEvent('submit-failed', err);
      return callback(err);
    }

    self.fireEvent('submit-success');
    callback(null, result);
  });
};



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.fetchVariables = function(done) {
  done = done || function(){};
  var data = {
    names: this.variableManager.variableNames()
  };

  // pass either the taskId, processDefinitionId or processDefinitionKey
  if (this.taskId) {
    data.id = this.taskId;
    this.client.resource('task').formVariables(data, done);
  }
  else {
    data.id = this.processDefinitionId;
    data.key = this.processDefinitionKey;
    this.client.resource('process-definition').formVariables(data, done);
  }
};



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.submitVariables = function(done) {
  done = done || function() {};

  var vars = this.variableManager.variables;

  var variableData = {};
  for(var v in vars) {
    // only submit dirty variables
    // LIMITATION: dirty checking is not performed for complex object variables
    if(!!vars[v].isDirty || vars[v].type === 'Object') {
      var val = vars[v].value;
      // if variable is JSON, serialize
      if(this.variableManager.isJsonVariable(v)) {
        val = JSON.stringify(val);
      }
      variableData[v] = {
        value: val,
        type: vars[v].type,
        serializationConfig: vars[v].serializationConfig
      };
    }
  }

  var data = { variables: variableData };

  // pass either the taskId, processDefinitionId or processDefinitionKey
  if (this.taskId) {
    data.id = this.taskId;
    this.client.resource('task').submitForm(data, done);
  }
  else {
    data.id = this.processDefinitionId;
    data.key = this.processDefinitionKey;
    this.client.resource('process-definition').submitForm(data, done);
  }


};



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
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
    // check whether the variable provides JSON payload. If true, deserialize
    if(this.variableManager.isJsonVariable(v)) {
      vars[v].value = JSON.parse(variables[v].value);
    }
    // check whether the variable is a Serialized Java Object. If true, unbox
    if(this.variableManager.isSerializedObjectVariable(v)) {
      vars[v].value = vars[v].value.object;
    }
    this.variableManager.isVariablesFetched = true;
  }
};



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.applyVariables = function() {

  for (var i in this.fields) {
    this.fields[i].applyValue();
  }

};



/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.retrieveVariables = function() {

  for (var i in this.fields) {
    this.fields[i].getValue();
  }

};

/**
 * @memberof CamSDK.form.CamundaForm.prototype
 */
CamundaForm.prototype.fireEvent = function(eventName, obj) {
  this.trigger(eventName, obj);
};

/**
 * @memberof CamSDK.form.CamundaForm
 */
CamundaForm.$ = $;

CamundaForm.VariableManager = VariableManager;
CamundaForm.fields = {};
CamundaForm.fields.InputFieldHandler = InputFieldHandler;
CamundaForm.fields.ChoicesFieldHandler = ChoicesFieldHandler;

/**
 * @memberof CamSDK.form.CamundaForm
 * @borrows CamSDK.BaseClass.extend as extend
 * @name extend
 * @type {Function}
 */
CamundaForm.extend = BaseClass.extend;

module.exports = CamundaForm;


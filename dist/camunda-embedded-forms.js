!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.CamFormSDK=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var Events = _dereq_('./events');


function noop() {}

/**
 * Abstract class for classes
 * @exports CamSDK.BaseClass
 * @constructor
 * @mixes CamSDK.Events
 */
function BaseClass() {
  this.initialize();
}




/**
 * Creates a new Resource Class, very much inspired from Backbone.Model.extend.
 * [Backbone helpers]{@link http://backbonejs.org/docs/backbone.html}
 * @param  {?Object.<String, *>} protoProps   ...
 * @param  {Object.<String, *>} [staticProps] ...
 * @return {CamSDK.BaseClass}           ...
 */
BaseClass.extend = function(protoProps, staticProps) {
  protoProps = protoProps || {};
  staticProps = staticProps || {};

  var parent = this;
  var child, Surrogate, s, i;

  if (protoProps && Object.hasOwnProperty.call(parent, 'constructor')) {
    child = protoProps.constructor;
  }
  else {
    child = function(){ return parent.apply(this, arguments); };
  }

  for (s in parent) {
    child[s] = parent[s];
  }
  for (s in staticProps) {
    child[s] = staticProps[s];
  }

  Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  for (i in protoProps) {
    child.prototype[i] = protoProps[i];
  }

  return child;
};


/**
 * Aimed to be overriden in order to initialize an instance.
 * @type {Function}
 */
BaseClass.prototype.initialize = noop;


Events.attach(BaseClass);



module.exports = BaseClass;

},{"./events":2}],2:[function(_dereq_,module,exports){
'use strict';

/**
 * Events handling utility who can be used on
 * any kind of object to provide `on`, `once`, `off`
 * and `trigger` functions.
 *
 * @exports CamSDK.Events
 * @mixin
 *
 * @example
 * var obj = {};
 * Events.attach(obj);
 *
 * obj.on('event:name', function() {});
 * obj.once('event:name', function() {});
 * obj.trigger('event:name', data, moreData, evenMoreData);
 */

var Events = {};


/**
 * Converts an object into array
 * @param  {*} obj  ...
 * @return {Array}  ...
 */
function toArray(obj) {
  var a, arr = [];
  for (a in obj) {
    arr.push(obj[a]);
  }
  return arr;
}

/**
 * Returns a function that will be executed
 * at most one time, no matter how often you call it.
 * @param  {Function} func ...
 * @return {Function}      ...
 */
function once(func) {
  var ran = false, memo;
  return function() {
    if (ran) return memo;
    ran = true;
    memo = func.apply(this, arguments);
    func = null;
    return memo;
  };
}


/**
 * Ensure an object to have the needed _events property
 * @param  {*} obj        ...
 * @param  {String} name  ...
 */
function ensureEvents(obj, name) {
  obj._events = obj._events || {};
  obj._events[name] = obj._events[name] || [];
}


/**
 * Add the relevant Events methods to an object
 * @param  {*} obj  ...
 */
Events.attach = function(obj) {
  obj.on      = this.on;
  obj.once    = this.once;
  obj.off     = this.off;
  obj.trigger = this.trigger;
  obj._events = {};
};


/**
 * Bind a callback to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} callback  ...
 */
Events.on = function(eventName, callback) {
  ensureEvents(this, eventName);

  this._events[eventName].push(callback);

  return this;
};


/**
 * Bind a callback who will only be called once to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} callback  ...
 */
Events.once = function(eventName, callback) {
  var self = this;
  var cb = once(function() {
    self.off(eventName, once);
    callback.apply(this, arguments);
  });
  cb._callback = callback;
  return this.on(eventName, cb);
};


/**
 * Unbind one or all callbacks originally bound to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} [callback]  ...
 */
Events.off = function(eventName, callback) {
  ensureEvents(this, eventName);

  if (!callback) {
    delete this._events[eventName];
    return this;
  }

  var e, ev, arr = [];
  for (e in this._events[eventName]) {
    if (this._events[eventName][e] !== callback) {
      arr.push(this._events[eventName][e]);
    }
  }
  this._events[eventName] = arr;

  return this;
};


/**
 * Call the functions bound to `eventName`
 * @param  {String} eventName ...
 * @param {...*} [params]     ...
 */
Events.trigger = function() {
  var args = toArray(arguments);
  var eventName = args.shift();
  ensureEvents(this, eventName);

  var e, ev;
  for (e in this._events[eventName]) {
    this._events[eventName][e](this, args);
  }

  return this;
};


module.exports = Events;

},{}],3:[function(_dereq_,module,exports){
'use strict';
/* global CamSDK: false */
var $ = _dereq_('./dom-lib'),
    VariableManager = _dereq_('./variable-manager'),
    // BaseClass = require('./../base-class'),
    InputFieldHandler = _dereq_('./controls/input-field-handler');

function CamundaForm(formElement, options) {
  options = options || {};

  if (options.service) {
    this.service = options.service;
  }
  else {
    this.service = new CamSDK(options.serviceConfig || {});
  }

  if (!options.taskId && !options.processDefinitionId && !options.processDefinitionKey) {
    throw new Error('Dude!? how should I deal with that???');
  }

  this.formElement = formElement;

  this.variableManager = new VariableManager({
    service: this.service
  });

  this.formFieldHandlers = options.formFieldHandlers || [
    InputFieldHandler
  ];

  this.fields = [];

  this.initialize();
}

CamundaForm.prototype.initializeHandler = function(FieldHandler) {
  var self = this;
  var selector = FieldHandler.selector;
  $(selector, self.formElement).each(function() {
    self.fields.push(new FieldHandler(this, self.variableManager));
  });
};

CamundaForm.prototype.initialize = function() {
  for(var FieldHandler in this.formFieldHandlers) {
    this.initializeHandler(this.formFieldHandlers[FieldHandler]);
  }

  var vars = this.variableManager.variables;
  this.fetchVariables(function(err, result) {
    if (err) {
      throw err;
    }


    for (var v in result) {
      if (vars[v]) {
        for (var p in result[v]) {
          vars[v][p] = vars[v][p] || result[v][p];
        }
      }
      else {
        vars[v] = result[v];
      }
    }
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

CamundaForm.$ = $;

module.exports = CamundaForm;


},{"./controls/input-field-handler":6,"./dom-lib":7,"./variable-manager":9}],4:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  DIRECTIVE_CAM_FORM : 'cam-form',
  DIRECTIVE_CAM_VARIABLE_NAME : 'cam-variable-name',
  DIRECTIVE_CAM_VARIABLE_TYPE : 'cam-variable-type'
};

},{}],5:[function(_dereq_,module,exports){
'use strict';

var BaseClass = _dereq_('../../base-class'),
    $ = _dereq_('./../dom-lib');

var AbstractFormField = function(element, variableManager) {

  this.element = $( element );
  this.variableManager = variableManager;

  this.variableName = null;

  this.initialize();
};

var noop = function() {};

AbstractFormField.selector = null;
AbstractFormField.prototype.initialize = noop;
AbstractFormField.prototype.applyValue = noop;
AbstractFormField.prototype.getValue = noop;

AbstractFormField.extend = BaseClass.extend;

module.exports = AbstractFormField;


},{"../../base-class":1,"./../dom-lib":7}],6:[function(_dereq_,module,exports){
'use strict';

var constants = _dereq_('./../constants'),
    AbstractFormField = _dereq_('./abstract-form-field'),
    $ = _dereq_('./../dom-lib');

var InputFieldHandler = AbstractFormField.extend({

  initialize: function() {
    // read variable definitions from markup
    var variableName = this.element.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
    var variableType = this.element.attr(constants.DIRECTIVE_CAM_VARIABLE_TYPE);

    // crate variable
    this.variableManager.createVariable({
      name: variableName,
      type: variableType
    });

    // remember variable name
    this.variableName = variableName;
  },

  applyValue: function() {
    // write value to html control
    this.element.val(this.variableManager.variableValue(this.variableName));
  },

  getValue: function() {
    // read value from html control
    var value = this.element.val();
    // write value to variable
    this.variableManager.variableValue(this.variableName, value);
  }

}, {

  selector: 'input['+ constants.DIRECTIVE_CAM_VARIABLE_NAME +'],textarea['+ constants.DIRECTIVE_CAM_VARIABLE_NAME +']'

});

module.exports = InputFieldHandler;


},{"./../constants":4,"./../dom-lib":7,"./abstract-form-field":5}],7:[function(_dereq_,module,exports){
(function (global){
'use strict';

(function(factory) {
  /* global global: false */
  factory(typeof window !== 'undefined' ? window : global);
}(function(root) {
  root = root || {};
  module.exports = root.jQuery ||
                   (root.angular ? root.angular.element : false) ||
                   root.Zepto;
}));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(_dereq_,module,exports){


module.exports = _dereq_('./camunda-form');

},{"./camunda-form":3}],9:[function(_dereq_,module,exports){
'use strict';

/**
 * @class
 * @classdesc the variable manager is responsible for managing access to variables.
 *
 * Variable Datatype
 *
 * A variable has the following properties:
 *
 *   name: the name of the variable
 *
 *   type: the type of the variable. The type is a "backend type" and may be either a java primitive:
 *
 *
 * Variable Lifecycle
 *
 *
 */
function VariableManager() {

  /** @member object containing the form fields. Initially empty. */
  this.variables = { };

}

VariableManager.prototype.createVariable = function(variable) {
  if(!this.variables[variable.name]) {
    this.variables[variable.name] = variable;
  } else {
    throw new Error('Cannot add variable with name '+variable.name+': already exists.');
  }
};

VariableManager.prototype.destroyVariable = function(variableName) {
  if(!!this.variables[variableName]) {
    delete this.variables[variableName];
  } else {
    throw new Error('Cannot remove variable with name '+variableName+': variable does not exist.');
  }
};

VariableManager.prototype.variable = function(variableName) {
  return this.variables[variableName];
};

VariableManager.prototype.variableValue = function(variableName, value) {

  var variable = this.variable(variableName);

  if(!!value) {
    variable.value = value;
  }

  return variable.value;
};

VariableManager.prototype.variableNames = function() {
  var varNames = [];
  for(var k in this.variables) varNames.push(k);
  return varNames;
};


module.exports = VariableManager;


},{}]},{},[8])
(8)
});
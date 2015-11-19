'use strict';

var listeners = [];

module.exports = {
  patchRequest: function(request) {

    // original method
    var end = request.Request.prototype.end;

    // override end function
    request.Request.prototype.end = function() {
      for(var i = 0; i < listeners.length; i++) {
        listeners[i](this, arguments);
      }
      end.apply(this, arguments);
    };

  },

  register: function(fn) {
    listeners.push(fn);
  },

  unregister: function(fn) {
    listeners.splice(listeners.indexOf(fn), 1);
  }
};

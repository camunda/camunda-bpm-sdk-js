'use strict';


/**
 * @exports CamSDK.utils
 */
var utils = module.exports = {};


// the 2 folowing functions were borrowed from async.js
// https://github.com/caolan/async/blob/master/lib/async.js

function _eachSeries(arr, iterator, callback) {
  callback = callback || function () {};
  if (!arr.length) {
    return callback();
  }
  var completed = 0;
  var iterate = function () {
    iterator(arr[completed], function (err) {
      if (err) {
        callback(err);
        callback = function () {};
      }
      else {
        completed += 1;
        if (completed >= arr.length) {
          callback();
        }
        else {
          iterate();
        }
      }
    });
  };
  iterate();
}

/**
 * Executes functions in serie
 *
 * @param  {(Object.<String, Function>|Array.<Function>)} tasks object or array of functions
 *                                                              taking a callback
 *
 * @param  {Function} callback                                  executed at the end, first argument
 *                                                              will be an error (if error occured),
 *                                                              the second depends on "tasks" type
 *
 * @example
 * CamSDK.utils.series({
 *   a: function(cb) { setTimeout(function() { cb(null, 1); }, 1); },
 *   b: function(cb) { setTimeout(function() { cb(new Error('Bang!')); }, 1); },
 *   c: function(cb) { setTimeout(function() { cb(null, 3); }, 1); }
 * }, function(err, result) {
 *   // err will be passed
 *   // result will be { a: 1, b: undefined }
 * });
 */
utils.series = function(tasks, callback) {
  callback = callback || function () {};

  var results = {};
  _eachSeries(Object.keys(tasks), function (k, callback) {
    tasks[k](function (err) {
      var args = Array.prototype.slice.call(arguments, 1);
      if (args.length <= 1) {
        args = args[0];
      }
      results[k] = args;
      callback(err);
    });
  }, function (err) {
    callback(err, results);
  });
};

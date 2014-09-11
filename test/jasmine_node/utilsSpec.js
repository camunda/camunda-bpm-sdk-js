'use strict';

describe('The SDK utilities', function() {
  var sdkUtils;

  it('does not blow when loading', function() {
    expect(function() {
      sdkUtils = require('./../../lib/utils');
    }).not.toThrow();
  });


  describe('control flow', function() {
    describe('series()', function() {
      it('is a function', function() {
        expect(typeof sdkUtils.series).toBe('function');
      });


      it('runs a array of functions', function(done) {
        sdkUtils.series([
          function(cb) { setTimeout(function() { cb(null, 1); }, 1); },
          function(cb) { setTimeout(function() { cb(null, 2); }, 1); },
          function(cb) { setTimeout(function() { cb(null, 3); }, 1); }
        ], function(err, result) {

          expect(err).not.toBeDefined();

          expect(result).toBeDefined();

          expect(result[0]).toBe(1);

          expect(result[1]).toBe(2);

          expect(result[2]).toBe(3);

          done();
        });
      });



      it('runs an object of functions', function(done) {
        sdkUtils.series({
          a: function(cb) { setTimeout(function() { cb(null, 1); }, 1); },
          b: function(cb) { setTimeout(function() { cb(null, 2); }, 1); },
          c: function(cb) { setTimeout(function() { cb(null, 3); }, 1); }
        }, function(err, result) {

          expect(err).not.toBeDefined();

          expect(result).toBeDefined();

          expect(result.a).toBe(1);

          expect(result.b).toBe(2);

          expect(result.c).toBe(3);

          done();
        });
      });



      it('stops the serie at the first error', function(done) {
        sdkUtils.series({
          a: function(cb) { setTimeout(function() { cb(null, 1); }, 1); },
          b: function(cb) { setTimeout(function() { cb(new Error('Bang!')); }, 1); },
          c: function(cb) { setTimeout(function() { cb(null, 3); }, 1); }
        }, function(err, result) {

          expect(err).toBeDefined();

          expect(result).toBeDefined();

          expect(result.a).toBe(1);

          expect(result.b).not.toBeDefined();

          done();
        });
      });
    });
  });
});

'use strict';

describe('The GenericResource', function() {
  var GenericResource, Extended1, Extended2, instance1, instance2;

  it('does not blow when loading', function() {
    expect(function() {
      GenericResource = require('./../../lib/generic-resource');
    }).not.toThrow();
  });


  it('can be extend', function() {
    expect(function() {
      Extended1 = GenericResource.extend({
        instanceMethod: function(){},
        instanceProperty: true
      }, {
        staticMethod: function() {},
        staticProperty: true
      });

      Extended2 = GenericResource.extend({
        otherInstanceMethod: function(){},
        otherInstanceProperty: true
      }, {
        otherStaticMethod: function() {},
        otherStaticProperty: true
      });
    }).not.toThrow();
  });


  describe('generated resource class', function() {
    it('has a `static` properties', function() {
      expect(typeof Extended1.staticMethod).toBe('function');
      expect(typeof Extended1.staticProperty).toBe('boolean');
      expect(typeof Extended1.path).toBeDefined();

      expect(typeof Extended2.staticMethod).toBe('undefined');
      expect(typeof Extended2.staticProperty).toBe('undefined');
      expect(typeof Extended2.path).toBeDefined();

      expect(typeof Extended2.otherStaticMethod).toBe('function');
      expect(typeof Extended2.otherStaticProperty).toBe('boolean');
    });


    it('instanciates', function() {
      expect(function() {
        instance1 = new Extended1();

        instance2 = new Extended2();
      }).not.toThrow();
    });


    it('has a `instance` properties', function() {
      expect(typeof instance1.instanceMethod).toBe('function');
      expect(typeof instance1.instanceProperty).toBe('boolean');

      expect(typeof instance2.instanceMethod).toBe('undefined');
      expect(typeof instance2.instanceProperty).toBe('undefined');

      expect(typeof instance2.otherInstanceMethod).toBe('function');
      expect(typeof instance2.otherInstanceProperty).toBe('boolean');
    });
  });
});

'use strict';

xdescribe('The node.js usage', function() {
  var CamundaClient;

  it('does not blow when loading', function() {
    expect(function() {
      CamundaClient = require('camunda-bpm-sdk-js');
    }).not.toThrow(function(err) {
      console.info('throwed error', err);
    });
  });


  it('has to be configured', function() {
    expect(function() {
      new CamundaClient();
    }).toThrow(function(err) {
      console.info('throwed error', err);
    });
  });


  describe('configuration', function() {
    it('needs a appUri property', function() {
      expect(function() {
        new CamundaClient({});
      }).toThrow(function(err) {
        console.info('throwed error', err);
      });
    });



  });
});

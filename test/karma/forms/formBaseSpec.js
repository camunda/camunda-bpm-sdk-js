describe('The form', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false, CamFormSDK: false */
  'use strict';
  var $simpleFormDoc;
  var camForm, camNet, procDef;


  it('prepares the testing environemnt', function() {
    runs(function() {
      jQuery.ajax('/base/test/karma/forms/form-simple.html', {
        success: function(data) {
          $simpleFormDoc = jQuery('<div>'+ data +'</div>');
        },
        error: function() {
          console.info('errorThrown', arguments);
        }
      });
    });

    waitsFor(function() {
      return !!$simpleFormDoc;
    }, 400);

    runs(function() {
      expect(typeof CamSDKMocks).toBe('function');

      expect(typeof CamSDK).toBe('function');
    });
  });


  it('needs a process definition', function() {
    runs(function() {
      camNet = new CamSDK({
        apiUri: 'engine-rest/engine',
        HttpClient: CamSDKMocks
      });

      camNet.resource('process-definition').list({}, function(err, result) {
        if (err) {
          throw err;
        }

        procDef = result.items.pop();
      });
    });

    waitsFor(function() {
      return !!procDef;
    }, 4000);

    runs(function() {
      expect(procDef.id).toBeTruthy();
    });
  });


  it('exists globally', function() {
    expect(typeof CamFormSDK).toBe('function');
  });


  it('has a DOM library', function() {
    expect(CamFormSDK.$).toBeTruthy();
  });


  it('initialize', function() {
    var initialized;
    runs(function() {
      expect(typeof CamFormSDK).toBe('function');

      expect(camNet).toBeTruthy();

      expect(function() {
        camForm = new CamFormSDK({
          service: camNet,
          processDefinitionId: procDef.id,
          formElement: $simpleFormDoc.find('form[cam-form]'),
          initialized: function() {
            initialized = true;
          }
        });
      }).not.toThrow();

      expect(camForm.formFieldHandlers instanceof Array).toBe(true);

      expect(camForm.fields instanceof Array).toBe(true);
    });

    waitsFor('form to be initialized', function() {
      return initialized;
    }, 2000);

    runs(function() {
      var $el = $simpleFormDoc.find('input[type=text]');

      expect($el.length).toBe(1);

      expect($el.val())
        .toBeTruthy();
    });
  });


  it('submits the form', function() {
    var initialized, submitted, submissionError, submissionResponse;
    runs(function() {
      expect(function() {
        camForm = new CamFormSDK({
          service: camNet,
          processDefinitionId: procDef.id,
          formElement: $simpleFormDoc.find('form[cam-form]'),
          initialized: function() {
            initialized = true;
          }
        });
      }).not.toThrow();

    });

    waitsFor(function() {
      return initialized;
    }, 2000);

    runs(function() {
      var $el = $simpleFormDoc.find('input[type=text]');

      expect($el.length).toBe(1);

      $el.val('updated');

      camForm.submit(function(err, result) {
        submitted = true;
        submissionError = err;
        submissionResponse = result;
      });
    });

    waitsFor(function() {
      return submitted;
    }, 2000);

    runs(function() {
      expect(submissionError).toBeFalsy();

      expect(submissionResponse.links).toBeTruthy();

      expect(submissionResponse.definitionId).toBe(procDef.id);

      var stored = CamSDKMocks.mockedData.processInstanceFormVariables[submissionResponse.id];
      expect(stored).toBeTruthy();

      expect(stored.stringVar).toBeTruthy();

      expect(stored.stringVar.type).toBe('string');

      expect(stored.stringVar.value).toBe('updated');
    });
  });
});

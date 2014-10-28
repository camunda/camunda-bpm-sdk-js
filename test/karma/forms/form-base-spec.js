describe('The form', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false, CamFormSDK: false */
  'use strict';
  var $simpleFormDoc;
  var camForm, camClient, procDef;


  it('prepares the testing environemnt', function() {
    runs(function() {
      jQuery.ajax('/base/test/karma/forms/form-simple.html', {
        success: function(data) {
          $simpleFormDoc = jQuery('<div id="test-form">'+ data +'</div>');
          // the following lines allow to see the form in the browser
          var _$top = $(top.document);
          _$top.find('#test-form').remove();
          _$top.find('#browsers').after($simpleFormDoc);
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

      expect(typeof CamSDK).toBe('object');
    });
  });


  it('needs a process definition', function() {
    runs(function() {
      camClient = new CamSDK.Client({
        apiUri: 'engine-rest/engine',
        HttpClient: CamSDKMocks
      });

      camClient.resource('process-definition').list({}, function(err, result) {
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
    expect(typeof CamSDK.Form).toBe('function');
  });


  it('has a DOM library', function() {
    expect(CamSDK.Form.$).toBeTruthy();
  });


  it('initialize', function() {
    var initialized;
    runs(function() {

      expect(camClient).toBeTruthy();

      expect(function() {
        camForm = new CamSDK.Form({
          client: camClient,
          processDefinitionId: procDef.id,
          formElement: $simpleFormDoc.find('form[cam-form]'),
          done: function(err, result) {
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
      var $el = $simpleFormDoc.find('input[type="text"]');

      expect($el.length).toBe(1);

      expect($el.val())
        .toBeTruthy();
    });
  });


  it('submits the form', function() {
    var initialized, submitted, submissionError, submissionResponse;
    runs(function() {
      expect(function() {
        camForm = new CamSDK.Form({
          client: camClient,
          processDefinitionId: procDef.id,
          formElement: $simpleFormDoc.find('form[cam-form]'),
          done: function(err, result) {
            initialized = true;
          }
        });
      }).not.toThrow();

    });

    waitsFor(function() {
      return initialized;
    }, 2000);

    runs(function() {
      var $el = $simpleFormDoc.find('input[type="text"]');

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

      expect(stored.stringVar.type).toBe('String');

      expect(stored.stringVar.value).toBe('updated');
    });
  });


  describe('choices field', function() {
    var initialized;
    it('prepares the tests', function() {
      runs(function() {
        initialized = !!camForm;
        camForm = camForm || new CamSDK.Form({
          client: camClient,
          processDefinitionId: procDef.id,
          formElement: $simpleFormDoc.find('form[cam-form]'),
          done: function(err, result) {
            initialized = true;
          }
        });
      });

      waitsFor('form to be initialized', function() {
        return initialized && !!$simpleFormDoc;
      }, 2000);
    });


    describe('single choice', function() {
      // var $radios;
      var $select;
      beforeEach(function() {
        // $radios = $simpleFormDoc.find('input[type="radio"]');
        $select = $simpleFormDoc.find('select[cam-variable-name]:not([multiple])');
      });


      // xit('can be `input[type="radio"]`', function() {});


      it('can be `select`', function() {
        expect($select.length).toBe(1);

        expect(camForm.formFieldHandlers instanceof Array).toBe(true);

        expect(camForm.fields instanceof Array).toBe(true);
      });
    });


    describe('multiple choices', function() {
      // var $checkboxes;
      var $select;
      beforeEach(function() {
        // $checkboxes = $simpleFormDoc.find('input[type="checkbox"]');
        $select = $simpleFormDoc.find('select[cam-variable-name][multiple]');
      });


      // xit('can be `input[type="checkbox"]`', function() {});


      it('can be `select[multiple]`', function() {
        expect($select.length).toBe(1);

        expect(camForm.formFieldHandlers instanceof Array).toBe(true);

        expect(camForm.fields instanceof Array).toBe(true);

        camForm.fields.forEach(function(field) {
          console.info('camForm.fields', field.getValue());
        });
      });
    });
  });
});

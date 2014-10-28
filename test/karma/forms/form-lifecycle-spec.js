describe('The form', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false, CamFormSDK: false */
  'use strict';
  var $simpleFormDoc;
  var camForm, camClient, procDef;


  it('prepares the testing environemnt', function() {
    runs(function() {
      jQuery.ajax('/base/test/karma/forms/form-lifecycle.html', {
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

  it('initialize', function() {
    var initialized;
    runs(function() {

      expect(camClient).toBeTruthy();

      expect(function() {
        camForm = new CamSDK.Form({
          client: camClient,
          processDefinitionId: procDef.id,
          formElement: $simpleFormDoc.find('form[cam-form]'),
          done: function() {
            initialized = true;
          }
        });
      }).not.toThrow();

    });

    waitsFor('form to be initialized', function() {
      return initialized;
    }, 2000);

    runs(function() {
      // expect variable created by script to be present
      expect(camForm.variableManager.variable('customVar').name).toBe('customVar');
      expect(camForm.variableManager.variable('customVar').type).toBe('String');

      // expect form field to be populated
      expect($('#customField', camForm.formElement).val()).toBe('someValue');
    });

    runs(function() {
      // given that we do not change the value of the custom field
      camForm.submit();

      // we expect the submit callback to prevent the submit of the form
      expect(camForm.submitPrevented).toBeTruthy();

      // if we change the value of the form field
      $('#customField', camForm.formElement).val('updated');

      // and re-attempt submit
      camForm.submit();

      // we expect the submit to pass
      expect(camForm.submitPrevented).toBeFalsy();

    });

  });


  it('submits the form', function() {

  });
});

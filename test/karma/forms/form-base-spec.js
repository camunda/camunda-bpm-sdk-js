describe('The form', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false */
  'use strict';
  var $ = jQuery;
  var $simpleFormDoc;
  var camForm, camClient, procDef;


  before(function(done) {
    jQuery.ajax('/base/test/karma/forms/form-simple.html', {
      success: function(data) {
        $simpleFormDoc = jQuery('<div id="test-form">'+ data +'</div>');
        // the following lines allow to see the form in the browser
        var _$top = $(top.document);
        _$top.find('#test-form').remove();
        _$top.find('#browsers').after($simpleFormDoc);

        camClient = new CamSDK.Client({
          apiUri: 'engine-rest/engine',
          HttpClient: CamSDKMocks
        });

        done();
      },

      error: done
    });
  });


  it('needs a process definition', function(done) {
    camClient.resource('process-definition').list({}, function(err, result) {
      if (err) { return done(err); }

      procDef = result.items.pop();

      expect(procDef.id).to.be.ok;

      done();
    });
  });

  it('gets the process definition with a promise', function() {
    return camClient.resource('process-definition').list({}).then(
      function(result) {
        procDef = result.items.pop();
        expect(procDef.id).to.be.ok;
      }
    );
  });


  it('exists globally', function() {
    expect(CamSDK.Form).to.be.a('function');
  });


  it('has a DOM library', function() {
    expect(CamSDK.Form.$).to.be.ok;
  });


  it('initialize', function(done) {
    expect(camClient).to.be.ok;

    function prepare() {
      camForm = new CamSDK.Form({
        client:               camClient,
        processDefinitionId:  procDef.id,
        formElement:          $simpleFormDoc.find('form[cam-form]'),
        done:                 initialized
      });
    }

    function initialized() {
      expect(camForm.formFieldHandlers).to.be.an('array');

      expect(camForm.fields).to.be.an('array');

      var $el = $simpleFormDoc.find('input[type="text"]');

      expect($el.length).to.eql(1);

      expect($el.val()).to.be.ok;

      done();
    }

    expect(prepare).not.to.throw();
  });


  it('submits the form', function(done) {

    function formSubmitted(err, result) {
      if (err) { return done(err); }

      expect(result.links).to.be.ok;

      expect(result.definitionId).to.eql(procDef.id);

      var stored = CamSDKMocks.mockedData.processInstanceFormVariables[result.id];
      expect(stored).to.be.ok;

      expect(stored.stringVar).to.be.ok;

      expect(stored.stringVar.type).to.eql('String');

      expect(stored.stringVar.value).to.eql('updated');

      done();
    }

    function formReady(err) {
      if (err) { return done(err); }

      var $el = $simpleFormDoc.find('input[type="text"]');

      expect($el.length).to.eql(1);

      $el.val('updated');

      camForm.submit(formSubmitted);
    }


    camForm = new CamSDK.Form({
      client:               camClient,
      processDefinitionId:  procDef.id,
      formElement:          $simpleFormDoc.find('form[cam-form]'),
      done:                 formReady
    });
  });


  describe('choices field', function() {
    before(function(done) {
      camForm = new CamSDK.Form({
        client:               camClient,
        processDefinitionId:  procDef.id,
        formElement:          $simpleFormDoc.find('form[cam-form]'),
        done:                 done
      });
    });

    describe('single choice', function() {
      var $select;
      beforeEach(function() {
        $select = $simpleFormDoc.find('select[cam-variable-name]:not([multiple])');
      });


      it('can be `select`', function() {
        expect($select.length).to.eql(1);

        expect(camForm.formFieldHandlers).to.be.an('array');

        expect(camForm.fields).to.be.an('array');
      });
    });


    describe('multiple choices', function() {
      var $select;
      before(function() {
        $select = $simpleFormDoc.find('select[cam-variable-name][multiple]');
      });


      it('can be `select[multiple]`', function() {
        expect($select.length).to.eql(1);

        expect(camForm.formFieldHandlers).to.be.an('array');

        expect(camForm.fields).to.be.an('array');
      });
    });
  });
});

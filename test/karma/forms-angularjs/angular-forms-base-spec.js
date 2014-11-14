describe('The input field', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false, CamFormSDK: false */
  'use strict';

  var $simpleFormDoc;
  var camForm, camClient, procDef;

  it('prepares the testing environemnt', function() {
    runs(function() {
      jQuery.ajax('/base/test/karma/forms-angularjs/angular-form.html', {
        success: function(data) {
          $simpleFormDoc = jQuery('<div id="test-form" ng-controller="AppController">'+ data +'</div>');
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


  it('should provide CamSDKFormsAngular', function() {
    expect(CamSDK.Form).toBeDefined();
  });

  /**
   * ensures that angular integration works for a form
   * which is pre-rendered
   */
  it('should use pre-rendered form', function() {
    var initialized;
    var scope;
    angular.module('testApp', [])
     .controller('AppController', ['$scope', function ($scope) {
       camForm = new CamSDK.Form({
         client: camClient,
         processDefinitionId: procDef.id,
         formElement: $simpleFormDoc.find('form[cam-form]'),
         done: function() {
           initialized = true;
         }
       });
       scope = $scope;

      }]);

    runs(function() {
      angular.bootstrap($simpleFormDoc, ['testApp', 'cam.embedded.forms']);
    });

    waitsFor('form to be initialized', function() {
      return initialized;
    }, 2000);

    runs(function() {
      expect(scope).toBeDefined();

      // change the value in the scope
      scope.$apply(function() {
        scope.modelProperty= "updated";
      });

    });

    waitsFor('value to be updated', function() {
      // if we retrieve the variables from the form
      camForm.retrieveVariables();
      // the variable updated using angular is updated in the variable manager
      return 'updated' === camForm.variableManager.variable('stringVar').value;
    }, 2000);

    runs(function() {
      camForm.variableManager.variable('stringVar').value = 'secondUpdate';
      camForm.applyVariables();
    });

    waitsFor('value changed in angular model', function() {
      return scope.modelProperty === "secondUpdate";
    }, 2000);

  });

  /**
   * ensures that angular integration works if form is rendered
   * after the angular application has been bootstrapped.
   */
  it('should render form', function() {
    // initialize a new angular app (off screen):

    var appElement = $('<div ng-controller="AppController" />');
    var scope,
        initialized;

    angular.module('testApp', [])
      .controller('AppController', ['$scope', function ($scope) {
       camForm = new CamSDK.Form({
         client: camClient,
         processDefinitionId: procDef.id,
         containerElement: appElement,
         formUrl: '/base/test/karma/forms-angularjs/angular-form.html',
         done: function() {
           initialized = true;
         }
       });
       scope = $scope;

      }]);

    runs(function() {
      angular.bootstrap(appElement, ['testApp', 'cam.embedded.forms']);
    });

    waitsFor('form to be initialized', function() {
      return initialized;
    }, 2000);

    runs(function() {
      expect(scope).toBeDefined();

      // change the value in the scope
      scope.$apply(function() {
        scope.modelProperty= "updated";
      });

    });

    waitsFor('value to be updated', function() {
      // if we retrieve the variables from the form
      camForm.retrieveVariables();
      // the variable updated using angular is updated in the variable manager
      return 'updated' === camForm.variableManager.variable('stringVar').value;
    }, 2000);

    runs(function() {
      camForm.variableManager.variable('stringVar').value = 'secondUpdate';
      camForm.variableManager.variable('autoBindVar').value = 'autoBindValue';
      camForm.applyVariables();
    });

    waitsFor('value changed in angular model', function() {
      return scope.modelProperty === "secondUpdate";
    }, 2000);

    waitsFor('auto bind value changed in angular model', function() {
      return scope.autoBindVar === "autoBindValue";
    }, 2000);
  });

  it('should set form invalid', function() {
    // initialize a new angular app (off screen):

    var appElement = $('<div ng-controller="AppController" />');
    var scope,
        initialized;

    angular.module('testApp', [])
      .controller('AppController', ['$scope', function ($scope) {
       camForm = new CamSDK.Form({
         client: camClient,
         processDefinitionId: procDef.id,
         containerElement: appElement,
         formUrl: '/base/test/karma/forms-angularjs/angular-form.html',
         done: function() {
           initialized = true;
         }
       });
       scope = $scope;

      }]);

    runs(function() {
      angular.bootstrap(appElement, ['testApp', 'cam.embedded.forms']);
    });

    waitsFor('form to be initialized', function() {
      return initialized;
    }, 2000);

    runs(function() {
      expect(scope).toBeDefined();

      // change the value in the scope
      scope.$apply(function() {
        scope.integerProperty= 'abc';
      });

    });

    waitsFor('form to be invalid', function() {
      var $el = appElement.find('input[name="integerVar"]');
      return $el.hasClass('ng-invalid')
          && $el.hasClass('ng-invalid-cam-variable-type')
          && scope.form
          && scope.form.$invalid
          && scope.form.$error
          && scope.form.$error.camVariableType;
    }, 2000);


  });

});

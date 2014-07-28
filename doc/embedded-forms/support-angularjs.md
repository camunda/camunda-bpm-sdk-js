# Support for AngularJS in Embedded fORMS

Embedded forms provide optional support for integrating with AngularJS. The angular JS integration
provides support for

* Angular compilation of Forms loaded from URLs,
* `ng-model` binding

## Setting up Support for Embedded Forms

### Script Dependencies

When using camunda BPM embedded forms inside an AngularJS application,
`camunda-bpm-sdk-angular.js` must be loaded:

```html
<script src="angular.min.js"></script>
<script src="camunda-bpm-sdk.js"></script>
<script src="camunda-bpm-sdk-angular.js"></script>
```

### Bootstrapping

The embedded forms support provides an angular module named `cam.embedded.forms` which can be added 
to the application's module dependencies:

```javascript
angular.bootstrap(window.document, ['cam.embedded.forms', ...]);
```

## Directive based Usage

TODO.

## Api Usage

In case the built-in `cam-form` directive does not provide enough flexibility, an embedded form can
be bootstrapped programatically. Once you loaded the `camunda-bpm-sdk-angular.js` file, the Api is
available through `CamSDK.AngularForm`:

```javascript
var camForm = new CamSDK.AngularForm({
  ...
});
```
This can be directly used from an angular controller or - preferably - from a custom directive.

### Dynamically Loading the Form from an URL

Forms can be loaded from an URL. This is useful for developing applications which dynamically load
forms from an external source depending on the process definition.

#### Providing the URL to the Form

Forms can be loaded from an URI by setting the `formUrl` property when initializing the form:

```javascript
new CamSDK.AngularForm({
    formUrl: "/url/to/my/form",
    ...
});
```

#### Angular Directives & Compilation

If the form is loaded from an URL, the SDK makes sure that it is properly compiled and linked to
the current angular scope. This allows using angular directives in embedded forms loaded 
dynamically at runtime:

```html
<form cam-form role="form" name="form">

  <input type="text"
    cam-variable-name="CUSTOMER_ID"
    ng-model="customerId">

  <p ng-show="customerId">Your input: <em>{{customerId}}</em></p>

</form>
```

#### Usage example:

Create a container element for the form:

```html
<div id="formContainer" ng-controller="FormController"></div>
```

In an AngularJS Controller, set the `formUrl` property of the `CamSDK.AngularForm` object:

```javascript
angular.module('formExample', [])
  .controller('FormController', ['$scope', function($scope) {

  var camApiClient = new CamSDK.Client({
    apiUri: 'http://localhost:8080/engine-rest/engine'
  });

  $scope.camForm = new CamSDK.AngularForm({
    client: camApiClient,
    formUrl: "/url/to/my/form",
    processDefinitionKey: 'createCustomerAccount',
    containerElement: $('#formContainer')
  });

}]);
```
### Using a Form already existing in the DOM

In case the form should not be loaded from an external URL or in case you want to load and integrate
the form yourself, it is possible to initialize a form already existing in the DOM of the page.

### Providing the formElement

In order to initialize an embedded form for a `<form>` element already existing in the DOM, you need
to set the `formElement` property when initializing the form:

```javascript
new CamSDK.AngularForm({
  formElement: $('#startForm'),
  ...
});

```

### Usage Eample

You can initialize CamundaForm for a `<fom>` already existing in the DOM:

```html
<div ng-controller="FormController">
  <form id="startForm" name="form" ng-submit="camForm.submit()">

    <input type="text" name="customerId"
      cam-variable-name="CUSTOMER-ID"
      min-length="3" max-length="10" required>

    <input type="text" name="emailAddress"
      cam-variable-name="CUSTOMER-EMAIL"
      ng-model="emailInput"
      required email>

    <span ng-show="form.emailAddress.$error.email"><em>{{emailInput}}</em> is not a valid email address.</span>
    <span ng-show="form.emailAddress.$error.required">Email Address is required.</span>

    <button type="submit" ng-disabled="form.$invalid">Start Process</button>
  </form>
</div>
```
The following initializes an embedded start form from an AngularJS Controller:

```javascript
angular.module('formExample', [])
  .controller('FormController', ['$scope', function($scope) {

  var camApiClient = new CamSDK.Client({
    apiUri: 'http://localhost:8080/engine-rest/engine'
  });

  $scope.camForm = new CamSDK.AngularForm({
    client: camApiClient,
    processDefinitionKey: 'createCustomerAccount',
    formElement: $('#startForm')
  });

}]);
```




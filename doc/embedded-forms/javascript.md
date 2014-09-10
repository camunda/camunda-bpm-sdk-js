# Custom Javascript

It is possible to use custom javascript in embedded forms.

## The cam-script Directive

Custom javascript can be added to a from by using a `<script>` tag and adding the `cam-script`
directive:

```html
<form cam-form role="form">

  <script cam-script type="text/form-script">
  // custom script goes here
  </script>

</form>
```

## Available Api

Inside a form script, the following built-in variables and functions are available:

### camForm

The `camForm` variable is an instance of the `CamSDK.Form` class and is the primary access point to
the form api and allows defining event handers for participating in the form [lifecycle][lifecycle]:

```html
<form cam-form role="form">
  ...
  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;

    camForm.on('variables-fetched', function() {
      // access to all process variables after the form has loaded
      console.log(variableManager.variables);
    });
  </script>

</form>
```

### $scope
> Only available with AngularJS integration.

Provides access to the current AngularJS scope:

```html
<form cam-form role="form">

  <input type="text"
         cam-variable-name="CUSTOMER_ID"
         cam-variable-type="String"
         ng-model="customerId" />

  <script cam-script type="text/form-script">
    camForm.on('variables-applied', function() {
      // the input field is bound to $scope.customerId
      $scope.customerId = "some-id";
    });
  </script>

</form>
```

### inject()
> Only available with AngularJS integration.

```html
<form cam-form role="form">

  <script cam-script type="text/form-script">
    inject([ '$scope', '$http', function($scope, $http) {
      camForm.on('form-loaded', function() {
        // use injected $http service for making requests
      });
    }]);
  </script>

</form>

```

## Participating in the Form Lifecycle

It is possible to participate in the lifecycle of the form. See [Form Lifecycle and
Events][lifecycle] for more details.

### Fetching additional Variables

When loading the form, the values of all variables used in the form will be fetched from the
backed. This means that the form sdk will only fetch those variables which are actually used in the
form. The most convenient way for using a variable is the `cam-variable-name` directive. However
there are some situations where directive-based usage is inconvenient. In such situations it is
useful to declare additional variables programmatically:

```html
<form cam-form role="form">

  <div id="my-container"></div>

  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;

    camForm.on('form-loaded', function() {
      // this callback is executed *before* the variables is loaded from the server.
      // if we declare a variable here, it's value will be fetched as well
      variableManager.createVariable({ name: 'customVariable' });
    });

    camForm.on('variables-fetched', function() {
      // this callback is executed *after* the variables have been fetched from the server
      var variableValue = variableManager.variableValue('customVariable');
      $( '#my-container', camForm.formElement).textContent(variableValue);
    });
  </script>

</form>
```

### Submitting additional Variables

Similar to fetching additional variables using a script, it is also possible to add additional
variables to the submit:


```html
<form cam-form role="form">

  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;

    camForm.on('submit', function() {
      // this callback is executed when the form is submitted, *before* the submit request to
      // the server is executed

      // creating a new variable will add it to the form submit
      variableManager.createVariable({
        name: 'customVariable',
        type: 'String',
        value: 'Some Value...',
        isDirty: true
      });

    });
  </script>

</form>
```

### Implementing Custom Fields

The following is a small usage example which combines some of the features explained so far.
It uses custom javascript for implementing a custom interaction with a form field which does not 
use any `cam-variable-*` directives.

It shows how custom scripting can be used for

* declaring a variable to be fetched from the backend,
* writing the variable's value to a form field,
* reading the value upon submit.

```html
<form cam-form role="form">

  <!-- custom control which does not use cam-variable* directives -->
  <input type="text"
         class="form-control"
         id="customField">

  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;
    var customField = $('#customField', camForm.formElement);

    camForm.on('form-loaded', function() {
      // declare a new variable so that it's value is fetched from the backend
      variableManager.createVariable({ name: 'customVariable' });
    });

    camForm.on('variables-fetched', function() {
      // value has been fetched from the backend
      var value = variableManager.variableValue('customVariable');
      // write the variable value to the form field
      customField.val(value);
    });

    camForm.on('submit', function(evt) {
      var fieldValue = customField.val();
      var backendValue = variableManager.variableValue('customVariable');

      if(fieldValue === backendValue) {
        // prevent submit if value of form field was not changed
        evt.submitPrevented = true;

      } else {
        // set value in variable manager so that it can be sent to backend
        variableManager.variableValue('customVariable', fieldValue);
      }
    });
  </script>

</form>
```

## Debugging Scripts

If a form script is loaded using an XHR from a web server, it is executed using `eval()`. In order
to debug it, you need to use browser-specific debugger extensions.

### Debugging Form Scripts in Google Chrome

If you are using the Google Chrome debugger, you can add the `debugger;` directive to the source
code of the script:

```html
<form cam-form role="form">

  <script cam-script type="text/form-script">
    debugger;
  </script>

</form>
```

[lifecycle]: lifecycle.md

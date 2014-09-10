# Form Lifecycle and Events

A form instance has the following lifecycle in which it is possible to participate using an 
event-oriented API.

## Lifecycle and Events

1. The form is parsed, and variable names are collected from the markup. This means that directives
   like `cam-variable-name` are evaluated and the resulting variables are declared in the
   `variableManager`.

   _Events:_
   * `form-loaded` is fired __after__ the form has been parsed, and all form directives have been
     evaluated.

2. In the second phase, a request is made to the server in order to gather the values of the 
   variables declared in the variable manager.

   _Events:_
   * `variables-fetched` is fired __after__ the request returns and the values of the variables has
     been merged into the variableManager.

3. Next, the variables are applied to the form controls. This means that html input fields and
   select boxes are populated with the variable values present in the variableManager.

   _Events:_
   * `variables-applied` is fired __after__ the values of the variables have been applied to the
     form controls.

4. The user interacts the form. In this phase no events are being fired.

5. Finally, the form is submitted.

   _Events:_

   * `submit` is fired _before_  the submit request is sent to the server. An event handler may
     prevent the form from being submitted by setting the property `submitPrevented` true.

   * `submit-success` is fired __after__ the server successfuly treated the submission

   * `submit-failed` is fired __after__ the server failed at treating the submission
     or when a network error happend

## Registering event listeners

Event listeners can be registered from [custom javascript][javascript]:

```html
<form cam-form role="form" name="form">

  <script cam-script type="text/form-script">

    camForm.on('form-loaded', function() {
      // handle form loaded
    });

    camForm.on('variables-fetched', function() {
      // handle variables fetched
    });

    camForm.on('variables-applied', function() {
      // handle variables applied
    });

    camForm.on('submit', function(evt) {
      // handle submit
      // may prevent the submit from being executed:
      evt.submitPrevented = true;
    });

    camForm.on('submit-success', function() {
      // handle submit-success
    });

    camForm.on('submit-error', function(evt, res) {
      // handle submit-error:
      var error = res[0];
    });

  </script>

</form>
```

[javascript]: javascript.md


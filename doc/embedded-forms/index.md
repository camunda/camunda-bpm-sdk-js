# Using Embedded Forms

* [Supported Html Controls][controls]

## The form

To add an embedded Task Form to your application:

1. Create an HTML file and attach it to a [User Task][user-task]
   or a [Start Event][start-event] in your process model.
2. Add a folder `src/main/webapp/forms` to your project folder
3. Create a `FORM_NAME.html` file containing the relevant content for your form

### Defining your form

The only required attribute is `cam-form`.

```html
<form cam-form>
  <!-- ... -->
</form>
```

### Scripting

It is possible to add custom logics to a form by using a script tag as described below.

#### Single form

If there's only 1 form in the document the location of the script tag is not relevant,

```html
<form cam-form>
  <!-- ... -->
</form>

<script cam-script>
</script>
```



#### Multiple form

If they are more than 1 form in the document the location of the script tag can be:

* inside the `form` tag
* outside the `form` tag with a attribute `name` who has the same value as the `form`
```html
<form cam-form>
  <!-- ... -->
  <script cam-script>
    /* ... */
  </script>
</form>

<form cam-form>
  <!-- ... -->
  <script cam-script>
    /* ... */
  </script>
</form>
```

```html
<form cam-form name="form-1"><!-- ... --></form>
<form cam-form name="form-2"><!-- ... --></form>

<script cam-script name="form-1">/* ... */</script>
<script cam-script name="form-2">/* ... */</script>
```

### Fields

```html
<input cam-variable-name="foo" />
```


```html
<select cam-variable-name="foo"
        cam-choices="fooChoices">
  <option value="bar">Bar</options>
</select>
```



## Mechanisms

### Lifecycle

1. The form get parsed, variable names collected.
   _Events:_
   * `init` is fired __before__ the form is being parsed

2. From the variable names, a request to the server is made to gather information about those
   variables (using the [web services toolkit][webservices]).
   _Events:_
   * `info-fetch` is fired __before__ the request is being made
   * `info-fetched` is fired __after__ the server responded

3. With the information given by the server, the form fields are "enhanced".
   _Events:_
   * `apply` is fired __before__ the processing of variables and inputs happend
   * `applied` is fired __after__ the processing of variables and inputs has been done
   
4. The user interacts the form.
   _Events:_
   * `submit` is fired __after__ the user clicked on the submit button and can be used to alterate
     the form values (state) before validation
   * `validate` is fired __before__ the information are being sent to the server and can prevent
     the request to be performed

5. The form is submitted to the server.
   _Events:_
   * `submited` is __always__ fired after the server response is received
   * `submit-success` is fired __after__ the server successfuly treated the submission
   * `submit-error` is fired __after__ the server failed at treating the submission
     or when a network error happend

### HTML binding / State

__TODO:__ write something clever about what we mean by "HTML binding" or state

[start-event]: //stage.docs.camunda.org/api-references/bpmn20/#events-start-events
[user-task]:   //stage.docs.camunda.org/api-references/bpmn20/#tasks-user-task
[webservices]: webservices
[controls]:    controls/index.md
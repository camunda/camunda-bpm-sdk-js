# Form Lifecycle and Callbacks

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


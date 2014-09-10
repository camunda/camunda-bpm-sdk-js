# camunda BPM JavaScript Forms SDK

## Overview

The Forms SDK greatly simplifies the implementation of task forms.

The main feature of the Forms SDK is handling of *process variables*. You can directly bind Html
form controls to process variables:

```html
<form>

  <input type="text" 
         cam-variable-name="CUSTOMER_ID"
         cam-variable-type="String">

  <input type="text" 
         cam-variable-name="CUSTOMER_REVENUE" 
         cam-variable-type="Float">

</form>
```

The Forms SDK handles the fetching of the variable values from the process engine, type conversions
and so on.

The Forms SDK optionally integrates with AngularJS to take advantage of AngularJS form
validation and other AngularJS goodies.

## The Form SDK in camunda Tasklist

camunda Tasklist uses the Form SDK for providing support for *Embedded Forms*. By default, the
tasklist uses the Form SDKs [AngularJS integration][angularjs].

## Documentation

**Basic Topics**

* [Getting started using the Forms SDK][getting-started]
* [Angular JS Integration][angularjs]
* [Reference of supported Html Controls][controls]

**Advanced Topics**

* [Custom JavaScript][javascript]
* [The Form Lifecycle and Events][lifecycle]
* Working with complex Variable Types




[start-event]: //stage.docs.camunda.org/api-references/bpmn20/#events-start-events
[user-task]:   //stage.docs.camunda.org/api-references/bpmn20/#tasks-user-task
[webservices]: webservices
[controls]:    controls/index.md
[angularjs]: support-angularjs.md
[getting-started]: getting-started.md
[lifecycle]: lifecycle.md
[javascript]: javascript.md

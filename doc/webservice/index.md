# API SDK

## Usage

### In browsers

```HTML

<script type="text/javascript" src="dist/camunda-bpm-sdk.js"></script>
<script type="text/javascript">
  var CamundaClient = require('camunda-bpm-sdk-js');

  cam = new CamundaClient({
    // HttpClient: require('./../../lib/http-client-mock'),
    apiUri: 'http://localhost:8080/engine-rest/'
  });
  
  
  cam.on('forbidden', function() {
    // ... notify the user he/she is not authenticated
  });
  
  
  cam.on('unauthorized', function() {
    // ... notify the user he/she does not have enough rights
  });
  
  
  var ProcessDefinition = cam.resource('process-definition');

  ProcessDefinition.on('loaded', function(result) {
    var total = results.count;
    var processDefinitionInstances = results.items;
    // ... do something when the process definitions are loaded
  });

  ProcessDefinition.list(function(err, result) {
    if (err) {
      throw err;
    }
    var total = results.count;
    var processDefinitionInstances = results.items;
    // ... other way to do something when the process definitions are loaded
  });

  ProcessDefinition.list({
    nameLike: '%Call%'
  }, function(err, result) {
    if (err) {
      throw err;
    }
    var total = results.count;
    var processDefinitionInstances = results.items;
    // ... other way to do something when the process definitions are loaded
  });

  var processDefinition = ProcessDefinition();
</script>
```

### With node.js

```js
var cam = require('camunda-bpm-sdk-js');
// TODO
```
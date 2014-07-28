# camunda BPM API Client

## Usage

### In browsers

```HTML

<script type="text/javascript" src="dist/camunda-bpm-sdk.js"></script>
<script type="text/javascript">

  camClient = new CamSDK.Client({
    // HttpClient: require('./../../lib/http-client-mock'),
    apiUri: 'http://localhost:8080/engine-rest/'
  });


  camClient.on('forbidden', function() {
    // ... notify the user he/she is not authenticated
  });


  camClient.on('unauthorized', function() {
    // ... notify the user he/she does not have enough rights
  });


  var ProcessDefinition = camClient.resource('process-definition');

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
var CamSDK = require('camunda-bpm-sdk-js');

var camClient = new CamSDK.Client({
  apiUri: 'http://localhost:8080/engine-rest/'
});

...
```

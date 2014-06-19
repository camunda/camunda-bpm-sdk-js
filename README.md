# camunda-bpm-sdk-js

Javascript client library for [camunda BPM](https://github.com/camunda/camunda-bpm-platform)

## Features


## Installation


## Usage


### In browsers

```HTML

<script type="text/javascript" src="dist/camunda-bpm-sdk.js"></script>
<script type="text/javascript">
  var CamundaClient = require('camunda-bpm-sdk-js');

  cam = new CamundaClient({
    appUri: 'engine-rest/engine',
    // HttpClient: require('./../../lib/http-client-mock')
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

## Development

```bash
npm install
```

```bash
grunt auto-build
```

### Issues

https://app.camunda.com/jira/browse/CAM/component/12351


## License

[Apache License 2.0](./LICENSE)

## Authors

 - [Daniel _meyerdan_ Meyer](https://github.com/meyerdan) - [@meyerdan](http://twitter.com/meyerdan)
 - [Valentin _zeropaper_ Vago](https://github.com/zeropaper) - [@zeropaper](http://twitter.com/zeropaper)
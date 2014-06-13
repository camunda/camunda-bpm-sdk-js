# camunda-bpm-sdk-js

Javascript client library for [camunda BPM](https://github.com/camunda/camunda-bpm-platform)

## Features


## Installation


## Usage


### In browsers

```HTML

<script type="text/javascript" src="dist/camunda-bpm-sdk.js"></script>
<script type="text/javascript">
  var cam = new require('camunda-bpm-sdk-js')({
    apiUri: '//localhost:8080/engine-rest',
    engineName: 'default' // optional, default to "default",
    // 
    authentication: {
      type: 'basic',
      username: 'jonny1',
      password: 'insecure'
    }
  });
  
  cam.processDefinition().list();
  
  var request = cam.task().create({
    assignee: "jonny",
    candidateUser: "mary"
  });
  
  
  var taskResource = cam.task("existingTaskId", true); // <
  var taskResource = task.get();  // <
  
  var assignee =  taskResource.assignee;
  
  
  var task = cam.task().get("existingTaskId");
  task.delete();
  task.update({
    assignee: "foo"
  });
  
  cam.task().delete({id: "existingTaskId"});
  
  cam.task().update("existingTaskId", {
    
  });
  
  
  var taskResource = task.get();  // <
  
  var assignee =  taskResource.assignee;
  
  
  
  
  
  request.on().on();
    
  cam.task().create({
    assignee: "jonny",
    candidateUser: "mary"
  }).on("success", function() {
    
  });
  
  cam.task().create({
    assignee: "jonny",
    candidateUser: "mary"
  }, function(error, data) {
    
  });
  
  cam.task().
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


## License

[Apache License 2.0](./LICENSE)

## Authors

 - [Daniel _meyerdan_ Meyer](https://github.com/meyerdan) - [@meyerdan](http://twitter.com/meyerdan)
 - [Valentin _zeropaper_ Vago](https://github.com/zeropaper) - [@zeropaper](http://twitter.com/zeropaper)
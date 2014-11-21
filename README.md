# camunda-bpm-sdk-js

Javascript client library for [camunda BPM](https://github.com/camunda/camunda-bpm-platform)

## Install using bower

```sh
bower install camunda-bpm-sdk-js --save
```

## Documentation

You will find some more detailed documentation about the SDK in the `doc` directory.

## Development

```sh
npm install
```

```sh
grunt auto-build
```

### Testing

#### Karma

```sh
grunt karma
```

Alternatively, you can use the specific targets

```sh
grunt karma:dev-form
# or
grunt karma:dev-form-angularjs
```


#### Jamsine node

```sh
jasmine-node --autotest --watch lib -m /*Spec\.js$/ test/jasmine_node
```

### Issues

https://app.camunda.com/jira/browse/CAM/component/12351

## Releasing

### Release

To create a release:

```sh
grunt publish:release --setversion='myReleaseVersion'
```

This will update the version, commit and tag it, then publish it to [bower-camunda-bpm-sdk-js](https://github.com/camunda/bower-camunda-bpm-sdk-js)

### Snapshot

To create a snapshot release which just builds current head and publishes it to [bower-camunda-bpm-sdk-js](https://github.com/camunda/bower-camunda-bpm-sdk-js) on a branch named the current version:

```sh
grunt publish:snapshot
```

### Version

If you just want to update the current version:

```sh
grunt publish:version --setversion='myNewVersion'
```

### Available options

* --no-bower -> skip bower release
* --no-write -> dryRun mode

### Examples

* [standalone usage](https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-standalone)

## License

Unless otherwise specified this project is licensed under [Apache License Version 2.0](./LICENSE).

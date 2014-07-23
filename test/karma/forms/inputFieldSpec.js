describe('The input field', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false, CamFormSDK: false */
  'use strict';

  var exampleVariableName = "exampleVariableName";
  var exampleVariableStringValue = "exampleVariableStringValue";

  var VariableManager = CamFormSDK.VariableManager;
  var InputFieldHandler = CamFormSDK.fields.InputFieldHandler;
  var inputFieldTemplate = '<input type="text" />';

  it('should init the var name', function() {

    var variableManager = new VariableManager();

    // given:

    // an input field with 'cam-variable-name' directive
    var element = $(inputFieldTemplate).attr('cam-variable-name', exampleVariableName);

    // if:

    // I create an Input field
    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // then:

    // the variable is created in the variable manager
    var variable = variableManager.variable(exampleVariableName);
    expect(variable).toBeDefined();
    expect(variable.name).toBe(exampleVariableName);
    expect(variable.type).toBeUndefined();
    expect(variable.value).toBe('');

  });

  it('should init the var type', function() {

    var variableManager = new VariableManager();

    // given:

    // an input field with 'cam-variable-name' and 'cam-variable-type' directive
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String');

    // if:

    // I create an Input field
    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // then:

    // the variable is created in the variable manager
    var variable = variableManager.variable(exampleVariableName);
    expect(variable).toBeDefined();
    expect(variable.name).toBe(exampleVariableName);
    expect(variable.type).toBe('String');
    expect(variable.value).toBe('');

  });

  it('should init the variable value', function() {

    var variableManager = new VariableManager();

    // given:

    // an input field with 'cam-variable-name' and 'cam-variable-type' directive and an initial value
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String')
      .val(exampleVariableStringValue);

    // if:

    // I create an Input field
    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // then:

    // the variable is created in the variable manager
    var variable = variableManager.variable(exampleVariableName);
    expect(variable).toBeDefined();
    expect(variable.name).toBe(exampleVariableName);
    expect(variable.type).toBe('String');
    expect(variable.value).toBe(exampleVariableStringValue);

  });

  it('should get a string value from the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName);
    var inputFieldHandler = new InputFieldHandler(element, variableManager);
    // defined variable ...
    var variable = variableManager.variable(exampleVariableName);
    // without value
    expect(variable.value).toBe('');

    // if:

    // I set the value of the input field
    element.val(exampleVariableStringValue);
    // and get it using the field handler
    inputFieldHandler.getValue();

    // then:

    // the value is set in the variable manager
    expect(variable.value).toBe(exampleVariableStringValue);
  });

  iit('should apply a string value to the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName);
    var inputFieldHandler = new InputFieldHandler(element, variableManager);
    // defined variable ...
    var variable = variableManager.variable(exampleVariableName);
    // without value
    expect(variable.value).toBe('');

    // if:

    // I set the value to the variable
    variable.value = exampleVariableStringValue;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the value is set to the form control
    expect(element.val()).toBe(exampleVariableStringValue);

  });

});

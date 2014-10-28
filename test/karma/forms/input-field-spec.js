describe('The input field', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false, CamFormSDK: false */
  'use strict';

  var exampleVariableName = "exampleVariableName";
  var exampleVariableStringValue = "exampleVariableStringValue";
  var exampleVariableIntegerValue = 100;
  var exampleVariableFloatValue = 100.100;
  var exampleVariableBooleanValue = true;
  var exampleVariableDateValue = '2013-01-23T13:42:42';

  var VariableManager = CamSDK.Form.VariableManager;
  var InputFieldHandler = CamSDK.Form.fields.InputFieldHandler;
  var inputFieldTemplate = '<input type="text" />';
  var checkboxTemplate = '<input type="checkbox" />';
  var textareaTemplate = '<textarea></textarea>';


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
    expect(variable.value).toBe(null);

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
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String');

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

  it('should apply a string value to the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String');

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

  it('should work with a textarea', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(textareaTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String');

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
  ////////////////////// Integer //////////////////////////

  it('should convert empty string to "null" for Integer', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Integer');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set an empty string to the field
    element.val('');
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is Null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();

  });

  it('should not accept Float values for Integers', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Integer');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to a float value
    element.val(exampleVariableFloatValue);
    // then
    // getValue throws an exception
    expect(function() {
      inputFieldHandler.getValue();
    }).toThrow();
    // and the value in the variable is still null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();
  });

  it('should get an Integer value from the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Integer');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the field
    element.val(exampleVariableIntegerValue);
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is an integer
    expect(variableManager.variable(exampleVariableName).value)
      .toBe(exampleVariableIntegerValue);

  });

  it('should set an Integer value to the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Integer');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the variable
    var variable = variableManager.variable(exampleVariableName);
    variable.value = exampleVariableIntegerValue;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the value is set to the form control
    expect(element.val()).toBe(exampleVariableIntegerValue.toString());

  });

  ////////////////////// Float //////////////////////////

  it('should convert empty string to "null" for Float', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Float');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set an empty string to the field
    element.val('');
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is Null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();

  });

  it('should not accept String values for Floats', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Float');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to a String value
    element.val(exampleVariableStringValue);

    // then
    // getValue throws an exception
    expect(function() {
      inputFieldHandler.getValue();
    }).toThrow();

    // and the value in the variable is still null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();
  });

  it('should get an Float value from the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Float');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the field
    element.val(exampleVariableFloatValue);
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is an integer
    expect(variableManager.variable(exampleVariableName).value)
      .toBe(exampleVariableFloatValue);

  });

  it('should set an Float value to the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Float');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the variable
    var variable = variableManager.variable(exampleVariableName);
    variable.value = exampleVariableFloatValue;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the value is set to the form control
    expect(element.val()).toBe(exampleVariableFloatValue.toString());

  });

  ////////////////////// Boolean //////////////////////////

  it('should convert empty string to "null" for Boolean', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Boolean');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set an empty string to the field
    element.val('');
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is Null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();

  });

  it('should not accept String values for Booleans', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Boolean');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to a String value
    element.val(exampleVariableStringValue);

    // then
    // getValue throws an exception
    expect(function() {
      inputFieldHandler.getValue();
    }).toThrow();

    // and the value in the variable is still null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();
  });

  it('should get a Boolean value from the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Boolean');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the field
    element.val(exampleVariableBooleanValue.toString());
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is a boolean
    expect(variableManager.variable(exampleVariableName).value)
      .toBe(exampleVariableBooleanValue);

  });

  it('should set a Boolean value to the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Boolean');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the variable
    var variable = variableManager.variable(exampleVariableName);
    variable.value = exampleVariableBooleanValue;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the value is set to the form control
    expect(element.val()).toBe(exampleVariableBooleanValue.toString());

  });

  ////////////////////// Boolean Checkbox //////////////////////////


  it('should get a Boolean value from the checkbox control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(checkboxTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Boolean');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I check the checkbox
    element.prop("checked", exampleVariableBooleanValue);
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is a boolean
    expect(variableManager.variable(exampleVariableName).value)
      .toBe(exampleVariableBooleanValue);

  });

  it('should set a Boolean value to the checkbox control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(checkboxTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Boolean');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the variable
    var variable = variableManager.variable(exampleVariableName);
    variable.value = exampleVariableBooleanValue;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the value is set to the form control
    expect(element.prop("checked")).toBe(exampleVariableBooleanValue);

  });

  ////////////////////// Date //////////////////////////

  it('should convert empty string to "null" for Date', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Date');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set an empty string to the field
    element.val('');
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is Null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();

  });

  it('should not accept String values for Dates', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Date');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to a String value
    element.val(exampleVariableStringValue);

    // then
    // getValue throws an exception
    expect(function() {
      inputFieldHandler.getValue();
    }).toThrow();

    // and the value in the variable is still null
    expect(variableManager.variable(exampleVariableName).value).toBeNull();
  });

  it('should get a Date value from the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Date');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the field
    element.val(exampleVariableDateValue.toString());
    // and get the value from the input field
    inputFieldHandler.getValue();

    // then:

    // the value in the variable manager is a boolean
    expect(variableManager.variable(exampleVariableName).value)
      .toBe(exampleVariableDateValue);

  });

  it('should set a Date value to the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized input handler
    var element = $(inputFieldTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Date');

    var inputFieldHandler = new InputFieldHandler(element, variableManager);

    // if:

    // I set the value to the variable
    var variable = variableManager.variable(exampleVariableName);
    variable.value = exampleVariableDateValue;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the value is set to the form control
    expect(element.val()).toBe(exampleVariableDateValue.toString());

  });
});

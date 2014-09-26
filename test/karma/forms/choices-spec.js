describe('The select field', function() {
  /* global jQuery: false, CamSDK: false, CamSDKMocks: false, CamFormSDK: false */
  'use strict';

  var exampleVariableName = "exampleVariableName";
  var exampleVariableStringValue = "exampleVariableStringValue";
  var exampleVariableIntegerValue = 100;
  var exampleVariableFloatValue = 100.100;
  var exampleVariableBooleanValue = true;
  var exampleVariableDateValue = '2013-01-23T13:42:42';

  var exampleChoicesVariableName = 'exampleChoicesVarName';
  var exampleList = ['option1', 'option2'];
  var exampleStringMap = {
    "option1": "Option 1",
    "option2": "Option 2"
  };
  var exampleIntegerMap = {
    1: 'Option 1',
    2: 'Option 2'
  };

  var VariableManager = CamSDK.Form.VariableManager;
  var ChoicesFieldHandler = CamSDK.Form.fields.ChoicesFieldHandler;
  var selectTemplate = '<select />';


  it('should init the var name', function() {

    var variableManager = new VariableManager();

    // given:

    // a select box with 'cam-variable-name' directive
    var element = $(selectTemplate).attr('cam-variable-name', exampleVariableName);

    // if:

    // I create an Input field
    var inputFieldHandler = new ChoicesFieldHandler(element, variableManager);

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

    // a select box with 'cam-variable-name' and 'cam-variable-type' directive
    var element = $(selectTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String');

    // if:

    // I create an Input field
    var inputFieldHandler = new ChoicesFieldHandler(element, variableManager);

    // then:

    // the variable is created in the variable manager
    var variable = variableManager.variable(exampleVariableName);
    expect(variable).toBeDefined();
    expect(variable.name).toBe(exampleVariableName);
    expect(variable.type).toBe('String');

    // <!> different from <input> of type 'String'
    // If no value is selected, the variable value is expected to be 'null', regardless of whether
    // the selectbox is of type 'String' or not
    expect(variable.value).toBe(null);

  });

  it('should init the variable value', function() {

    var variableManager = new VariableManager();

    // given:

    // an input field with 'cam-variable-name' and 'cam-variable-type' directive and an initial value
    var element = $(selectTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String')
      .append($('<option>', {
          value: 'exampleVariableStringValue',
          text: 'exampleVariableStringValue'
        }))
      .val(exampleVariableStringValue);

    // if:

    // I create an Input field
    var inputFieldHandler = new ChoicesFieldHandler(element, variableManager);

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
    var element = $(selectTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String')
      .append($('<option>', {
          value: 'exampleVariableStringValue',
          text: 'exampleVariableStringValue'
        }));
    // with no option selected
    element[0].selectedIndex = -1;


    var choicesHandler = new ChoicesFieldHandler(element, variableManager);
    // defined variable ...
    var variable = variableManager.variable(exampleVariableName);
    // without value
    expect(variable.value).toBe(null);

    // if:

    // I set the value of the select box
    element.val(exampleVariableStringValue);
    // and get it using the field handler
    choicesHandler.getValue();

    // then:

    // the value is set in the variable manager
    expect(variable.value).toBe(exampleVariableStringValue);
  });

 it('should apply a string value to the control', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized select
    var element = $(selectTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String')
      .append($('<option>', {
          value: 'exampleVariableStringValue',
          text: 'exampleVariableStringValue'
        }));
    // with no option selected
    element[0].selectedIndex = -1;

    var inputFieldHandler = new ChoicesFieldHandler(element, variableManager);
    // defined variable ...
    var variable = variableManager.variable(exampleVariableName);
    // without value
    expect(variable.value).toBe(null);

    // if:

    // I set the value to the variable
    variable.value = exampleVariableStringValue;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // it selects the value
    expect(element.val()).toBe(exampleVariableStringValue);

  });

  // option handling (cam-choices) ////////////////////////

  it('should fetch cam-choices list', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized select
    var element = $(selectTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String')
      .attr('cam-choices', exampleChoicesVariableName);
    // with no option selected
    element[0].selectedIndex = -1;

    var inputFieldHandler = new ChoicesFieldHandler(element, variableManager);
    // defined choices variable.
    var variable = variableManager.variable(exampleChoicesVariableName);
    // without value
    expect(variable).toBeDefined();
    expect(variable.name).toBe(exampleChoicesVariableName);

    // if:

    // I set the choices variable
    variable.value = exampleList;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the choices are applied
    var options =$("option", element).map(function() {return $(this).val();}).get();
    expect(options).toEqual(exampleList);

    // still no value selected
    expect(element[0].selectedIndex).toEqual(-1);

  });

  it('should fetch cam-choices string map', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized select
    var element = $(selectTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'String')
      .attr('cam-choices', exampleChoicesVariableName);
    // with no option selected
    element[0].selectedIndex = -1;

    var inputFieldHandler = new ChoicesFieldHandler(element, variableManager);
    // defined choices variable.
    var variable = variableManager.variable(exampleChoicesVariableName);
    // without value
    expect(variable).toBeDefined();
    expect(variable.name).toBe(exampleChoicesVariableName);

    // if:

    // I set the choices variable
    variable.value = exampleStringMap;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the choices are applied
    var options =$("option", element).map(function() {return $(this).val();}).get();
    expect(options).toEqual(exampleList);

    // still no value selected
    expect(element[0].selectedIndex).toEqual(-1);

  });

  it('should fetch cam-choices integer map', function() {

    var variableManager = new VariableManager();

    // given:

    // an initialized select
    var element = $(selectTemplate)
      .attr('cam-variable-name', exampleVariableName)
      .attr('cam-variable-type', 'Integer')
      .attr('cam-choices', exampleChoicesVariableName);
    // with no option selected
    element[0].selectedIndex = -1;

    var inputFieldHandler = new ChoicesFieldHandler(element, variableManager);
    // defined choices variable.
    var variable = variableManager.variable(exampleChoicesVariableName);
    // without value
    expect(variable).toBeDefined();
    expect(variable.name).toBe(exampleChoicesVariableName);

    // if:

    // I set the choices variable
    variable.value = exampleIntegerMap;
    // and apply the input field
    inputFieldHandler.applyValue();

    // then:

    // the choices are applied
    var options =$("option", element).map(function() {return $(this).val();}).get();
    expect(options).toEqual(['1', '2']);

    // still no value selected
    expect(element[0].selectedIndex).toEqual(-1);

    // if

    // I select an option
    element.val('2');
    // and get it using the field handler
    inputFieldHandler.getValue();

    // then:

    // the value is set in the variable manager as Number (Integer)
    expect(variableManager.variableValue(exampleVariableName)).toBe(2);


  });

});

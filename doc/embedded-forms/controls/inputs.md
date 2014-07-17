# Inputs

__Important note__:
This document is a draft and some of the features described are _not yet implemented_.

## Text Input

### Single Line Text Input

#### Binding to a Process Variable

A text input can be bound to a process variable using the `cam-variable-name` directive:

```html
<input type="text"
       cam-variable-name="customerId" />
```

In the example above, the text input field is bound to the variable named `customerId`.

#### Specifying the Type of the Variable

Optionally, the type of the process variable can be specified using the `cam-variable-type`:


```html
<input type="text"
       cam-variable-name="customerId"
       cam-variable-type="string" />
```

The default type of a text input field is `string`.

#### Legacy Syntax:

```html
<input form-field type="text" name="[variableName]" />
```

Parameter | Explanation
--------- | -----------
variableName | The name of the process variable 

### Multi Line Textarea

#### Legacy Syntax

Textareas are HTML `<textarea>` elements of the form

```html
<textarea form-field name="[variableName]"></textarea>
```

*Note:* currently the textarea only supports string variables.

Parameter | Explanation
--------- | -----------
variableName | The name of the process variable 

This is an example of the textarea:

```html
<textarea form-field name="selectedName"></textarea>
```

## Number Input

#### Legacy Syntax:

```html
<input form-field type="number" name="[variableName]" />
```

Parameter | Explanation
--------- | -----------
variableName | The name of the process variable


## Date Input

#### Legacy Syntax:

```html
<input form-field type="date" name="[variableName]" />
```

Parameter | Explanation
--------- | -----------
variableName | The name of the process variable


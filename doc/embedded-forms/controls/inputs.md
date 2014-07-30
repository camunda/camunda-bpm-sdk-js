# Inputs

## Single Line Text Input

Single line text inputs are `<input type="text">` controls. Single line text input are the most
common input field and allow the user to provide values for different data types.

### Binding to a Process Variable

A text input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String" />
```

In the example above, the text input field is bound to the variable named `CUSTOMER_ID` of type
`String`.

### Supported Variable Types

A text input field supports multiple variable types.

> *Binding to existing variables*: Note that if you bind the input field to an existing variable,
> the type of the variable is provided by the process engine and the `cam-variable-type` directive
> is not required.

#### String

In order to bind the input field to a `String` variable, the directive `cam-variable-type="String"`
must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String" />
```

> *Trimming*: Note that the value of the String variable is trimmed before it is submitted to the 
> process engine: leading and trailing whitespace is removed.

#### Integer

In order to bind the input field to a Java `Integer` variable, the directive 
`cam-variable-type="Integer"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_AGE"
       cam-variable-type="Integer" />
```

#### Float

In order to bind the input field to a Java `Float` variable, the directive 
`cam-variable-type="Float"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_REVENUE"
       cam-variable-type="Float" />
```

#### Date

In order to bind the input field to a Java `Date` variable, the directive 
`cam-variable-type="Date"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CONTRACT_START_DATE"
       cam-variable-type="Date" />
```

##### Date Format

Currently only the ISO Date Format `yyyy-MM-dd'T'HH:mm:ss` is supported.
Example value: `2013-01-23T13:42:42`

#### Boolean

In order to bind the input field to a Java `Boolean` variable, the directive 
`cam-variable-type="Boolean"` must be used.

Text input fields of type `Boolean` accept the following string values:

* `true`
* `false`

Meaning that the user has to type the words "true" or "false" into the text input field.

Example:

```html
<input type="text"
       cam-variable-name="IS_VIP_CUSTOMER"
       cam-variable-type="Boolean" />
```

## Multi Line Textarea

Textareas are HTML `<textarea>` elements of the form

```html
<textarea></textarea>
```

### Binding to a Process Variable

A textarea input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

```html
<textarea cam-variable-name="CUSTOMER_ADDRESS"
          cam-variable-type="String">
</textarea>
```

In the example above, the textarea is bound to the variable named `CUSTOMER_ADDRESS` of type
`String`.

### Supported Variable Types

The textarea supports the same variable types as the single line text input `<input
type="text"></input>`.

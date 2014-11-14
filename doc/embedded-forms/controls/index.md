# Supported HTML Controls

* [Inputs][inputs]
* [Choices][choices]

# Common attributes

Most of the implementation can be done by adding the following special attributes to the fields.

## cam-variable-name

_Requires a value_ corresponding to the variable name.

This attribute __is used on every__ controls.

## cam-variable-type

Is _optional_ but _requires a value_ if used.


## cam-choices

_Requires a value_ corresponding to a variable name containing the available choices.

This attribute is only used on [choices] controls.
If a `select` tag has `option` tags as children,
the new `option` tags` (for the dynamically added) choices will be append.


[inputs]: inputs.md
[choices]: choices.md
[file-upload]: file-upload.md
[hidden-field]: hidden-field.md

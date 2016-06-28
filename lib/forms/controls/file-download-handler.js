'use strict';

var constants = require('./../constants'),
    AbstractFormField = require('./abstract-form-field');

/**
 * A field control handler for file downloads
 * @class
 * @memberof CamSDK.form
 * @augments {CamSDK.form.AbstractFormField}
 */
var InputFieldHandler = AbstractFormField.extend(
  {
  /**
   * Prepares an instance
   */
    initialize: function() {

      this.variableName = this.element.attr(constants.DIRECTIVE_CAM_FILE_DOWNLOAD);

    // fetch the variable
      this.variableManager.fetchVariable(this.variableName);
    },

    applyValue: function() {

      var variable = this.variableManager.variable(this.variableName);

    // set the download url of the link
      this.element.attr('href', variable.contentUrl);

    // sets the text content of the link to the filename it the textcontent is empty
      if(this.element.text().trim().length === 0) {
        this.element.text(variable.valueInfo.filename);
      }

      return this;
    }

  },

  {

    selector: 'a['+ constants.DIRECTIVE_CAM_FILE_DOWNLOAD +']'

  });

module.exports = InputFieldHandler;


# Working with Serialized Java Objects

This section explains how to work with serialized Java Objects in embedded task forms.

> NOTE: Out of the box, you can only work with Java Objects which are serialized in *JSON format*
> If Java Classes are serialized using JAX-B, you need to add custom XML parsing and writing logic
> to the embedded form.

## Fetching a Serialized Java Object

The Form SDK will only fetch those variables which are actually used in a form. Since a Complex Java
Object is usually not bound to a single input field we cannot use the `cam-variable-name` directive.
We thus need to fetch the variable programatically: 

```html
<script cam-script type="text/form-script">
  camForm.on('form-loaded', function() {
    // tell the form SDK to fetch the variable named 'invoiceData'
    camForm.variableManager.fetchVariable('invoiceData');
  });
  camForm.on('variables-fetched', function() {
    // work with the variable (bind it to the current AngularJS $scope)
    $scope.invoiceData = camForm.variableManager.variableValue('invoiceData');
  });
</script>
```
## Creating a new Serialized Java Object

In case the variable does not yet exist (for instance in a Start Form), you have to create the variable and specify the necessary meta data in order for the process engine to correctly handle the variable as Java Object.

```html
<script cam-script type="text/form-script">
  camForm.on('form-loaded', function() {
  
    // declare variable incuding metadata for serialization
    camForm.variableManager.createVariable({
      name: 'invoiceData',
      type: 'Object',
      value: {},
      serializationConfig: {
        dataFormatId: 'application/json; implementation=tree',
        rootType: 'org.my.project.dto.InvoiceData'
      }
    });
    
  });
  camForm.on('variables-fetched', function() {
    $scope.invoiceData = camForm.variableManager.variableValue('invoiceData');
  });
</script>
```

## Full Example

Given the following Java Class `InvoiceData`:

```java
public class InvoiceData {

  protected String invoiceNumber;
  protected String creditor;
  protected String amount;
  protected int priority;

  public String getInvoiceNumber() { return invoiceNumber; }
  public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
  public String getCreditor() { return creditor; }
  public void setCreditor(String creditor) { this.creditor = creditor; }
  public String getAmount() { return amount; }
  public void setAmount(String amount) { this.amount = amount; }
  public int getPriority() { return priority; }
  public void setPriority(int priority) { this.priority = priority; }

}
```

Assuming that an instance of the class is stored in the process variable `invoiceData`, we can
construct the following form for working on an instance of the class:

```html
<form role="form">

  <script cam-script type="text/form-script">
    camForm.on('form-loaded', function() {
      camForm.variableManager.fetchVariable('invoiceData');
    });
    camForm.on('variables-fetched', function() {
      $scope.invoiceData = camForm.variableManager.variableValue('invoiceData');
    });
  </script>

  <div class="form-group">
    <label for="invoiceNumber-field">Invoice Number</label>
    <input id="invoiceNumber-field"
           type="text"
           class="form-control"
           required
           ng-model="invoiceData.invoiceNumber">
  </div>
  <div class="form-group">
    <label for="amount-field">Amount</label>
    <input id="amount-field"
           type="text"
           class="form-control"
           required
           ng-model="invoiceData.amount">
  </div>
  <div class="form-group">
    <label for="creditor-field">Creditor</label>
    <input id="creditor-field"
           type="text"
           class="form-control"
           required
           ng-model="invoiceData.creditor">
  </div>
  <div class="form-group">
    <label for="priority-field">Priority</label>
    <input id="priority-field"
           type="number"
           class="form-control"
           required
           ng-model="invoiceData.priority">
  </div>

</form>
```

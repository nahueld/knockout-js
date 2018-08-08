import ko from "knockout";
import ViewModel from "../../ko/ViewModel";

class FormField extends ViewModel {
  constructor(...args) {
    super(...args);
    this.label = this.$params.label;
    this.id = this.$params.id;
    this.error = this.$params.error;
    this.fieldValue = this.$params.fieldValue;
  }
}

export default FormField;

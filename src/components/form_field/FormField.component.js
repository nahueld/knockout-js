import template from "./FormField.tmpl.html";

const FormField = {
  template,
  viewModel: function(params) {
    this.$params = params;
  },
  component: "form-field"
};

export default FormField;

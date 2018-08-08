import template from "./SelectField.tmpl.html";

const SelectField = {
  template,
  viewModel: function(params) {
    this.$params = params;
  },
  component: "select-field"
};

export default SelectField;

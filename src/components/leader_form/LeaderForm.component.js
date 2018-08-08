import template from "./LeaderForm.tmpl.html";

const LeaderForm = {
  template,
  viewModel: function(params) {
    this.$params = params;
  },
  component: "leader-form"
};

export default LeaderForm;

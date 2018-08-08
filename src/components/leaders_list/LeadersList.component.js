import template from "./LeadersList.tmpl.html";

const LeadersList = {
  template,
  viewModel: function(params) {
    this.$params = params;
  },
  component: "leaders-list"
};

export default LeadersList;

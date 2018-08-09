import LeaderForm from "./LeaderForm.component";
import FormField from "../form_field/FormField.component";

describe("LeaderForm Component", () => {
  it('should be named as "leader-form"', () => {
    expect(LeaderForm.component).eq("leader-form");
  });

  describe("template", () => {
    before(() => {
      ko.components.register(LeaderForm.component, {
        viewModel: LeaderForm.viewModel,
        template: LeaderForm.template
      });
      ko.components.register(FormField.component, {
        viewModel: FormField.viewModel,
        template: FormField.template
      });
    });

    after(() => {
      ko.components.unregister(LeaderForm.component);
      ko.components.unregister(FormField.component);
    });

    it("should render leader form", () => {
      const leaderForm = renderComponent(LeaderForm, {
        fields: [
          {
            label: "Name",
            id: "name",
            fieldValue: "John"
          }
        ]
      });
      expect(leaderForm.children().length).to.eqls(1);
      expect(leaderForm.find("label").text()).to.eqls("Name");
    });

    it("should render leader form button", () => {
      const leaderForm = renderComponent(LeaderForm, {
        onSubmit: () => {}
      });

      expect(leaderForm.find("button").text()).to.eqls("Create");
    });

    it("should perform onSubmit when clicking button", () => {
      const params = {
        onSubmit: () => {}
      };
      const spy = sinon.spy(params, "onSubmit");
      const leaderForm = renderComponent(LeaderForm, params);
      leaderForm.find("button").simulate("click");
      expect(spy.called).to.be.true;
    });
  });
});

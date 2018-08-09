import FormField from "./FormField.component.js";
import { expect } from "chai";
import ko from "knockout";
import { renderComponent } from "ko-component-tester";

describe("FormField Component", () => {
  it('should be named as "form-field"', () => {
    expect(FormField.component).eq("form-field");
  });

  describe("template", () => {
    it("should render text input", () => {
      const formField = renderComponent(FormField, {
        label: "Name",
        id: "#some-id"
      });
      expect(formField.find("label").text()).to.eqls("Name");
      expect(formField.find("#some-id")).to.exist;
      expect(formField.find("small").text()).to.be.empty;
    });

    it("should render text input with value", () => {
      const formField = renderComponent(FormField, {
        fieldValue: ko.observable("Jorgito")
      });
      expect(formField.find("input[type='text']").val()).to.be.eqls("Jorgito");
    });

    it("should render number input", () => {
      const formField = renderComponent(FormField, {
        fieldValue: ko.observable("10"),
        type: "number"
      });
      expect(formField.find("input[type='number']").length).to.be.eqls(1);
    });
  });
});

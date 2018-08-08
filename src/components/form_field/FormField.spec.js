import FormField from "./FormField.component.js";
import { expect } from "chai";
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

    it("should render text input with error message", () => {
      const formField = renderComponent(FormField, {
        error: "Something went wrong"
      });
      expect(formField.find("small").text()).to.be.eqls("Something went wrong");
    });

    it("should render text input with value", () => {
      const formField = renderComponent(FormField, {
        fieldValue: "Jorgito"
      });
      expect(formField.find("input").val()).to.be.eqls("Jorgito");
    });
  });
});

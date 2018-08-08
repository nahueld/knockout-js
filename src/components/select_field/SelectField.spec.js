import ko from "knockout";
import { expect } from "chai";
import sinon from "sinon";
import { renderComponent } from "ko-component-tester";
import SelectField from "./SelectField.component";

describe("SelectField Component", () => {
  it('should be named as "select-field"', () => {
    expect(SelectField.component).eq("select-field");
  });

  describe("template", () => {
    let selectField;

    let params = {
      id: "my-id",
      label: "My Select",
      options: ko.observableArray([
        { id: "1", label: "entry-1" },
        { id: "2", label: "entry-2" }
      ]),
      selected: ko.observable({ id: "2", label: "entry-2" }),
      onChange: () => {}
    };

    before(() => {
      selectField = renderComponent(SelectField, params);
    });

    it("should render a select field", () => {
      expect(selectField).to.exist;
    });

    it("should have default selected value", () => {
      expect(
        selectField
          .find("option")
          .first()
          .text()
      ).to.eqls("entry-1");
    });

    it("should trigger onChange when changed", () => {
      const spy = sinon.spy(params, "onChange");
      selectField.find("select").simulate("change");
      expect(spy.called).to.be.true;
    });
  });
});

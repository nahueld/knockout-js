import App from "./App.component.js";
import { expect } from "chai";
import { renderComponent } from "ko-component-tester";
import ko from "knockout";
import componentsRegistry from "./registry";

describe("App Component", () => {
  before(() => {
    componentsRegistry.forEach(c => {
      const { component, ...rest } = c;
      ko.components.register(component, rest);
    });
  });

  it('is name is "app"', () => {
    expect(App.component).to.eqls("app");
  });

  it("should render the whole App", () => {
    let app = renderComponent(App);
    expect(app.find("input").length).to.be.eqls(4);
    expect(app.find("select").length).to.be.eqls(2);
    expect(app.find("option").length).to.be.eqls(6);
    expect(app.find("h4").text()).to.be.eqls("The list is empty :(");
  });
});

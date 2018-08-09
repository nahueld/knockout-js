import App from "./App.component.js";
import componentsRegistry from "./registry";
import * as ko from "knockout";
import { renderComponent } from "ko-component-tester";

describe("App Component", () => {
  before(() => {
    componentsRegistry.forEach(c => {
      const { component, ...rest } = c;
      ko.components.register(component, rest);
    });
  });

  after(() => {
    componentsRegistry.forEach(c => {
      const { component } = c;
      ko.components.unregister(component);
    });
  });

  it('is name is "app"', () => {
    expect(App.component).to.eqls("app");
  });

  it("should render the whole App 2", () => {
    let app = renderComponent(App, {});
    expect(app.find("input").length).to.be.eqls(4);
    expect(app.find("select").length).to.be.eqls(2);
    expect(app.find("option").length).to.be.eqls(6);
    expect(app.find("option:eq(0)").html()).to.be.eqls("Name");
    expect(app.find("option:eq(1)").html()).to.be.eqls("Last Name");
    expect(app.find("option:eq(2)").html()).to.be.eqls("Age");
    expect(app.find("option:eq(3)").html()).to.be.eqls("Score");
    expect(app.find("option:eq(4)").html()).to.be.eqls("Asc");
    expect(app.find("option:eq(5)").html()).to.be.eqls("Desc");
    expect(app.find("h4").text()).to.be.eqls("The list is empty :(");
  });
});

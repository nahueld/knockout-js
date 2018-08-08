import ko from "knockout";
import componentsRegistry from "./registry";
import * as _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";

componentsRegistry.forEach(c => {
  const { component, ...rest } = c;
  ko.components.register(component, rest);
});

ko.applyBindings();

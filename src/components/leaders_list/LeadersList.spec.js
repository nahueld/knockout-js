import LeadersList from "./LeadersList.component";
import ko from "knockout";
import { expect } from "chai";
import sinon from "sinon";
import { renderComponent } from "ko-component-tester";
import SelectField from "../select_field/SelectField.component";

describe("LeadersList Component", () => {
  it('should be named as "leaders-list"', () => {
    expect(LeadersList.component).eq("leaders-list");
  });

  describe("template", () => {
    let leadersList;

    before(() => {
      ko.components.register(LeadersList.component, {
        viewModel: LeadersList.viewModel,
        template: LeadersList.template
      });
      ko.components.register(SelectField.component, {
        viewModel: SelectField.viewModel,
        template: SelectField.template
      });

      leadersList = renderComponent(LeadersList, {
        entries: ko.observableArray([
          { name: "john", lastName: "doe", age: 40, score: 100 },
          { name: "jane", lastName: "doe", age: 30, score: 70 }
        ]),
        sortingField: {
          id: "sortingField",
          label: "Sorting"
        },
        orderingField: {
          id: "orderingField",
          label: "Ordering"
        }
      });
    });

    it("should render 2 items in leaders list", () => {
      expect(leadersList.find("select").length).to.eqls(2);
    });

    it("should render john as the first", () => {
      const firstLeader = leadersList
        .find("li:first")
        .find("div")
        .first()
        .text()
        .trim();
      expect(firstLeader).to.eqls("john doe 40 100");
    });

    it("should render jane as the last", () => {
      const firstLeader = leadersList
        .find("li:last")
        .find("div")
        .first()
        .text()
        .trim();
      expect(firstLeader).to.eqls("jane doe 30 70");
    });

    it("should show empty state message if not entries in the list", () => {
      leadersList = renderComponent(LeadersList, {
        entries: ko.observableArray([]),
        sortingField: {
          id: "sortingField",
          label: "Sorting"
        },
        orderingField: {
          id: "orderingField",
          label: "Ordering"
        }
      });
      expect(
        leadersList
          .find("h4")
          .text()
          .trim()
      ).to.eqls("The list is empty :(");
    });
  });
});

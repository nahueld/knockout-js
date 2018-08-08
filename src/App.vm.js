import ko from "knockout";
import ViewModel from "./ko/ViewModel";

class App extends ViewModel {
  constructor(...args) {
    super(...args); // Make params accessible via this.$params

    this.fields = [
      {
        label: "Name",
        id: "name",
        fieldValue: ko.observable(),
        error: ko.observable()
      },
      {
        label: "Last Name",
        id: "lastName",
        fieldValue: ko.observable(),
        error: ko.observable()
      },
      {
        label: "Age",
        id: "age",
        fieldValue: ko.observable(),
        error: ko.observable()
      },
      {
        label: "Score",
        id: "score",
        fieldValue: ko.observable(),
        error: ko.observable()
      }
    ];

    this.appState = {
      leaderForm: {
        fields: this.fields,
        onSubmit: () => {
          const newLeader = _.reduce(
            this.fields,
            (sum, curr) => _.extend(sum, { [curr.id]: curr.fieldValue() }),
            {}
          );
          this.appState.leadersList.entries(
            this.appState.leadersList.entries().concat(newLeader)
          );
        }
      },
      leadersList: {
        entries: ko.observableArray([
          // { name: "john", lastName: "doe", age: 40, score: 100 }
        ]),
        sortingField: {
          label: "Field",
          id: "sortingField",
          options: ko.observableArray(
            _(this.fields)
              .map(({ id, label }) => ({ id, label }))
              .value()
          ),
          selected: ko.observable(_(this.fields).first()),
          onChange: () =>
            console.log(this.appState.leadersList.sortingField.selected())
        },
        orderingField: {
          label: "Order",
          id: "orderingField",
          options: ko.observableArray([
            { id: "asc", label: "Asc" },
            { id: "desc", label: "Desc" }
          ]),
          selected: ko.observable({ id: "desc", label: "Desc" }),
          onChange: () => {
            const sortingField = this.appState.leadersList.sortingField.selected()
              .id;
            const sortingOrder = this.appState.leadersList.orderingField.selected()
              .id;
            console.log(sortingField, sortingOrder);

            const sorted = _(this.appState.leadersList.entries())
              .orderBy(sortingField, sortingOrder)
              .value();
            this.appState.leadersList.entries(sorted);
          }
        }
      }
    };
  }
}

export default App;

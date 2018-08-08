import ko from "knockout";

class App {
  constructor() {
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

    this.leaderEntries = ko.observableArray([]);

    this.sortingFieldOptions = ko.observableArray(
      _(this.fields)
        .map(({ id, label }) => ({ id, label }))
        .value()
    );

    this.sortingFieldSelected = ko.observable(_(this.fields).first());

    this.sortingOrderOptions = ko.observableArray([
      { id: "asc", label: "Asc" },
      { id: "desc", label: "Desc" }
    ]);

    this.sortingOrderSelected = ko.observable({ id: "desc", label: "Desc" });

    this.sortLeadersList = () => {
      let sorted = _(this.leaderEntries())
        .orderBy(this.sortingFieldSelected().id, this.sortingOrderSelected().id)
        .value();
      this.leaderEntries(sorted);
    };

    this.submitLeaderForm = () => {
      const newLeader = _.reduce(
        this.fields,
        (sum, curr) => _.extend(sum, { [curr.id]: curr.fieldValue() }),
        {}
      );
      this.leaderEntries.push(newLeader);
      this.sortLeadersList();
    };

    this.appState = {
      leaderForm: {
        fields: this.fields,
        onSubmit: this.submitLeaderForm
      },
      leadersList: {
        entries: this.leaderEntries,
        sortingField: {
          label: "Field",
          id: "sortingField",
          options: this.sortingFieldOptions,
          selected: this.sortingFieldSelected,
          onChange: this.sortLeadersList
        },
        orderingField: {
          label: "Order",
          id: "orderingField",
          options: this.sortingOrderOptions,
          selected: this.sortingOrderSelected,
          onChange: this.sortLeadersList
        }
      }
    };
  }
}

export default App;

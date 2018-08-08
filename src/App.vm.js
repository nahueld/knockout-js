import ko from "knockout";
require("knockout.validation");

class App {
  constructor() {
    ko.validation.init();

    this.nameFieldValue = ko
      .observable()
      .extend({ required: true })
      .extend({ minLength: 2 })
      .extend({ maxLength: 10 });

    this.lastNameFieldValue = ko
      .observable()
      .extend({ required: true })
      .extend({ minLength: 2 })
      .extend({ maxLength: 10 });

    this.ageFieldValue = ko
      .observable()
      .extend({ required: true })
      .extend({ number: true })
      .extend({ min: 18 })
      .extend({ max: 100 });

    this.scoreFieldValue = ko
      .observable()
      .extend({ required: true })
      .extend({ number: true })
      .extend({ min: 0 })
      .extend({ max: 100 });

    this.validationModel = ko.validatedObservable({
      nameFieldValidation: this.nameFieldValue,
      lastNameFieldValidation: this.lastNameFieldValue,
      ageFieldValueValidation: this.ageFieldValue,
      scoreFieldValidation: this.scoreFieldValue
    });

    this.fields = [
      {
        label: "Name",
        id: "name",
        fieldValue: this.nameFieldValue
      },
      {
        label: "Last Name",
        id: "lastName",
        fieldValue: this.lastNameFieldValue
      },
      {
        label: "Age",
        id: "age",
        fieldValue: this.ageFieldValue
      },
      {
        label: "Score",
        id: "score",
        fieldValue: this.scoreFieldValue
      }
    ];

    this.leaderEntries = ko.observableArray([]);

    this.sortingFieldOptions = ko.observableArray(this.getSortingOptions());

    this.sortingFieldSelected = ko.observable();

    this.sortingOrderOptions = ko.observableArray([
      { id: "asc", label: "Asc" },
      { id: "desc", label: "Desc" }
    ]);

    this.sortingOrderSelected = ko.observable();

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

  submitLeaderForm() {
    if (!this.validationModel.isValid()) return;
    const newLeader = _.reduce(
      this.fields,
      (sum, curr) => _.extend(sum, { [curr.id]: curr.fieldValue() }),
      {}
    );
    this.leaderEntries.push(newLeader);
    this.sortLeadersList();
  }

  sortLeadersList() {
    let sorted = _(this.leaderEntries())
      .orderBy(this.sortingFieldSelected().id, this.sortingOrderSelected().id)
      .value();
    this.leaderEntries(sorted);
  }

  getSortingOptions() {
    return _(this.fields)
      .map(({ id, label }) => ({ id, label }))
      .value();
  }
}

export default App;

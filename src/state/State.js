import ko from "knockout";
import Extenders from "../extenders/Extenders";

function State() {
  ko.validation.init();

  this.nameFieldValue = ko
    .observable()
    .extend({ required: true })
    .extend({ minLength: 2 })
    .extend({ maxLength: 10 })
    .extend({
      pattern: {
        params: "^(-?[a-zA-Z]+d*)$",
        message: "That doesn't look like a healthy name."
      }
    });

  this.lastNameFieldValue = ko
    .observable()
    .extend({ required: true })
    .extend({ minLength: 2 })
    .extend({ maxLength: 10 })
    .extend({
      pattern: {
        params: "^(-?[a-zA-Z]+d*)$",
        message: "That doesn't look like a healthy last name."
      }
    });

  this.ageFieldValue = ko
    .observable()
    .extend({ parseInt: true })
    .extend({ required: true })
    .extend({ number: true })
    .extend({
      pattern: {
        params: "^(-?[1-9]+d*)$|^0$",
        message: "That's and odd age for a person."
      }
    })
    .extend({ min: 18 })
    .extend({ max: 100 });

  this.scoreFieldValue = ko
    .observable()
    .extend({ parseInt: true })
    .extend({ required: true })
    .extend({ number: true })
    .extend({ min: 0 })
    .extend({
      pattern: {
        params: "^(-?[1-9]+d*)$|^0$",
        message: "Specify a score between 0 and 100."
      }
    })
    .extend({ max: 100 });

  this.validationModel = ko.validatedObservable({
    nameFieldValidation: this.nameFieldValue,
    lastNameFieldValidation: this.lastNameFieldValue,
    ageFieldValueValidation: this.ageFieldValue,
    scoreFieldValidation: this.scoreFieldValue
  });

  this.formFields = [
    {
      label: "Name",
      id: "name",
      type: "text",
      fieldValue: this.nameFieldValue
    },
    {
      label: "Last Name",
      id: "lastName",
      type: "text",
      fieldValue: this.lastNameFieldValue
    },
    {
      label: "Age",
      id: "age",
      type: "number",
      fieldValue: this.ageFieldValue
    },
    {
      label: "Score",
      id: "score",
      type: "number",
      fieldValue: this.scoreFieldValue
    }
  ];

  this.sortingFieldOptions = ko.observableArray(
    _(this.formFields)
      .map(({ id, label }) => ({ id, label }))
      .value()
  );

  this.leaderEntries = ko.observableArray();

  this.sortingFieldSelected = ko.observable();

  this.sortingOrderOptions = ko.observableArray([
    { id: "asc", label: "Asc" },
    { id: "desc", label: "Desc" }
  ]);

  this.sortingOrderSelected = ko.observable();

  this.sortingField = {
    label: "Field",
    id: "sortingField",
    options: this.sortingFieldOptions,
    selected: this.sortingFieldSelected
  };

  this.orderingField = {
    label: "Order",
    id: "orderingField",
    options: this.sortingOrderOptions,
    selected: this.sortingOrderSelected
  };
}

export default State;

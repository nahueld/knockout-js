import ko from "knockout";
import ViewModel from "../../ko/ViewModel";

class LeaderForm extends ViewModel {
  constructor(...args) {
    super(...args);

    this.nameField = {
      label: "Name",
      id: "name",
      fieldValue: ko.observable(""),
      error: ko.observable("")
    };

    this.lastNameField = {
      label: "Last Name",
      id: "last-name",
      fieldValue: ko.observable(""),
      error: ko.observable("")
    };

    this.ageField = {
      label: "Age",
      id: "age",
      fieldValue: ko.observable(""),
      error: ko.observable("")
    };

    this.scoreField = {
      label: "Score",
      id: "score",
      fieldValue: ko.observable(""),
      error: ko.observable("")
    };
  }

  sendForm() {
    console.log(this.nameField.fieldValue());
    this.nameField.error("some error");
  }
}

export default LeaderForm;

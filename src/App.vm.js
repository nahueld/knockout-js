import ko from "knockout";
import ViewModel from "./ko/ViewModel";

class App extends ViewModel {
  constructor(...args) {
    super(...args); // Make params accessible via this.$params
    this.appState = {
      leaderForm: {
        fields: [
          {
            label: "Name",
            id: "name",
            fieldValue: ko.observable(""),
            error: ko.observable("")
          },
          {
            label: "Last Name",
            id: "lastName",
            fieldValue: ko.observable(""),
            error: ko.observable("")
          },
          {
            label: "Age",
            id: "age",
            fieldValue: ko.observable(""),
            error: ko.observable("")
          },
          {
            label: "Score",
            id: "score",
            fieldValue: ko.observable(""),
            error: ko.observable("")
          }
        ],
        onSubmit: () => {
          const newLeader = _.reduce(
            this.appState.leaderForm.fields,
            (sum, curr) => _.extend(sum, { [curr.id]: curr.fieldValue() }),
            {}
          );
          this.appState.leadersList.entries(
            this.appState.leadersList.entries().concat(newLeader)
          );
        }
      },
      leadersList: {
        entries: ko.observableArray([{ name: "Jorgito" }])
      }
    };
  }
}

export default App;

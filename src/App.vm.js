import State from "./state/State";
import Actions from "./state/Actions";

require("knockout.validation");

function App() {
  let state = new State();
  let actions = new Actions(state);

  this.appState = {
    leaderForm: {
      fields: state.formFields,
      onSubmit: actions.submitLeaderForm
    },
    leadersList: {
      entries: state.leaderEntries,
      sortingField: {
        ...state.sortingField,
        onChange: actions.sortLeadersList
      },
      orderingField: {
        ...state.orderingField,
        onChange: actions.sortLeadersList
      }
    }
  };
}

export default App;

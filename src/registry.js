import App from "./App.component.js";
import LeaderForm from "./components/leader_form/LeaderForm.component";
import FormField from "./components/form_field/FormField.component";
import LeadersList from "./components/leaders_list/LeadersList.component.js";

// Any new KO component must be subscribed in the KO registry
const registry = [App, LeaderForm, FormField, LeadersList];

export default registry;

import App from "./App.component.js";
import LeaderForm from "./components/leader_form/LeaderForm.component";
import FormField from "./components/form_field/FormField.component";

// Any new KO component must be subscribed in the KO registry
const registry = [App, LeaderForm, FormField];

export default registry;

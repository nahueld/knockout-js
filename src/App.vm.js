import ko from "knockout";
import ViewModel from "./ko/ViewModel";

class App extends ViewModel {
  constructor(...args) {
    super(...args); // Make params accessible via this.$params
    this.message = ko.observable("Hello World before");
  }
  sayHello() {
    this.message("Hello World!");
  }
}

export default App;

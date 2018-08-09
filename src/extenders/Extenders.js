import ko from "knockout";

function Extenders() {
  ko.extenders.parseInt = function(target) {
    let result = ko
      .pureComputed({
        read: target,
        write: function(newValue) {
          const valueToWrite =
            !newValue || isNaN(newValue) ? "" : parseInt(newValue);
          target(valueToWrite);
        }
      })
      .extend({ notify: "always" });

    result(target());

    return result;
  };
}

export default Extenders();

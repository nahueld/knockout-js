import ko from "knockout";
import { expect } from "chai";
import Extenders from "./Extenders";

describe("Extenders", () => {
  describe("parseInt", () => {
    it("should be able to parse a valid numeric string", () => {
      let observable = ko.observable("1").extend({ parseInt: true });
      expect(observable()).to.be.eqls(1);
    });

    it("should be able to parse an invalid numeric string and not crash", () => {
      let observable = ko.observable("one").extend({ parseInt: true });
      expect(observable()).to.be.eqls("");
    });

    it("should be able to parse an empty string and not crash", () => {
      let observable = ko.observable("").extend({ parseInt: true });
      expect(observable()).to.be.eqls("");
    });

    it("should be able to parse an null observable and not crash", () => {
      let observable = ko.observable(null).extend({ parseInt: true });
      expect(observable()).to.be.eqls("");
    });

    it("should be able to parse an undefined observable and not crash", () => {
      let observable = ko.observable(undefined).extend({ parseInt: true });
      expect(observable()).to.be.eqls("");
    });
  });
});

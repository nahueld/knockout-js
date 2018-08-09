import Extenders from "../extenders/Extenders";
import Actions from "./Actions";
import State from "./State";

describe("Actions", () => {
  let state;
  let actions;

  before(() => {
    state = new State();
    actions = new Actions(state);
  });

  describe("sortLeadersList", () => {
    before(() => {
      state.leaderEntries([
        {
          name: "aa",
          lastName: "bb",
          age: 10,
          score: 20
        },
        {
          name: "dd",
          lastName: "cc",
          age: 33,
          score: 85
        },
        {
          name: "bb",
          lastName: "ee",
          age: 8,
          score: 17
        }
      ]);
    });

    it("sort by name asc", () => {
      state.sortingFieldSelected({ id: "name" });
      state.sortingOrderSelected({ id: "asc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].name).to.be.eqls("aa");
      expect(state.leaderEntries()[1].name).to.be.eqls("bb");
      expect(state.leaderEntries()[2].name).to.be.eqls("dd");
    });

    it("sort by name desc", () => {
      state.sortingFieldSelected({ id: "name" });
      state.sortingOrderSelected({ id: "desc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].name).to.be.eqls("dd");
      expect(state.leaderEntries()[1].name).to.be.eqls("bb");
      expect(state.leaderEntries()[2].name).to.be.eqls("aa");
    });

    it("sort by lastName asc", () => {
      state.sortingFieldSelected({ id: "lastName" });
      state.sortingOrderSelected({ id: "asc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].lastName).to.be.eqls("bb");
      expect(state.leaderEntries()[1].lastName).to.be.eqls("cc");
      expect(state.leaderEntries()[2].lastName).to.be.eqls("ee");
    });

    it("sort by lastName desc", () => {
      state.sortingFieldSelected({ id: "lastName" });
      state.sortingOrderSelected({ id: "desc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].lastName).to.be.eqls("ee");
      expect(state.leaderEntries()[1].lastName).to.be.eqls("cc");
      expect(state.leaderEntries()[2].lastName).to.be.eqls("bb");
    });

    it("sort by age asc", () => {
      state.sortingFieldSelected({ id: "age" });
      state.sortingOrderSelected({ id: "desc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].age).to.be.eqls(33);
      expect(state.leaderEntries()[1].age).to.be.eqls(10);
      expect(state.leaderEntries()[2].age).to.be.eqls(8);
    });

    it("sort by age desc", () => {
      state.sortingFieldSelected({ id: "age" });
      state.sortingOrderSelected({ id: "asc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].age).to.be.eqls(8);
      expect(state.leaderEntries()[1].age).to.be.eqls(10);
      expect(state.leaderEntries()[2].age).to.be.eqls(33);
    });

    it("sort by score asc", () => {
      state.sortingFieldSelected({ id: "score" });
      state.sortingOrderSelected({ id: "desc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].score).to.be.eqls(85);
      expect(state.leaderEntries()[1].score).to.be.eqls(20);
      expect(state.leaderEntries()[2].score).to.be.eqls(17);
    });

    it("sort by score desc", () => {
      state.sortingFieldSelected({ id: "score" });
      state.sortingOrderSelected({ id: "asc" });
      actions.sortLeadersList();
      expect(state.leaderEntries()[0].score).to.be.eqls(17);
      expect(state.leaderEntries()[1].score).to.be.eqls(20);
      expect(state.leaderEntries()[2].score).to.be.eqls(85);
    });
  });

  describe("submitLeaderForm", () => {
    let cleanLeaderFormSpy;
    let sortLeadersListSpy;

    before(() => {
      cleanLeaderFormSpy = sinon.spy(actions, "cleanLeaderForm");
      sortLeadersListSpy = sinon.spy(actions, "sortLeadersList");
    });

    it("should not send form on error", () => {
      state.validationModel.isValid(false);
      actions.submitLeaderForm();
      expect(cleanLeaderFormSpy.called).to.be.false;
    });

    it("should send form when no error", () => {
      state.validationModel.isValid(true);
      actions.submitLeaderForm();
      expect(cleanLeaderFormSpy.called).to.be.true;
      expect(sortLeadersListSpy.called).to.be.true;
      expect(state.leaderEntries().length).to.be.eqls(4);
    });
  });

  describe("getNewLeaderFromForm", () => {
    it("should return new entry from the form values", () => {
      state.nameFieldValue("John");
      state.lastNameFieldValue("Doe");
      state.ageFieldValue(55);
      state.scoreFieldValue(100);
      expect(actions.getNewLeaderFromForm()).to.be.eqls({
        name: "John",
        lastName: "Doe",
        age: 55,
        score: 100
      });
    });
  });

  describe("cleanLeaderForm", () => {
    it("should clean the form and set it to pristine", () => {
      state.nameFieldValue("John");
      state.lastNameFieldValue("Doe");
      state.ageFieldValue(55);
      state.scoreFieldValue(100);
      actions.cleanLeaderForm();
      expect(state.nameFieldValue()).to.be.eqls("");
      expect(state.nameFieldValue.isModified()).to.be.false;
      expect(state.lastNameFieldValue()).to.be.eqls("");
      expect(state.lastNameFieldValue.isModified()).to.be.false;
      expect(state.ageFieldValue()).to.be.eqls("");
      expect(state.ageFieldValue.isModified()).to.be.false;
      expect(state.scoreFieldValue()).to.be.eqls("");
      expect(state.scoreFieldValue.isModified()).to.be.false;
    });
  });

  describe("markLeaderFormModified", () => {
    it("should mark all fields as modified", () => {
      actions.markLeaderFormModified();
      expect(state.nameFieldValue.isModified()).to.be.true;
      expect(state.lastNameFieldValue.isModified()).to.be.true;
      expect(state.ageFieldValue.isModified()).to.be.true;
      expect(state.scoreFieldValue.isModified()).to.be.true;
    });
  });

  describe("validations", () => {
    describe("should validate name", () => {
      before(() => {
        state.nameFieldValue("John");
        state.lastNameFieldValue("Doe");
        state.ageFieldValue(55);
        state.scoreFieldValue(100);
      });

      it("valid name", () => {
        expect(state.validationModel.isValid()).to.be.true;
      });

      it("empty name", () => {
        state.nameFieldValue("");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "This field is required."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("name has 1 character", () => {
        state.nameFieldValue("a");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter at least 2 characters."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("name has suspicious characters", () => {
        state.nameFieldValue("<weird>");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "That doesn't look like a healthy name."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("name has more than 10 characters", () => {
        state.nameFieldValue("superlongname");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter no more than 10 characters."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });
    });

    describe("should validate lastName", () => {
      before(() => {
        state.nameFieldValue("John");
        state.lastNameFieldValue("Doe");
        state.ageFieldValue(55);
        state.scoreFieldValue(100);
      });

      it("valid lastName", () => {
        expect(state.validationModel.isValid()).to.be.true;
      });

      it("empty lastName", () => {
        state.lastNameFieldValue("");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "This field is required."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("lastName has 1 character", () => {
        state.lastNameFieldValue("a");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter at least 2 characters."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("lastName has suspicious characters", () => {
        state.lastNameFieldValue("<weird>");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "That doesn't look like a healthy last name."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("lastName has more than 10 characters", () => {
        state.lastNameFieldValue("superlongname");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter no more than 10 characters."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });
    });

    describe("should validate age", () => {
      before(() => {
        state.nameFieldValue("John");
        state.lastNameFieldValue("Doe");
        state.ageFieldValue(55);
        state.scoreFieldValue(100);
      });

      it("valid age", () => {
        expect(state.validationModel.isValid()).to.be.true;
      });

      it("empty age", () => {
        state.ageFieldValue("");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "This field is required."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("under age", () => {
        state.ageFieldValue(10);
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter a value greater than or equal to 18."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("over age", () => {
        state.ageFieldValue(101);
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter a value less than or equal to 100."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("age has suspicious characters", () => {
        state.ageFieldValue("<>");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "This field is required."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("age is decimal", () => {
        state.ageFieldValue("22.8");
        expect(state.ageFieldValue()).to.be.eqls(22);
        expect(state.validationModel.isValid()).to.be.true;
      });
    });

    describe("should validate score", () => {
      before(() => {
        state.nameFieldValue("John");
        state.lastNameFieldValue("Doe");
        state.ageFieldValue(55);
        state.scoreFieldValue(100);
      });

      it("valid score", () => {
        expect(state.validationModel.isValid()).to.be.true;
      });

      it("empty score", () => {
        state.scoreFieldValue("");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "This field is required."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("under score", () => {
        state.scoreFieldValue(-100);
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter a value greater than or equal to 0."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("over score", () => {
        state.scoreFieldValue(101);
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "Please enter a value less than or equal to 100."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("score has suspicious characters", () => {
        state.scoreFieldValue("<>");
        expect(state.validationModel.errors()[0]).to.be.eqls(
          "This field is required."
        );
        expect(state.validationModel.isValid()).to.be.false;
      });

      it("score is decimal", () => {
        state.scoreFieldValue("22.8");
        expect(state.scoreFieldValue()).to.be.eqls(22);
        expect(state.validationModel.isValid()).to.be.true;
      });
    });
  });
});

function Actions(state) {
  this.sortLeadersList = () => {
    let sorted = _(state.leaderEntries())
      .orderBy(state.sortingFieldSelected().id, state.sortingOrderSelected().id)
      .value();
    state.leaderEntries(sorted);
  };

  this.submitLeaderForm = () => {
    if (!state.validationModel.isValid()) {
      this.markLeaderFormModified();
      return;
    }
    state.leaderEntries.push(this.getNewLeaderFromForm());
    this.sortLeadersList();
    this.cleanLeaderForm();
  };

  this.getNewLeaderFromForm = () =>
    _.reduce(
      state.formFields,
      (sum, curr) => _.extend(sum, { [curr.id]: curr.fieldValue() }),
      {}
    );

  this.cleanLeaderForm = () => {
    state.formFields.forEach(f => {
      f.fieldValue("");
      f.fieldValue.isModified(false);
    });
  };

  this.markLeaderFormModified = () => {
    state.formFields.forEach(f => f.fieldValue.isModified(true));
  };
}

export default Actions;

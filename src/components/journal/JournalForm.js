import React, { Component } from "react";

export default class JournalForm extends Component {
  // Set initial state of how the new layout will look and store in database
  state = {
    journalEntry: "",
    goalId: ""
  };

  createJournalEntry = () => {
    let newEntry = {};
    newEntry.journalEntry = this.state.journalEntry;
    newEntry.goalId = this.state.goalId;

    //create the journal entry and redirect user to goal list
    // this.props.addGoal(newGoal).then(() => this.props.history.push("/goals"));
  };
  constructNewJournalEntry = evt => {
    evt.preventDefault();
    if (this.state.journalEntry === null) {
      window.alert("Please journal your thoughts");
    } else {
      this.createJournalEntry();
    }
  };
  render() {
    return (
      <React.Fragment>
        <form className="JournalEntryForm">
          <div className="form-group">
            <label htmlFor="journalEntry">
              <h2>Track Your Journey</h2>
            </label>
            <input
              type="textarea"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="journalEntry"
              placeholder="Enter Dreams Here"
            />
          </div>
          <button
            type="save"
            onClick={this.constructNewJournalEntry}
            className="btn btn-primary"
          >
            Send Up Your Dreams
          </button>
        </form>
      </React.Fragment>
    );
  }
}

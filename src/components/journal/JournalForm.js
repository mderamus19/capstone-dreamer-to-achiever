import React, { Component } from "react";
import {Button}from "reactstrap";


export default class JournalForm extends Component {
  // Set initial state of how the new layout will look and store in database
  state = {
    goalId: "",
    journalEntry: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  createJournalEntry = () => {
    let newEntry = {};
    newEntry.journalEntry = this.state.journalEntry;
    newEntry.goalId = this.state.goalId;

    // create the journal entry and redirect user to journal list
    this.props.addJournalEntry(newEntry).then(() => this.props.history.push("/journals"));
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
          <Button
            type="save"
            onClick={this.constructNewJournalEntry}
            className="btn btn-primary"
          >
            Send Up Your Dreams
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

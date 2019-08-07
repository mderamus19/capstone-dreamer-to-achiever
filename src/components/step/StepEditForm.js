import React, { Component } from "react";
import { Button } from "reactstrap";
import APIManager from "../modules/APIManager"
export default class StepEditForm extends Component {
  // Set initial state of how the new layout will look and store in database
  state = {
    // userId: parseInt(sessionStorage.getItem("credentials")),
    //   goal: "",
    //   startDate: "",
    //   endDate: "",
    rewards: "",
    //   journals: "",
    steps: "",
    allSteps: []
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingStep = evt => {
    evt.preventDefault();

    if (!this.state.step) {
      window.alert("Please enter a step");
    } else {
      const editedStep = {
        id: this.props.match.params.stepId, //give it the existing id of what you are trying to update
        // userId: parseInt(this.state.userId),
        steps: this.state.step
        // startDate:this.state.startDate,
        // endDate:this.state.endDate
      };
      // calling updateStep
      this.props
        .updateStep(editedStep)
        .then(() => this.props.history.push("/goals/steps/edit"));
    }
  };
  // sets the initial state when rendered;initially renders with
  // no data then you populate the data and update state then it is rerendered with all the data
  componentDidMount() {
    APIManager.get("steps",this.props.match.params.stepId).then(step => {
    this.setState({
      userId: parseInt(sessionStorage.getItem("credentials")),
      steps: step.steps
      // startDate:this.props.goal.startDate,
      // endDate:this.props.goal.endDate
    });
  })
  }

  render() {
    return (
      <React.Fragment>
        <form className="stepEditForm">
          <div form className="form-group">
            <fieldset>
              <label htmlFor="step">
                <h5>Steps To Achieve Goal</h5>
              </label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="step"
                value={this.state.steps}
              />
            </fieldset>
          </div>
          <Button
            type="save"
            // onClick you call the existing updateExistingStep
            onClick={this.updateExistingStep}
            className="btn btn-primary"
          >
            Save
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

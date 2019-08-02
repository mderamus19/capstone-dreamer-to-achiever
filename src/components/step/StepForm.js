import React, { Component } from "react";

export default class StepForm extends Component {
  // Set initial state of how the new layout will look and store in database
  state = {
    userId: parseInt(sessionStorage.getItem("credentials")),
    goalId: "",
    step: "",
    rewards: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  createStep = () => {
    let newStep = {};
    newStep.userId = this.state.userId;
    newStep.rewardId = this.state.rewards;
    newStep.goalId = this.state.goal.Id;
    newStep.completed = false;
    //create the step and redirect user to step list
    this.props.addStep(newStep).then(() => this.props.history.push("/steps"));
  };
  constructNewStep = evt => {
    evt.preventDefault();
    if (this.state.step === null) {
      window.alert("Please enter a step");
    } else {
      this.createStep();
    }
  };

  render() {
    console.log(steps);
    return (
      <React.Fragment>
        <form className="StepForm">
          <div className="form-group">
            <label htmlFor="step">
              <h5>Steps To Achieve Goal</h5>
            </label>
            <fieldset>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="step"
                placeholder="Enter Step Here"
              />
            </fieldset>
            <Button
              type="save"
              onClick={this.constructNewStep}
              className="btn btn-primary"
            >
              Save Step
            </Button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

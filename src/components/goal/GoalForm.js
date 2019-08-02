import React, { Component } from "react";

export default class GoalForm extends Component {
  // Set initial state of how the new layout will look and store in database
  state = {
    userId: parseInt(sessionStorage.getItem("credentials")),
    goal: "",
    startDate: "",
    endDate: "",
    rewards: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  createGoal = () => {
    let newGoal = {};
    newGoal.userId = this.state.userId;
    newGoal.rewardId = this.state.rewards;
    newGoal.goal = this.state.goal;
    newGoal.startDate = this.state.startDate;
    newGoal.endDate = this.state.endDate;
    newGoal.completed = false;
    //create the goal and redirect user to goal list
    this.props.addGoal(newGoal).then(() => this.props.history.push("/goals"));
  };
  constructNewGoal = evt => {
    evt.preventDefault();
    if (this.state.goal === null) {
      window.alert("Please enter a goal");
    } else {
      this.createGoal();
    }
  };
  render() {
    return (
      <React.Fragment>
        <form className="GoalForm">
          <div className="form-group">
            <label htmlFor="goal">
              <h1>
                <strong>GOALS</strong>
              </h1>
            </label>
            <fieldset>
              <label htmlFor="startDate"> Start Date</label>
              <input onChange={this.handleFieldChange} type="date" name="startDate" id="startDate" />
              <label htmlFor="esDate"> Expected Completion Date</label>
              <input onChange={this.handleFieldChange} type="date" name="endDate" id="endDate" />
            </fieldset>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="goal"
              placeholder="Enter Goal Here"
            />
            <fieldset>
                <label htmlFor="step"><h5>Steps To Achieve Goal</h5></label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="step"
              placeholder="Enter Step Here"
            /></fieldset>
          </div>
          <div className="form-group">
            <label htmlFor="rewards">Choose Your Reward</label>
            <select
              defaultValue=""
              name="rewards"
              id="rewards"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a Reward</option>
              {this.props.rewards.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="save"
            onClick={this.constructNewGoal}
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      </React.Fragment>
    );
  }
}

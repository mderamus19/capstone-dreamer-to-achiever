import React, { Component } from "react";
import APIManager from "../modules/APIManager";
// import GoalList from "./GoalList";

export default class GoalEditForm extends Component {
  // Set initial state
  state = {
    userId: parseInt(sessionStorage.getItem("credentials")),
    goal: "",
    startDate: "",
    endDate: "",
    rewards: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingGoal = evt => {
    evt.preventDefault();

    if (!this.state.rewardId) {
      window.alert("Please select a reward");
    } else {
      const editedGoal = {
        id: this.props.match.params.goalId, //give it the existing id of what you are trying to update
        goal: this.state.goal,
        reward: this.state.reward,
        userId: parseInt(this.state.userId)
      };
      // calling updateGoal
      this.props
        .updateGoal(editedGoal)
        .then(() => this.props.history.push("/goals"));
    }
  };
  // sets the initial state when rendered;initially renders with
  // no data then you populate the data and update state then it is rerendered with all the data
  componentDidMount() {
    APIManager.get(this.props.match.params.goalId).then(goal => {
      this.setState({
        goal: goal.goal,
        reward: goal.reward,
        userId: goal.userId
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="goalEditForm">
          <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="goal"
              // the value is what you set on state which allows
              // you to prepopulate the form with existing values the user can then change
              value={this.state.goal}
            />
          </div>
          <button
            type="save"
            // onClick you call the existing updateExistingGoal
            onClick={this.updateExistingGoal}
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      </React.Fragment>
    );
  }
}

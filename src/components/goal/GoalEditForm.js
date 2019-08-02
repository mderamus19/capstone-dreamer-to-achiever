import React, { Component } from "react";

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

    if (!this.state.goal) {
      window.alert("Please enter a goal");
    } else {
      const editedGoal = {
        id: this.props.match.params.goalId, //give it the existing id of what you are trying to update
        userId: parseInt(this.state.userId),
        goal: this.state.goal,
        startDate:this.state.startDate,
        endDate:this.state.endDate
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

      this.setState({
        userId: parseInt(sessionStorage.getItem("credentials")),
        goal: this.props.goal.goal,
        startDate:this.props.goal.startDate,
        endDate:this.props.goal.endDate
      });
  }

  render() {
    return (
      <React.Fragment>
        <form className="goalForm">
          <div className="form-group">
            <fieldset>
              <label htmlFor="startDate"> Start Date</label>
              <input onChange={this.handleFieldChange} type="date" name="startDate" id="startDate" value ="startDate"/>
              <label htmlFor="esDate"> Expected Completion Date</label>
              <input onChange={this.handleFieldChange} type="date" name="endDate" id="endDate" value="endDate" />
            </fieldset>
            <label htmlFor="goal"><strong><h2>Goal</h2></strong></label>
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
          <fieldset>
                <label htmlFor="step"><h5>Steps To Achieve Goal</h5></label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="step"
              value={this.state.steps}
            /></fieldset>
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

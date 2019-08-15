import React, { Component } from "react"
// import JournalForm from "../journal/JournalForm";
import { Button } from "reactstrap"

export default class GoalForm extends Component {
  // Set initial state of how the new layout will look and store in database
  state = {
    userId: parseInt(sessionStorage.getItem("credentials")),
    goal: "",
    startDate: "",
    endDate: "",
    rewards: "",
    journals: "",
    step: "",
    allSteps: []
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  addNextStep = () => {
    if (this.state.step !== "") {
      let stepArray = [...this.state.allSteps]
      let newStep = {
        step: this.state.step,
        completed: false
      }

      stepArray.push(newStep)

      this.setState({
        allSteps: stepArray
      })
    }
  }

  createGoal = () => {
    let newGoal = {}
    newGoal.userId = this.state.userId
    newGoal.rewardId = this.state.rewards
    newGoal.goal = this.state.goal
    newGoal.startDate = this.state.startDate
    newGoal.endDate = this.state.endDate
    newGoal.completed = false
    //create the goal and redirect user to goallist
    this.props.addGoal(newGoal, this.state.allSteps)
  }
  constructNewGoal = evt => {
    evt.preventDefault()
    if (this.state.goal === null) {
      window.alert("Please enter a goal")
    } else {
      this.createGoal()
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="color-card">
          <div className="form-group">
            <label htmlFor="goal">
              <h1 className="goal-title">Dreamer To Achiever</h1>
              <h4>What results do you want to achieve this month?</h4>
            </label>
            <fieldset>
              <label htmlFor="startDate" className="startDate">
                {" "}
                Start Date{" "}
              </label>
              <input
                onChange={this.handleFieldChange}
                type="date"
                name="startDate"
                id="startDate"
              />
              <label htmlFor="endDate" className="endDate">
                Expected Completion Date
              </label>
              <input
                onChange={this.handleFieldChange}
                type="date"
                name="endDate"
                id="endDate"
              />
            </fieldset>
            <input
              type="textarea"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="goal"
              placeholder="Enter Planned Achievement Here"
            />
            {/* create steps to add to goals */}
            <hr />
            <label htmlFor="step">
              <h4>What specific actions will you need to take?</h4>
            </label>
          </div>
          <div className="stepForm">
            <div className="stepHeader">
              <input
                type="textarea"
                required
                className="form-control"
                id="step"
                onChange={this.handleFieldChange}
                placeholder="Enter action steps here"
              />

              <Button onClick={this.addNextStep} outline color="warning">
                Add Action
              </Button>

              <div>
                {this.state.allSteps.map(step => (
                  <ul>
                    <li key={Date.now()}>{step.step}</li>
                  </ul>
                ))}
              </div>
              <hr />
              <div className="form-group">
                <label htmlFor="rewards">
                  <h4>Choose Your Goal Achievment Reward</h4>
                </label>{" "}
                <select
                  defaultValue=""
                  name="rewards"
                  id="rewards"
                  onChange={this.handleFieldChange}
                >
                  {/* create reward choices for selection */}
                  <option value="">Select a Reward</option>
                  {this.props.rewards.map(e => (
                    <option key={e.id} id={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                type="save"
                onClick={this.constructNewGoal}
                className="save-button"
                outline
                color="success"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

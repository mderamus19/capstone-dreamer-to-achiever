import React, { Component } from "react";
// import GoalCard from "./GoalCard";
// import "./Goal.css"
// import trophy from "./TrophyIcon.svg";

export default class Goal extends Component {
  state = {
    steps: "",
    saveDisabled: false
  };
  //ADDED want to display goals and steps to edit and delete
  render() {
    console.log(this.props.goal);
    return (
      <section className="goal">
        <div key={this.props.goal.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {/* <img src={trophy} alt="trophy" className="icon--trophy" /> */}
              "Goal: "
            </h4>
            <h6 className="card-title">{this.props.goal.goal}</h6>
            <div>
              "Steps: "
              {this.props.goal.steps.map(step => (
                <div key = {step.id}>{step.step}<button id = {step.id}
              onClick = {() =>this.props.deleteStep(step.id)} >delete</button>
                <button id = {step.id}>edit</button></div>
              ))}

              <h5 className="card-title">{this.props.step}</h5>
              {/* <button on Click ={() => {
                this.setState({saveDisabled: true }, ( ) =>
                this.props.steps.map(step => this.deleteStep)
                )}}>
                  Delete Steps
                  </button> */}
            </div>
            {/* <button
              onClick={() => {
                this.setState({ saveDisabled: true }, () =>
                  this.props.deleteGoal(this.props.goal.id)
                );
              }}
              disabled={this.state.saveDisabled}
              className="card-link"
            >
              Delete Goal
            </button> */}
          </div>
        </div>
      </section>
    );
  }
}

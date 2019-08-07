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
                 <div key={step.id}>
                 <input type="checkbox"/>
                  {step.step}
                  <button
                    id={step.id}
                    onClick={() => this.props.deleteStep(step.id)}
                    >
                    delete
                  </button>
                  <button id={step.id}
                  onClick ={() => this.props.history.push(`/steps/${step.id}/edit`)}>edit</button>
                </div>
              ))}
              <h5 className="card-title">{this.props.step}</h5>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

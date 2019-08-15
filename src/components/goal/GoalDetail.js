import React, { Component } from "react";
import {Button} from "reactstrap";
// import checkSteps from "./CheckStepsIcon.svg";

export default class Goal extends Component {
  state = {
    steps: "",
    saveDisabled: false
  };
  render() {
    return (
      <section className="goal">
        <div key={this.props.goal.id} className="view-step-card">
          <div className="card-body">
              {/* <img src={checkSteps} className="icon--checkmark" /> */}
            <h6><strong>{"Goal: "}</strong>{this.props.goal.goal}</h6>
            <div>
              <strong>Action Steps:</strong>
               {this.props.goal.steps.map(step => (
                 <div key={step.id}>
                 <input type="checkbox" size="lg" className="strikethrough"/>
                  {step.step}{" "}
                  <Button outline color="warning" size ="sm" id={step.id}
                  onClick ={() => this.props.history.push(`/steps/${step.id}/edit`)}
                  >Edit</Button> {" "}
                  <Button outline color="danger" size="sm"
                    id={step.id}
                    onClick={() => this.props.deleteStep(step.id)}
                    >
                    Delete
                  </Button>
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

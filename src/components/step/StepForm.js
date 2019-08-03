import React, { Component } from "react";
import { Button } from "reactstrap";

export default class StepForm extends Component {
  state = {
    goalId: "",
    step: "",
    allSteps: []
  };
  //   Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
};

addNextStep = e => {
    e.preventDefault();
    if (this.state.step !== "") {
        let stepArray = [...this.state.allSteps];
        let newStep = {
            step: this.state.step,
            completed: false
            // key: Date.now()
        };

        stepArray.push(newStep);

        this.setState({
            allSteps: stepArray

        });

    }
};

render() {
    return (
        <React.Fragment>
        <label htmlFor="step">
          <h2>Steps To Achieve Goal</h2>
        </label>
        <div className="stepForm">
          <div className="stepHeader">
            <form onSubmit={this.addNextStep}>
              <input
                id="step"
                onChange={this.handleFieldChange}
                placeholder="Enter step here"
                />

              <Button type="submit">add step</Button>
            </form>
            <div>
              {this.state.allSteps.map(step => (
                <ol>
                  <li key={Date.now()}>{step.step}</li>
                  </ol>
                  ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

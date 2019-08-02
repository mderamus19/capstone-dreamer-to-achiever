// import React, { Component } from "react";

// export default class StepForm extends Component {
//   // Set initial state of how the new layout will look and store in database
//   state = {
//     userId: parseInt(sessionStorage.getItem("credentials")),
//     goalId: "",
//     step: "",
//     rewards: ""
//   };

//   // Update state whenever an input field is edited
//   handleFieldChange = evt => {
//     const stateToChange = {};
//     stateToChange[evt.target.id] = evt.target.value;
//     this.setState(stateToChange);
//   };

//   createStep = () => {
//     let newStep = {};
//     newStep.userId = this.state.userId;
//     newStep.rewardId = this.state.rewards;
//     newStep.goalId = this.state.goal.Id;
//     newStep.completed = false;
//     //create the step and redirect user to step list
//     this.props.addStep(newStep).then(() => this.props.history.push("/steps"));
//   };
//   constructNewStep = evt => {
//     evt.preventDefault();
//     if (this.state.step === null) {
//       window.alert("Please enter a step");
//     } else {
//       this.createStep();
//     }
//   };

//   render() {
//     console.log(this.props.step);
//     return (
//       <React.Fragment>
//         <form className="StepForm">
//           <div className="form-group">
//             <label htmlFor="step">
//               <h5>Steps To Achieve Goal</h5>
//             </label>
//             <fieldset>
//               <input
//                 type="text"
//                 required
//                 className="form-control"
//                 onChange={this.handleFieldChange}
//                 id="step"
//                 placeholder="Enter Step Here"
//               />
//             </fieldset>
//             <Button
//               type="save"
//               onClick={this.constructNewStep}
//               className="btn btn-primary"
//             >
//               Save Step
//             </Button>
//           </div>
//         </form>
//       </React.Fragment>
//     );
//   }
// }
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

  addNextStep=(e) => {
    e.preventDefault();
    if (this.state.step !== "") {
let stepArray = [...this.state.allSteps]
      let newStep = {
        step: this.state.step,
        completed:false
        // key: Date.now()
      };

      stepArray.push(newStep);

      this.setState({
              allSteps: stepArray
        });

    //   e.target.value = "";
    }

  }

  //
//     createNewStep = () => {
//       let newStep = {};
//       newStep.step = this.state.step;
//       newStep.completed = false;
//   //create the step and redirect user to step list
    // };
  //   constructNewGoal = evt => {
  //     evt.preventDefault();
  //     if (this.state.goal === null) {
  //       window.alert("Please enter a goal");
  //     } else {
  //       this.createGoal();
  //     }
  //   };

  render() {
    console.log(this.state.steps);
    return (
      <React.Fragment>
        <label htmlFor="step">
          <h5>Steps To Achieve Goal</h5>
        </label>
        <div className="stepForm">
          <div className="stepHeader">
            <form onSubmit={this.addNextStep}>
              <input id="step" onChange={this.handleFieldChange}
                placeholder="Enter step here"
              />
              <Button type="submit">add step</Button>
            </form>
            <div>
            {
                this.state.allSteps.map(step => (
                    <div key ={Date.now()}>
                        {step.step}
                    </div>
                ) )
            }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

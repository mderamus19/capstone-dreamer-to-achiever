// import { Route } from "react-router-dom";
import React, { Component } from "react";
// import trophy from "./GoalIcon.svg"
import {Button}from "reactstrap";
import "./Goal.css";
import GoalCard from "./GoalCard";

export default class GoalList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="goalButton">
          <Button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/goals/new");
            }}
          >
            Create New Goal
          </Button>
        </div>
        <section className="goals">
          {this.props.goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} {...this.props} />
          ))}
        </section>
      </React.Fragment>
    );
  }
}
// export default class GoalList extends Component {
//   render() {
//     return (
//       <section className="goals">
//         {this.props.goals.map(goal => (
//           <div key={goal.id} className="card">
//             <div className="card-body">
//               <div className="card-title">
//                 {/* <img src={trophy} className="icon--trophy" /> */}
//                 <h5>{goal.name}</h5>
//                 <button
//                   onClick={() => this.props.deleteGoal(goal.id)}
//                   className="card-link"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     );
//   }
// }

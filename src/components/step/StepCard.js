// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// // import trophy from "./TrophyIcon.svg";
// import {Button}from "reactstrap";


// export default class StepCard extends Component {
//   render() {
//     // console.log(this.props.step)
//     return (
//       <div key={this.props.step.id} className="card">
//         <div className="card-body">
//           <div className="card-title">
//             {/* <img src={trophy} className="icon--trophy" /> */}
//             <h5>{"Step: "}{this.props.step}</h5>

//             <Link className="nav-link" to={`/goals/${this.props.goal.id}`}>
//               Details-Step Card
//             </Link>
//             {/* button to edit step card, route parameter to do a fetch call to get steps to prefill form */}
//             <Button
//               type="button"
//               className="btn btn-success"
//               onClick={() => {
//                 this.props.history.push(
//                   `/steps/${this.props.step.id}/edit`
//                 );
//               }}
//             >
//               Edit
//             </Button>
//             <Button
//               onClick={() => this.props.deleteStep(this.props.step.id)}
//               className="card-link"
//             >
//               Delete Step
//             </Button>

//           </div>
//         </div>
//       </div>
//     );
//   }
// }
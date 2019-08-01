import React, { Component } from "react";
import { Link } from "react-router-dom";
// import trophy from "./TrophyIcon.svg";
import "./Goal.css";

export default class GoalCard extends Component {
  render() {
    return (
      <div key={this.props.goal.id} className="card">
        <div className="card-body">
          <div className="card-title">
            {/* <img src={trophy} className="icon--trophy" /> */}
            <h5>{this.props.goal.name}</h5>
            <Link className="nav-link" to={`/goals/${this.props.goal.id}`}>
              Details
            </Link>
            {/* button to edit animal card */}
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/goals/${this.props.goal.id}/edit`
                );
              }}
            >
              Edit
            </button>
            <a
              href="#"
              onClick={() => this.props.deleteGoal(this.props.goal.id)}
              className="card-link"
            >
              Delete Goal
            </a>
          </div>
        </div>
      </div>
    );
  }
}
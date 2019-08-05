import React, { Component } from "react";
import { Link } from "react-router-dom";
// import trophy from "./TrophyIcon.svg";
import "./Goal.css";
import {Button}from "reactstrap";


export default class GoalCard extends Component {
  render() {
    // console.log(this.props.goal)
    return (
      <div key={this.props.goal.id} className="card">
        <div className="card-body">
          <div className="card-title">
            {/* <img src={trophy} className="icon--trophy" /> */}
            <h5>{"Goal: "}{this.props.goal.goal}</h5>
            <Link className="nav-link" to={`/goals/${this.props.goal.id}`}>
              Details-Goal Card
            </Link>
            {/* button to edit goal card, route parameter to do a fetch call to get goals to prefill form */}
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/goals/${this.props.goal.id}/edit`
                );
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => this.props.deleteGoal(this.props.goal.id)}
              className="card-link"
            >
              Delete Goal
            </Button>

          </div>
        </div>
      </div>
    );
  }
}
import React, { Component } from "react";
import { Link } from "react-router-dom";
import target from "./TargetIcon.svg";
import "./Goal.css";
import {Button }from "reactstrap";


export default class GoalCard extends Component {
  render() {
    // console.log(this.props.goal)
    return (
        <div key={this.props.goal.id} className="card">
        <div className="card-body">
          <div className="card-title">
            <img src={target} alt="target"className="icon--target" />
            <h6><strong>{"Start Date: "}</strong>{this.props.goal.startDate}</h6>
            <h6><strong>{"Finish Date: "}</strong>{this.props.goal.endDate}</h6>
            <h5><strong>{"Goal: "}</strong>{this.props.goal.goal}</h5>
            <Link color="warning"className="nav-step-link" to={`/goals/${this.props.goal.id}`}>
              View Actions
            </Link>
            {/* button to edit goal card, route parameter to do a fetch call to get goals to prefill form */}
            <Button size="sm" outline color="warning"
              type="button"
              className="card-link"
              onClick={() => {
                this.props.history.push(
                  `/goals/${this.props.goal.id}/edit`
                );
              }}
            >
              Edit Goal
            </Button>
            <Button
              onClick={() => this.props.deleteGoal(this.props.goal.id)}
              className="card-link"
              size="sm" outline color="danger"
            >
              Delete Goal
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
// import { Route } from "react-router-dom";
import React, { Component } from "react";
// import trophy from "./GoalIcon.svg"
import { Button, Row, Col } from "reactstrap";
import "./Goal.css";
import GoalCard from "./GoalCard";


export default class GoalList extends Component {
  render() {
    console.log("goal list rendered", this.props.goals)
    return (
      <React.Fragment>
        <div class="row justify-content-center">
          <Button
            className="createButton" size="sm"
            onClick={() => {
              this.props.history.push("/goals/new");
            }}
          >
            Create New Goal
          </Button>
        </div>
        <section className="goals">
          {this.props.goals.map(goal => (
            <GoalCard
              key={goal.id}
              deleteGoal={this.props.deleteGoal}
              goal={goal}
              {...this.props}
            />
          ))}
        </section>
      </React.Fragment>
    );
  }
}

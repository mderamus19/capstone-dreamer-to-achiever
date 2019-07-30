import { Route } from "react-router-dom";
import React, { Component } from "react";
import GoalList from "./components/goal/GoalList";
// import StepList from './components/step/StepList'
import JournalList from "./components/journal/JournalList";
import APIManager from "./components/modules/APIManager";

export default class ApplicationViews extends Component {
  state = {
    goals: [],
    // steps: []
    journals: []
  };
  componentDidMount() {
      const newState ={};
APIManager.getAll()
      .then(goals => (newState.goals = goals))
      .then(() => {
        //   return EmployeeManager.getAll();
        // })
        // .then(employees => (newState.employees = employees))
        // .then(() => {
        //   return LocationManager.getAll();
        // })
        // .then(locations => (newState.locations = locations))
        // .then(() => {
        //   return OwnerManager.getAll();
      })
      // .then(owners => (newState.owners = owners))
      .then(() => this.setState(newState));

    // const newState = {};
    // fetch("http://localhost:5002/goals")
    //   .then(r => r.json())
    //   .then(goals => (newState.goals = goals))
    //   .then(() => fetch("http://localhost:5002/journals").then(r => r.json()))
    //   .then(journals => (newState.journals = journals))
    //   .then(() => this.setState(newState));
  }
  deleteGoal = id => {
    return fetch(`http://localhost:5002/goals/${id}`, {
      method: "DELETE"
    })
      .then(APIManager.getAll)
      .then(goals => {
        this.props.history.push("/goals");
        this.setState({ goals: goals });
      });
  };
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/goals"
          render={props => {
            return (
              <GoalList
                goals={this.state.goals}
                deleteGoal={this.state.deleteGoal}
              />
            );
          }}
        />
        <Route
          exact
          path="/journals"
          render={props => {
            return <JournalList journals={this.state.journals} />;
          }}
        />
      </React.Fragment>
    );
  }
}

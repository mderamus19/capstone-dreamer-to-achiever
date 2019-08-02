import { Route } from "react-router-dom";
import React, { Component } from "react";
import GoalList from "./components/goal/GoalList";
// import StepList from './components/step/StepList'
import JournalList from "./components/journal/JournalList";
import APIManager from "./components/modules/APIManager";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import GoalForm from "./components/goal/GoalForm";
import StepForm from "./components/step/StepForm";
import GoalDetail from "./components/goal/GoalDetail";
import GoalEditForm from "./components/goal/GoalEditForm";

export default class ApplicationViews extends Component {
  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  state = {
    goals: [],
    rewards: [],
    steps: [],
    journals: []
  };

  componentDidMount() {
    const newState = {};

    //fetch data

    fetch("http://localhost:5002/goals")
      .then(r => r.json())
      .then(goals => (newState.goals = goals))

      .then(() => this.setState(newState));
    fetch("http://localhost:5002/rewards")
      .then(r => r.json())
      .then(rewards => (newState.rewards = rewards))

      .then(() => this.setState(newState));
  }

  getUserGoals = () => {
    APIManager.getAll(sessionStorage.getItem("userId")).then(user_goals =>
      this.setState({ goals: user_goals })
    );
  };
  deleteGoal = id => {
    return fetch(`http://localhost:5002/goals/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/goals`))
      .then(e => e.json())
      .then(goals =>
        this.setState({
          goals: goals
        })
      );
  };
    deleteStep = id => {
    return fetch(`http://localhost:5002/steps/${id}`, {
      method: "DELETE"
    })
      .then(APIManager.getAll)
      .then(steps => {
        this.props.history.push("/steps");
        this.setState({ steps: steps });
      });
  };

  addGoal = goal =>
    APIManager.post(goal,"goals")
      .then(() => APIManager.getAll())
      .then(goals =>
        this.setState({
          goals: goals
        })
      );

  addStep = step =>
    APIManager.post(step)
      .then(() => APIManager.getAll())
      .then(steps =>
        this.setState({
          steps: steps
        })
      );

  addReward = reward =>
    APIManager.getAll(reward)
      .then(() => APIManager.getAll())
      .then(rewards =>
        this.setState({
          rewards: rewards
        })
      );
  updateGoal = editedGoalObject => {
    return APIManager.put(editedGoalObject)
      .then(() => APIManager.getAll())
      .then(goals => {
        this.setState({
          goals: goals
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/register"
          render={props => {
            return (
              <Register
                {...props}
                users={this.state.users}
                addNewUser={this.addNewUser}
              />
            );
          }}
        />
        {/* routes for goals */}
        <Route
          exact
          path="/goals"
          render={props => {
            return (
              <GoalList
                {...props}
                goals={this.state.goals}
                deleteGoal={this.deleteGoal}
              />
            );
          }}
        />
        <Route
          exact
          path="/goals/new"
          render={props => {
            return (
              <GoalForm
                {...props}
                addGoal={this.addGoal}
                rewards={this.state.rewards}
                />
            );
          }}
        />
        <Route
          exact
          path="/goals/:goalId(\d+)"
          render={props => {
            // Find the goal with the id of the route parameter
            let goal = this.state.goals.find(
              goal => goal.id === parseInt(props.match.params.goalId)
            );

            // If the goal wasn't found, create a default one
            if (!goal) {
              goal = { id: 404, goal: "Goal not found" };
            }

            return <GoalDetail goal={goal}
            deleteGoal={this.deleteGoal} />;
          }}
        />
        <Route
          path="/goals/:goalId(\d+)/edit"
          render={props => {
            let goal = this.state.goals.find(
              goal => goal.id === parseInt(props.match.params.goalId)
            );
            if (!goal) {
              goal = { id: 404, goal: "Goal not found" };
            }
            return (
              <GoalEditForm
                {...props}
                goal={goal}
                updateGoal={this.updateGoal}
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

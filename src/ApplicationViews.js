import { Route, withRouter } from "react-router-dom"
import React, { Component } from "react"
import GoalList from "./components/goal/GoalList"
// import JournalList from "./components/journal/JournalList";
import APIManager from "./components/modules/APIManager"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import GoalForm from "./components/goal/GoalForm"
import GoalDetail from "./components/goal/GoalDetail"
import GoalEditForm from "./components/goal/GoalEditForm"
import StepEditForm from "./components/step/StepEditForm"
import { promises } from "fs";

class ApplicationViews extends Component {
  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  state = {
    goals: [],
    rewards: [],
    journals: []
  }

  componentDidMount() {
    const newState = {}

    //fetch data
    APIManager.getAllGoals()
      .then(goals => (newState.goals = goals))
      .then(() => console.log(newState))
      .then(() => fetch("http://localhost:5002/rewards"))
      .then(r => r.json())
      .then(rewards => (newState.rewards = rewards))
      .then(() => this.setState(newState))

    // fetch("http://localhost:5002/journals")
    //   .then(r => r.json())
    //   .then(journals => (newState.journals = journals))
    //   .then(() => this.setState(newState));
  }

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
      )
  }
  deleteStep = id => {
    console.log("delete step:")
    return fetch(`http://localhost:5002/steps/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(APIManager.getAllGoals)
      .then(goals => {
        console.log("we got to the end of the function")
        this.setState({ goals: goals })
        this.props.history.push("/goals")
      })
  }
  // array of steps is looping through all steps then for each step it is posting to the
  // database that returns a promise then push all the steps into the Promise Array...an
  // array of promises
  addGoal = (goal, array) => {
    const promiseArr = []
    APIManager.post(goal, "goals").then(res => {
      array.forEach(step => {
        let newStep = {}
        newStep.goalId = res.id
        newStep.step = step.step
        newStep.completed = false
        this.addStep(newStep).then(result => promiseArr.push(result))
      })
    })

    Promise.all(promiseArr)
      .then(() => APIManager.getAllGoals())
      .then(goals => this.setState({ goals: goals }))
      .then(() => this.props.history.push("/goals"))
  }

  addStep = step => APIManager.post(step, "steps")

  addJournalEntry = journalEntry =>
    APIManager.post(journalEntry, "journals")
      .then(() => APIManager.getAll())
      .then(journalEntrys =>
        this.setState({
          journalEntrys: journalEntrys
        })
      )

  addReward = reward =>
    APIManager.getAll(reward)
      .then(() => APIManager.getAll())
      .then(rewards =>
        this.setState({
          rewards: rewards
        })
      )

  updateGoal = editedGoalObject => {
    return APIManager.editGoals(editedGoalObject)
      .then(() => APIManager.getAllGoals())
      .then(goals => {
        this.setState({
          goals: goals
        })
      })
  }

  updateStep = editedStepObject => {
    return APIManager.put(editedStepObject)
      .then(() => APIManager.getAllGoals())
      .then(goals => {
        this.setState({
          goals: goals
        })
      })
  }

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
            )
          }}
        />
        {/* routes for goals */}
        <Route
          exact
          path="/goals"
          //filter the goals to compare the credentials in session storage to the userId in goals
          render={props => {
            let userGoals = this.state.goals.filter(
              goal =>
                parseInt(sessionStorage.getItem("credentials")) === goal.userId
            )
            return (
              <GoalList
                {...props}
                goals={userGoals}
                deleteGoal={this.deleteGoal}
              />
            )
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
            )
          }}
        />
        <Route
          exact
          path="/goals/:goalId(\d+)"
          render={props => {
            console.log(this.state.goals)
            // Find the goal with the id of the route parameter
            let goal = this.state.goals.find(
              oneGoal => oneGoal.id === parseInt(props.match.params.goalId)
            )
            // If the goal wasn't found, create a default one
            if (!goal) {
              goal = { id: 404, goal: "POOF!Goal Deleted" }
            }

            return (
              <GoalDetail goal={goal} deleteStep={this.deleteStep} {...props} />
            )
          }}
        />
        <Route
          path="/goals/:goalId(\d+)/edit"
          render={props => {
            let goal = this.state.goals.find(
              goal => goal.id === parseInt(props.match.params.goalId)
            )
            if (!goal) {
              goal = { id: 404, goal: "Goal not found" }
            }
            return (
              <div>
                <GoalEditForm
                  {...props}
                  goal={goal}
                  updateGoal={this.updateGoal}
                />
              </div>
            )
          }}
        />
        <Route
          exact
          path="/steps/:stepId(\d+)/edit"
          render={props => {
            return <StepEditForm {...props} updateStep={this.updateStep} />
          }}
        />
        {/* <Route
          exact
          path="/journals"
          render={props => {
            return <JournalList journals={this.state.journals} />;
          }} */}
        {/* /> */}
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)

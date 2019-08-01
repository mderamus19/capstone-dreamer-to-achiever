import React, { Component } from "react";
// import GoalCard from "./GoalCard";
// import "./Goal.css"
// import trophy from "./TrophyIcon.svg";


export default class Goal extends Component {

    state = {
        saveDisabled: false
      };

      render() {
        return (
          <section className="goal">
            <div key={this.props.goal.id} className="card">
              <div className="card-body">
                <h4 className="card-title">
                  {/* <img src={trophy} alt="trophy" className="icon--trophy" /> */}
                  {this.props.goal.name}
                </h4>
                <h6 className="card-title">{this.props.goal.goal}</h6>
                <button
                  onClick={() => {
                    this.setState({ saveDisabled: true }, () =>
                      this.props.deleteGoal(this.props.goal.id)
                    );
                  }}
                  disabled={this.state.saveDisabled}
                  className="card-link"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>
        );
      }
    }

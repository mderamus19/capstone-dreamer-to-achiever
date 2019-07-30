import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "../ApplicationViews";
import "bootstrap/dist/css/bootstrap.min.css"
import "./Dream.css";
import Login from "./authentication/Login";

export default class Dream extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Login />
        {/* <ApplicationViews /> */}
      </React.Fragment>
    );
  }
}
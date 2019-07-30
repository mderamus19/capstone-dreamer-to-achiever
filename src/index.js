import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dream from "./components/Dream";
import "./index.css";

ReactDOM.render(
  <Router>
    <Dream />
  </Router>,
  document.getElementById("root")
);

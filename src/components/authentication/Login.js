import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import "./Login.css";
import APIManager from "../modules/APIManager";
import { withRouter } from "react-router-dom";
// import Register from "./Register";
// import { Link } from "react-router-dom";

class Login extends Component {
  // Set initial state
  state = {
    username: "",
    password: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault();

    APIManager.get(this.state.username).then(result => {
      console.log("result", result);
      if (result.length > 0) {
        result.forEach(res => {
        if(this.state.password === res.password){
            sessionStorage.setItem(
                "credentials", res.id
              );

        }
    }
        );

      } else {
        alert("Please Register!");
      }
    });
  };

  render() {
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form onSubmit={this.handleLogin}>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                onChange={this.handleFieldChange}
                type="username"
                name="username"
                id="username"
                placeholder="please enter username"
                required=""
                autoFocus=""
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                onChange={this.handleFieldChange}
                type="password"
                name="password"
                id="password"
                placeholder="********"
                required=""
              />
            </FormGroup>
          </Col>
          <Button type="submit">Sign In</Button>
          <hr />
          <Button onClick={() => this.props.history.push("/register")}>register</Button>
        </Form>
      </Container>
    );
  }
}
export default withRouter(Login);

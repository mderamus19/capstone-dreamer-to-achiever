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
          sessionStorage.setItem("userId", res.id);
        });

        alert("Welcome Dreamer To Achiever!");

        this.props.history.push("/home");
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
              <Input onChange={this.handleFieldChange}
                type="username"
                name="username"
                id="exampleUsername"
                placeholder="please enter username"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input onChange={this.handleFieldChange}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}
export default withRouter(Login)
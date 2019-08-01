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
import "./Register.css";
import APIManager from "../modules/APIManager";
import { withRouter } from "react-router-dom";

class Register extends Component {

    // Set initial state needs to be empty
    state = {
        username: "",
        password: ""
        // existingUser: {}
    }

    addNewUser = (user) =>
        APIManager.post(user,"users")
        .then( newUser => {
        sessionStorage.setItem("credentials", newUser.id)
        alert("You are ready to Achieve!")

      })


    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit; e is event
    saveNewUser = event => {
        event.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.addNewUser(user).then(() => this.props.history.push("/home"))
    }
    render() {
        return (
            <Form className="RegistrationForm">
                <h1 className="h3 mb-3 font-weight-normal">New to Achieving...Please Register</h1>
                <Label htmlFor="inputUsername">
                    Username
                </Label>
                <Input onChange={this.handleFieldChange} type="username"
                       id="username"
                       placeholder="Username"
                       required="" autoFocus="" />
                <Label htmlFor="inputPassword">
                    Password
                </Label>
                <Input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <Button onClick={this.saveNewUser} type="submit">
                   Register
                </Button>
            </Form>
        )
    }
}



export default withRouter(Register)
import React, { Component } from "react";
import ApiUrl from "../../helpers/environment";
import jwt_decode from "jwt-decode";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography
} from "@material-ui/core";
import Header from "../Header";

export default class UserUpdate extends Component {
  decoded = jwt_decode(localStorage.getItem("SessionToken"));

  state = {
    id: this.decoded.id,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordVerify: ""
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fetchUser = () => {
    fetch(`${ApiUrl}/user/${this.state.id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(user =>
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          passwordVerify: user.password
        })
      );
  };

  updateUser = event => {
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let lastName = this.state.lastName;
    let firstName = this.state.firstName;

    let userToUpdate = { user: { email, password, firstName, lastName } };

    fetch(`${ApiUrl}/user/${this.state.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(userToUpdate)
    })
      .then(response => response.json())
      .then(user => {
        window.alert("User profile updated.");
        this.setState({
          password: user.password,
          lastName: user.lastName,
          email: user.email
        });
        window.location.reload();
      });
  };

  passwordVerification = () => {
    if (
      this.state.password === this.state.passwordVerify &&
      this.state.password !== ""
    ) {
      return (
        <Button type="submit" fullWidth variant="contained" color="primary">
          Update Password
        </Button>
      );
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
      <Header />
        <Grid item xs={8}>
          <Typography
            component="h3"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            Need to update your profile?
          </Typography>

          <br />

          <form onSubmit={this.updateUser}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                autoComplete="firstName"
                autoFocus
                onChange={this.handleOnChange}
                type="text"
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                autoComplete="lastName"
                autoFocus
                onChange={this.handleOnChange}
                type="text"
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={this.state.email}
                autoComplete="email"
                autoFocus
                onChange={this.handleOnChange}
                type="email"
              />
            </FormControl>

            <Button fullWidth variant="contained" color="primary" type="submit">
              Update Profile
            </Button>
          </form>
        </Grid>

        <Grid item xs={8}>
          <Typography
            component="h3"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            Need to update your password?
          </Typography>

          <form>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password"> New Password</InputLabel>
              <Input
                id="password"
                name="password"
                value={this.state.password}
                autoComplete="password"
                autoFocus
                onChange={this.handleOnChange}
                type="password"
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="passwordVerify">Verify Password</InputLabel>
              <Input
                id="passwordVerify"
                name="passwordVerify"
                value={this.state.passwordVerify}
                autoComplete="password"
                autoFocus
                onChange={this.handleOnChange}
                type="password"
              />
            </FormControl>

            {this.passwordVerification()}
          </form>
        </Grid>
      </Grid>
    );
  }
}

import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import ApiUrl from "../../helpers/environment";
import { Grid, Typography } from "@material-ui/core";

export default class UserGreeting extends Component {
  decoded = jwt_decode(localStorage.getItem("SessionToken"));

  state = {
    id: this.decoded.id,
    firstName: "",
    lastName: "",
    updatedAt: ""
  };

  fetchUser = () => {
    fetch(`${ApiUrl}/user/${this.state.id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(user =>
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName
        })
      );
  };

  returnLastUpdate = () => {
    if (localStorage.getItem("SessionToken")) {
      fetch(`${ApiUrl}/cigar/all`, {
        method: "GET",
        headers: new Headers({
          Authorization: localStorage.getItem("SessionToken")
        })
      })
        .then(response => response.json())
        .then(cigars => {
          let updatedAt = cigars[cigars.length - 1].updatedAt;

          this.setState({
            updatedAt
          });
        });

      return (
        <Typography
          component="h5"
          variant="h5"
          color="secondary"
          className="marginTop centered"
        >
          {this.state.updatedAt}
        </Typography>
      );
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <Grid item xs={8}>
          <Typography
            component="h3"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            Welcome back {this.state.firstName} {this.state.lastName}!
          </Typography>

          <Typography
            component="h5"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            We are pleased to see you. Don't forget to keep your cigars updated.
          </Typography>

          <br />
          <br />
          <br />

          <Typography
            component="h5"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            Your last update was:
          </Typography>

          {this.returnLastUpdate()}
        </Grid>
      </Grid>
    );
  }
}

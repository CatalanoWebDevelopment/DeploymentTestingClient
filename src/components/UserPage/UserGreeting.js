import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import ApiUrl from "../../helpers/environment";
import { Grid, Typography } from "@material-ui/core";

export default class UserGreeting extends Component {
  state = {
    id: this.decoded.id,
    firstName: "",
    lastName: ""
  };

  fetchUser = () => {
    fetch(`${ApiUrl}/user/${this.state.id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(user => console.log(user));
  };

  componentDidMount() {
    decoded = jwt_decode(localStorage.getItem("SessionToken"));
    
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
            Welcome back!
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

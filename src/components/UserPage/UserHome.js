import React, { Component } from "react";
import "../Styles.css";
import Grid from "@material-ui/core/Grid";
import Login from "./UserLogin";
import Register from "./UserRegister";
import Greeting from "./UserGreeting";
import Header from "../Header";

export default class UserHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      isGreetingOpen: false
    };
  }

  renderLogin = () => {
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false,
      isGreetingOpen: false
    });
  };

  renderRegister = () => {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true,
      isGreetingOpen: false
    });
  };

  renderGreeting = () => {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: false,
      isGreetingOpen: true
    });
  };

  resetUserHome = () => {
    if (!localStorage.getItem("SessionToken")) {
      this.setState({
        isLoginOpen: true,
        isRegisterOpen: false,
        isGreetingOpen: false
      });
    }
    
  };

  componentDidMount() {
    this.resetUserHome();
  }

  render() {
    return (
      <Grid container spacing={8}>
        <Header />
        <Grid item xs={12}>
          {this.state.isLoginOpen === true && (
            <Login
              renderRegister={this.renderRegister}
              renderLinks={this.props.renderLinks}
              renderGreeting={this.renderGreeting}
            />
          )}

          {this.state.isRegisterOpen === true && (
            <Register
              renderLogin={this.renderLogin}
              renderLinks={this.props.renderLinks}
              renderGreeting={this.renderGreeting}
            />
          )}

          {this.state.isGreetingOpen === true && <Greeting />}
        </Grid>
      </Grid>
    );
  }
}

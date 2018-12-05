import React, { Component } from "react";
import UserHome from "./UserPage/UserHome";
import CigarHome from "./CigarPage/CigarHome";
import { Tab, AppBar, Toolbar, Typography } from "@material-ui/core";
import "./Styles.css";

import { Route, Link, Switch } from "react-router-dom";

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      showNavigation: false
    };
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      showNavigation: false
    });
  };

  renderNavigationOnLogin = () => {
    if (
      localStorage.getItem("SessionToken") === undefined ||
      !localStorage.getItem("SessionToken")
    ) {
      return;
    }
    this.setState({
      showNavigation: true
    });
  };

  componentDidMount() {
    this.renderNavigationOnLogin();
  }

  renderLinks() {
    if (this.state.showNavigation) {
      return (
        <React.Fragment>
          <Typography variant="h6" color="inherit" className="root">
            <Link to="/add_cigars">
              <Tab label="Add a Cigar" className="white" />
            </Link>
          </Typography>

          <Typography variant="h6" color="inherit" className="root">
            <Link to="/">
              <Tab label="Logout" className="white" onClick={this.logout} />
            </Link>
          </Typography>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="root">
        <AppBar position="static" className="centered">
          <Toolbar>
            <Typography variant="h6" color="inherit" className="root">
              <Link to="/">
                <Tab label="Home" className="white" />
              </Link>
            </Typography>

            {this.renderLinks()}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <UserHome renderLinks={this.renderNavigationOnLogin} />
          </Route>

          <Route exact path="/add_cigars">
            <CigarHome />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Sidebar;

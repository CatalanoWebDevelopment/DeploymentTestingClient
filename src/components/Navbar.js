import React, { Component } from "react";
import UserHome from "./UserPage/UserHome";
import CigarHome from "./CigarPage/CigarHome";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import "./Styles.css";

import { Route, Link, Switch } from "react-router-dom";

const ListItem = styled.li`
  list-style: none;
  padding: 3px;
  display: inline-block;
`;

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
    if (!localStorage.getItem("SessionToken")) {
      return;
    }

    this.setState({
      showNavigation: true
    });
  };

  renderLinks() {
    if (this.state.showNavigation) {
      return (
        <React.Fragment>
          <ListItem>
            <Link to="/cigars">
              <Tab label="Cigars" className="largeFont" />
            </Link>
          </ListItem>
          <ListItem>
            <Tab label="Logout" className="largeFont" onClick={this.logout} />
          </ListItem>
        </React.Fragment>
      );
    }
  }

  componentDidMount() {
    this.renderNavigationOnLogin();
  }

  render() {
    return (
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ul className="centered">
              <ListItem>
                <Link to="/">
                  <Tab label="Home" className="largeFont" />
                </Link>
              </ListItem>
              {this.renderLinks()}
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Switch>
              <Route exact path="/">
                <UserHome renderLinks={this.renderNavigationOnLogin} />
              </Route>
              <Route exact path="/cigars">
                <CigarHome />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Sidebar;

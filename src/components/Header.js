import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  toolBar: {
    margin: "0 auto"
  }
});

export default class Header extends Component {
  renderHeader = () => {
    if (localStorage.getItem("SessionToken")) {
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar
            position="relative"
            color="secondary"
          >
            <Toolbar className="centered">
              <Typography variant="h6" color="inherit" noWrap>
                The Cigar App
              </Typography>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="absolute" color="secondary">
            <Toolbar className="centered">
              <Typography variant="h6" color="inherit" noWrap>
                The Cigar App
              </Typography>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );
    }
  };

  componentDidMount() {
    this.renderHeader();
  }

  render() {
    const { classes } = this.props;

    return (
        <React.Fragment>
            {this.renderHeader()}
        </React.Fragment>
    );
  }
}

// export default withStyles(styles)(Header);

import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Theme from "./styles/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Router>
            <Navbar />
          </Router>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;

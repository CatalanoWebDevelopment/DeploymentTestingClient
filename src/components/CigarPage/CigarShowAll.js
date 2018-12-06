import React, { Component } from "react";
import {
  Button,
  Typography,
  Grid,
  CssBaseline,
  Table,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ApiUrl from "../../helpers/environment";
import Header from "../Header";

export default class CigarShowAll extends Component {
  constructor() {
    super();

    this.state = {
      cigars: []
    };
  }

  CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  getAllCigars = () => {
    fetch(`${ApiUrl}/cigar/all`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("SessionToken")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          cigars: response
        });
      });
      console.log(this.state.cigars)
  };

  printAllCigars = () => {
    let cigars = this.state.cigars;
    console.log(cigars)
    cigars.map((cigar, index) => {
      return (
        <React.Fragment key={index}>
          <TableCell>{this.state.name}</TableCell>

          <TableCell numeric>{cigar.ringGauge}</TableCell>

          <TableCell numeric>{cigar.length}</TableCell>

          <TableCell>{cigar.strength}</TableCell>

          <TableCell>{cigar.wrapperColor}</TableCell>
        </React.Fragment>
      );
    });
  };

  componentWillMount() {
    this.getAllCigars();
  }

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <Header />
        <CssBaseline />

        <Grid item xs={10} className="centered">
          <Typography
            component="h3"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            Your Cigars
          </Typography>

          <br />

          <Table>
            <TableHead>
              <TableRow>
                <this.CustomTableCell>Name</this.CustomTableCell>

                <this.CustomTableCell>
                  Ring Gauge (1/64th inch)
                </this.CustomTableCell>

                <this.CustomTableCell>Length (inches)</this.CustomTableCell>

                <this.CustomTableCell>Strength</this.CustomTableCell>

                <this.CustomTableCell>Wrapper</this.CustomTableCell>
              </TableRow>
            </TableHead>
            {/* {this.printAllCigars()} */}
          </Table>
        </Grid>
      </Grid>
    );
  }
}

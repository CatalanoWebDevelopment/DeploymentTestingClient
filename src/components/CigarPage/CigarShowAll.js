import React, { Component } from "react";
import {
  Button,
  Typography,
  Grid,
  CssBaseline,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ApiUrl from "../../helpers/environment";
import Header from "../Header";
import jwt_decode from "jwt-decode";
import CigarUpdate from "./CigarUpdate";
import CigarShow from "./CigarShow";

export default class CigarShowAll extends Component {
  constructor() {
    super();

    this.state = {
      cigars: [],
      openModal: false
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
    let decoded = jwt_decode(localStorage.getItem("SessionToken"));

    fetch(`${ApiUrl}/cigar/all/${decoded.id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("SessionToken")
      }
    })
      .then(response => response.json())
      .then(cigars => {
        this.setState({
          cigars
        });
      });
  };

  printAllCigars = () => {
    let cigars = this.state.cigars;
    return cigars.map((cigar, index) => {
      console.log("CIGARS TO MAP", cigar);
      return (
        <TableBody key={index}>
          {/* <TableCell>{cigar.name}</TableCell>

          <TableCell numeric>{cigar.ringGauge}</TableCell>

          <TableCell numeric>{cigar.length}</TableCell>

          <TableCell>{cigar.strength}</TableCell>

          <TableCell>{cigar.wrapperColor}</TableCell> */}

          <CigarShow cigar={cigar} />
        </TableBody>
      );
    });
  };

  toggleModal = event => {
      event.preventDefault();
      if (this.state.openModal === false) {
          this.setState({
              openModal: true
          })
      } else {
          this.setState({
              openModal: false
          })
      }
  }

  componentDidMount() {
    this.getAllCigars();
  }

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <Header />
        <CssBaseline />

        {/* <Grid item xs={10} className="centered">
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
            </TableHead> */}
            {this.printAllCigars()}
          {/* </Table> */}
        {/* </Grid> */}
      </Grid>
    );
  }
}

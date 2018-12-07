import React, { Component } from "react";
import { Grid, CssBaseline, TableCell, TableBody } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ApiUrl from "../../helpers/environment";
import Header from "../Header";
import jwt_decode from "jwt-decode";
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
      return (
        <TableBody key={index}>
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
      });
    } else {
      this.setState({
        openModal: false
      });
    }
  };

  componentDidMount() {
    this.getAllCigars();
  }

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <Header />
        <CssBaseline />
        {this.printAllCigars()}
      </Grid>
    );
  }
}

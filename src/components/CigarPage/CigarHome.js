import React, { Component } from "react";
import ApiUrl from "../../helpers/environment";
import jwt_decode from "jwt-decode";
import {
  Grid,
  CssBaseline,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography
} from "@material-ui/core";

import CigarShow from "./CigarShow";
import Header from "../Header";

export default class CigarHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ringGauge: "",
      length: "",
      strength: "",
      wrapperColor: "",
      renderShow: false,
      createdCigar: {}
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCigarCreation = event => {
    event.preventDefault();
    let decoded = jwt_decode(localStorage.getItem("SessionToken"));

    let userId = decoded.id;
    let name = this.state.name;
    let ringGauge = this.state.ringGauge;
    let length = this.state.length;
    let strength = this.state.strength;
    let wrapperColor = this.state.wrapperColor;
    let newCigar = {
      cigar: { name, ringGauge, length, strength, wrapperColor, userId }
    };

    fetch(`${ApiUrl}/cigar/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("SessionToken")
      },
      body: JSON.stringify(newCigar)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          createdCigar: response,
          renderShow: true
        });
      });
  };

  renderShowPage = () => {
    if (!this.state.renderShow === false) {
      return <CigarShow cigar={this.state.createdCigar} />;
    }
  };

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <Header />
        <CssBaseline />
        <Grid item xs={6}>
          <Typography
            component="h3"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            Want to Add a Cigar to Your Collection?
          </Typography>
          <form onSubmit={this.handleCigarCreation}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name of Cigar</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={this.handleOnChange}
                type="text"
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="ringGauge">Ring Gauge</InputLabel>
              <Input
                id="ringGauge"
                name="ringGauge"
                autoComplete="ringGauge"
                autoFocus
                onChange={this.handleOnChange}
                type="number"
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="length">Cigar Length</InputLabel>
              <Input
                id="length"
                name="length"
                autoComplete="length"
                autoFocus
                onChange={this.handleOnChange}
                type="number"
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="strength">Cigar Strength</InputLabel>
              <Input
                id="strength"
                name="strength"
                autoComplete="strength"
                autoFocus
                onChange={this.handleOnChange}
                type="text"
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="wrapperColor">Wrapper Color</InputLabel>
              <Input
                id="wrapperColor"
                name="wrapperColor"
                autoComplete="wrapperColor"
                autoFocus
                onChange={this.handleOnChange}
                type="text"
              />
            </FormControl>

            <Button fullWidth variant="contained" color="primary" type="submit">
              Create Cigar
            </Button>
          </form>
        </Grid>

        <Grid item xs={8} className="centered">
          {this.renderShowPage()}
        </Grid>
      </Grid>
    );
  }
}

import React, { Component } from "react";
import ApiUrl from "../../helpers/environment";
import {
  Grid,
  CssBaseline,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography
} from "@material-ui/core";

export default class CigarHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ringGauge: "",
      length: "",
      strength: "",
      wrapperColor: ""
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCigarCreation = event => {
    event.preventDefault();
    let name = this.state.name;
    let ringGauge = this.state.ringGauge;
    let length = this.state.length;
    let strength = this.state.strength;
    let wrapperColor = this.state.wrapperColor;
    let newCigar = {
      cigar: { name, ringGauge, length, strength, wrapperColor }
    };

    fetch(`${ApiUrl}/cigar/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("SessionToken")
      },
      body: JSON.stringify(newCigar)
    })
      .then(response => response.json())
      .then(response => {
        let displayData = document.getElementById("displayData");
        let p = document.createElement("p");

        while (displayData.firstChild) {
          displayData.removeChild(displayData.firstChild);
        }

        p.innerHTML = `<h1>Your Created Cigar Result:</h1><p>Name: ${
          response.name
        }</p><p>Ring Gauge: ${response.ringGauge}</p><p>Length: ${
          response.length
        }</p><p>Wrapper Color: ${response.wrapperColor}</p><p>Strength: ${
          response.strength
        }</p>`;

        return displayData.appendChild(p);
      });
  };

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <CssBaseline />
        <Grid item xs={6}>
          <Typography component="h3" variant="h4" color="secondary" className="marginTop centered">
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

        <Grid item xs={12} className="centered">
          <div id="displayData" />
        </Grid>
      </Grid>
    );
  }
}

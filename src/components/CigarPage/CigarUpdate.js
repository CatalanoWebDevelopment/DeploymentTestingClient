import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import ApiUrl from "../../helpers/environment";

export default class CigarUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      name: this.props.cigar.name,
      ringGauge: this.props.cigar.ringGauge,
      length: this.props.cigar.length,
      strength: this.props.cigar.strength,
      wrapperColor: this.props.cigar.wrapperColor
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  updateCigar = event => {
    event.preventDefault();
    let name = this.state.name;
    let ringGauge = this.state.ringGauge;
    let length = this.state.length;
    let strength = this.state.strength;
    let wrapperColor = this.state.wrapperColor;
    let cigarForUpdate = {
      cigar: { name, ringGauge, length, strength, wrapperColor }
    };

    fetch(`${ApiUrl}/cigar/${this.props.cigar.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("SessionToken")
      }),
      body: JSON.stringify(cigarForUpdate)
    })
      .then(response => response.json())
      .then(response => {
        this.props.toggleModal();
        window.alert(`${this.state.name} has been updated!`);
        this.props.updatedCigarState(this.state.name, this.state.ringGauge, this.state.length, this.state.strength, this.state.wrapperColor)
      });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <form onSubmit={this.updateCigar}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name of Cigar</InputLabel>
              <Input
                id="name"
                name="name"
                value={this.state.name}
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
                value={this.state.ringGauge}
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
                value={this.state.length}
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
                value={this.state.strength}
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
                value={this.state.wrapperColor}
                autoComplete="wrapperColor"
                autoFocus
                onChange={this.handleOnChange}
                type="text"
              />
            </FormControl>

            <Button fullWidth variant="contained" color="primary" type="submit">
              Update
            </Button>
          </form>
        </Modal>
      </div>
    );
  }
}

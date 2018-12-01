import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

export default class CigarUpdate extends Component {
  state = {
    open: true,
    name: "",
    ringGauge: "",
    length: "",
    strength: "",
    wrapperColor: ""
  };

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

  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name of Cigar</InputLabel>
              <Input
                id="name"
                name="name"
                value={this.props.cigar.name}
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
                value={this.props.cigar.ringGauge}
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
                value={this.props.cigar.length}
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
                value={this.props.cigar.strength}
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
                value={this.props.cigar.wrapperColor}
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

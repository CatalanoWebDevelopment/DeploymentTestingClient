import React, { Component } from "react";
import CigarUpdate from "./CigarUpdate";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import ApiUrl from "../../helpers/environment";

export default class CigarShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderModal: false,
      name: this.props.cigar.name,
      ringGauge: this.props.cigar.ringGauge,
      length: this.props.cigar.length,
      strength: this.props.cigar.strength,
      wrapperColor: this.props.cigar.wrapperColor,
      id: this.props.cigar.id
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

  toggleUpdateModal = event => {
    if (this.state.renderModal) {
      this.setState({
        renderModal: false
      });
    } else {
      this.setState({
        renderModal: true
      });
    }
  };

  showUpdateModal = () => {
    if (this.state.renderModal) {
      return (
        <CigarUpdate
          cigar={this.state}
          toggleModal={this.toggleUpdateModal}
          updatedCigarState={this.updateCigarState}
        />
      );
    }
  };

  deleteCigar = event => {
    event.preventDefault();
    fetch(`${ApiUrl}/cigar/${this.state.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("SessionToken")
      }
    })
      .then(response => response.json())
      .then(response => {
        window.alert("Your cigar has been deleted.");
        window.location.reload();
      });
  };

  updateCigarState = (name, ringGauge, length, strength, wrapperColor) => {
    this.setState({
      name: name,
      ringGauge: ringGauge,
      length: length,
      strength: strength,
      wrapperColor: wrapperColor
    });
  };

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <CssBaseline />
        <Grid item={8}>
          <Typography
            component="h3"
            variant="h5"
            color="secondary"
            className="marginTop centered"
          >
            {this.state.name}
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

                <this.CustomTableCell>Edit?</this.CustomTableCell>

                <this.CustomTableCell>Delete?</this.CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>{this.state.name}</TableCell>

              <TableCell numeric>{this.state.ringGauge}</TableCell>

              <TableCell numeric>{this.state.length}</TableCell>

              <TableCell>{this.state.strength}</TableCell>

              <TableCell>{this.state.wrapperColor}</TableCell>

              <TableCell>
                <i class="material-icons hover primary" onClick={this.toggleUpdateModal}>edit</i>
              </TableCell>

              <TableCell>
                <DeleteIcon
                  variant="contained"
                  color="primary"
                  onClick={this.deleteCigar}
                  className="hover"
                />
              </TableCell>
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={8}>
          {this.showUpdateModal()}
        </Grid>
      </Grid>
    );
  }
}

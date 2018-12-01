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
  TableCell
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export default class CigarShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderModal: false
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
    event.preventDefault();

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
      return <CigarUpdate cigar={this.props.cigar} toggleModal={this.toggleUpdateModal} />;
    }
  };

  render() {
    return (
      <Grid container spacing={32} justify="space-evenly">
        <CssBaseline />
        <Grid item={8}>
          <Typography
            component="h3"
            variant="h4"
            color="secondary"
            className="marginTop centered"
          >
            Your New {this.props.cigar.name}
          </Typography>

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
            <TableCell>{this.props.cigar.name}</TableCell>

            <TableCell numeric>{this.props.cigar.ringGauge}</TableCell>

            <TableCell numeric>{this.props.cigar.length}</TableCell>

            <TableCell>{this.props.cigar.strength}</TableCell>

            <TableCell>{this.props.cigar.wrapperColor}</TableCell>
          </Table>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.toggleUpdateModal}
          >
            Edit
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary">
            Delete
          </Button>
        </Grid>

        <Grid item xs={8}>
            {this.showUpdateModal()}
        </Grid>
      </Grid>
    );
  }
}

import React, { Component } from "react";
import CigarUpdate from "./CigarUpdate";
import { Button } from "@material-ui/core";

export default class CigarShow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renderModal: false
        }
    }

    renderUpdateModal = event => {
        event.preventDefault();
        if (this.state.renderModal === false) {
          this.setState({
            renderModal: true
          });
    
          if (this.state.renderModal === true) {
            return <CigarUpdate cigar={this.state.createdCigar} />;
          }
        } else {
          this.setState({
            renderModal: false
          });
        }
      };

    render() {
        return (
            <div>
                {this.props.cigar.name}
                <Button onClick={this.renderUpdateModal}>
                    Edit
                </Button>
            </div>
        )
    }
}
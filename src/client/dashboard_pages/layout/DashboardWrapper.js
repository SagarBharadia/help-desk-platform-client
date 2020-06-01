import React, { Component } from "react";
import DashboardAppBar from "./DashboardAppBar";
import PropTypes from "prop-types";
import { Container, Button } from "@material-ui/core";

class DashboardWrapper extends Component {
  render() {
    const { location } = { ...this.props };
    const { searchModalVisible } = { ...this.state };
    return (
      <div>
        <DashboardAppBar location={location} />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}

DashboardWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DashboardWrapper;

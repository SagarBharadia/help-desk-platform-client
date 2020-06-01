import React, { Component } from "react";
import Cookies from "js-cookie";

import { Redirect } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

class Guarded extends Component {
  render() {
    return (
      <div>
        {this.props.authenticated ? <this.props.page {...this.props} /> : ""}
      </div>
    );
  }
}

export default Guarded;

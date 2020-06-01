import React, { Component } from "react";

import Login from "../dashboard_pages/Login";

class Guarded extends Component {
  render() {
    return (
      <div>
        {this.props.authenticated ? (
          <this.props.page {...this.props} />
        ) : (
          <Login {...this.props} />
        )}
      </div>
    );
  }
}

export default Guarded;

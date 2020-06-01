import React, { Component } from "react";
import DashboardWrapper from "./layout/DashboardWrapper";

class Dashboard extends Component {
  render() {
    return (
      <DashboardWrapper {...this.props}>
        <main>
          <p>Welcome to the Help Desk Super client.</p>
        </main>
      </DashboardWrapper>
    );
  }
}

export default Dashboard;

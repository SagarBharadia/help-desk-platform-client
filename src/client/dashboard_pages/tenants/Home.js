import React, { Component } from "react";
import { Link } from "react-router-dom";

import TenantsTable from "./components/TenantsTable";
import {
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Box,
  Button,
} from "@material-ui/core";

import Endpoints from "../../Endpoints";

import DashboardWrapper from "../layout/DashboardWrapper";
import Messages from "../layout/Messages";

class Home extends Component {
  state = {
    pageErrors: [],
    pageMessages: [],
  };

  setPageErrors = (pageErrors) => {
    this.setState({ pageErrors: pageErrors });
  };

  componentDidMount() {
    const getParams = new URLSearchParams(this.props.location.search);

    if (getParams.get("deleted") === "success") {
      const pageMessages = [
        ...this.state.pageMessages,
        { severity: "success", text: "Deleted role successfully." },
      ];
      this.setState({ pageMessages: pageMessages });
    }
  }

  render() {
    const { pageErrors, pageMessages } = { ...this.state };

    return (
      <DashboardWrapper {...this.props}>
        <main>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="standard-margin-bottom"
          >
            <MuiLink
              component={Link}
              to={Endpoints.get("client", "dashboard")}
              color="inherit"
            >
              Home
            </MuiLink>
            <Typography color="textPrimary">Roles</Typography>
          </Breadcrumbs>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            className="standard-margin-bottom"
          >
            <Typography component="h1" variant="h4">
              Tenants
            </Typography>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              style={{ marginLeft: "20px" }}
              to={Endpoints.get("client", "createTenant")}
            >
              Create Role
            </Button>
          </Box>
          <Messages pageErrors={pageErrors} pageMessages={pageMessages} />
          <TenantsTable
            pageErrors={pageErrors}
            setPageErrors={this.setPageErrors}
          />
        </main>
      </DashboardWrapper>
    );
  }
}

export default Home;

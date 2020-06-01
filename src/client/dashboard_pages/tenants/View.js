import React, { Component } from "react";
import DashboardWrapper from "../layout/DashboardWrapper";
import axios from "axios";
import { getBaseHeaders } from "../../Helpers";

import Endpoints from "../../Endpoints";

import { Link } from "react-router-dom";
import AppConfig from "../../AppConfig";

import {
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";

import Messages from "../layout/Messages";

class View extends Component {
  tenant_id = this.props.match.params.id;
  state = {
    tenant: {
      company_name: "",
      company_database_name: "",
      company_url_subdirectory: "",
      created_at: "",
      createdBy: {
        name: "",
        email_address: "",
      },
      master: {
        name: "",
        email_address: "",
      },
    },
    pageMessages: [],
    pageErrors: [],
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getTenant();
  }

  getTenant = () => {
    const headers = getBaseHeaders();
    const getTenantEndpoint = Endpoints.get("api", "getSingleTenant", {
      id: this.tenant_id,
    });
    axios
      .get(getTenantEndpoint, headers)
      .then((res) => {
        this.setState({
          tenant: {
            company_name: res.data.tenant.company_name,
            company_database_name: res.data.tenant.company_database_name,
            company_url_subdirectory: res.data.tenant.company_url_subdirectory,
            created_at: res.data.tenant.created_at,
            createdBy: {
              name:
                res.data.tenant.created_by.first_name +
                " " +
                res.data.tenant.created_by.second_name,
              email_address: res.data.tenant.created_by.email_address,
            },
            master: {
              name:
                res.data.master.first_name + " " + res.data.master.second_name,
              email_address: res.data.master.email_address,
            },
          },
        });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            const pageErrors = [
              ...this.state.pageErrors,
              "Unauthorized to view tenant.",
            ];
            this.setState({
              pageErrors: pageErrors,
            });
          } else if (error.response.status === 404) {
            const pageErrors = [
              ...this.state.pageErrors,
              "This tenant doesn't exist.",
            ];
            this.setState({
              pageErrors: pageErrors,
            });
          }
        }
      });
  };

  changeTenantSecret = () => {
    const headers = getBaseHeaders();
    const changeSecret = Endpoints.get("api", "changeTenantSecret", {
      id: this.tenant_id,
    });
    axios
      .get(changeSecret, headers)
      .then((res) => {
        this.setState({
          pageMessages: [
            {
              text: res.data.message,
              severity: "success",
            },
          ],
        });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            const pageErrors = [
              ...this.state.pageErrors,
              "Unauthorized to change tenant secret.",
            ];
            this.setState({
              pageErrors: pageErrors,
            });
          } else if (error.response.status === 404) {
            const pageErrors = [
              ...this.state.pageErrors,
              "This tenant doesn't exist.",
            ];
            this.setState({
              pageErrors: pageErrors,
            });
          }
        }
      });
  };

  render() {
    const { pageMessages, pageErrors, tenant } = {
      ...this.state,
    };
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
            <MuiLink
              component={Link}
              to={Endpoints.get("client", "tenantsArea")}
              color="inherit"
            >
              Tenants
            </MuiLink>
            <Typography color="textPrimary">{tenant.company_name}</Typography>
          </Breadcrumbs>
          <Typography
            component="h1"
            variant="h4"
            className="standard-margin-bottom"
          >
            {tenant.company_name}
          </Typography>
          <Divider className="standard-margin-bottom" />
          <Messages pageMessages={pageMessages} pageErrors={pageErrors} />
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flexDirection="column"
              className="xs-full-width md-half-width standard-margin-bottom"
            >
              <Typography variant="h6" component="h2">
                Database Name:
              </Typography>
              <Typography component="p">
                {tenant.company_database_name}
              </Typography>
              <br />
              <Typography variant="h6" component="h2">
                Portal Link
              </Typography>
              <a
                target="_blank"
                href={
                  AppConfig.TENANT_CLIENT_URL + tenant.company_url_subdirectory
                }
                rel="noopener noreferrer"
              >
                {AppConfig.TENANT_CLIENT_URL + tenant.company_url_subdirectory}
              </a>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="xs-full-width md-half-width standard-margin-bottom"
            >
              <Typography variant="h6" component="h2">
                Created At
              </Typography>
              <Typography component="p">{tenant.created_at}</Typography>
              <br />
              <Typography variant="h6" component="h2">
                Created By
              </Typography>
              <Typography component="p">
                {tenant.createdBy.name}&nbsp;({tenant.createdBy.email_address})
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="xs-full-width md-half-width standard-margin-bottom"
            >
              <Typography variant="h6" component="h2">
                Master Account Information
              </Typography>
              <Typography component="p">{tenant.master.name}</Typography>
              <Typography component="p">
                {tenant.master.email_address}
              </Typography>
              <br />
            </Box>
          </Box>
          <Button
            className="xs-full-width standard-margin-bottom"
            type="button"
            variant="contained"
            color="primary"
            onClick={this.changeTenantSecret}
          >
            Change Secret
          </Button>
        </main>
      </DashboardWrapper>
    );
  }
}

export default View;

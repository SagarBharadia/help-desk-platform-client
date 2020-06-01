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

import { Alert } from "@material-ui/lab";
import Cookies from "js-cookie";

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
    showLinkToTenantDashboard: false,
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
    this.resetErrors();
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
          const pageErrors = [error.response.data.message];
          this.setState({
            pageErrors: pageErrors,
          });
        }
      });
  };

  resetErrors = () => {
    this.setState({
      pageErrors: [],
      pageMessages: [],
    });
  };

  changeTenantSecret = () => {
    const headers = getBaseHeaders();
    const changeSecret = Endpoints.get("api", "changeTenantSecret", {
      id: this.tenant_id,
    });
    this.resetErrors();
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
          const pageErrors = [error.response.data.message];
          this.setState({
            pageErrors: pageErrors,
          });
        }
      });
  };

  manageTenant = () => {
    const headers = getBaseHeaders();
    const manageTenantEndpoint = Endpoints.get("api", "manageTenant", {
      id: this.tenant_id,
    });
    this.resetErrors();
    axios
      .get(manageTenantEndpoint, headers)
      .then((res) => {
        Cookies.set("token-type", res.data.token_type, {
          expires: res.data.expires_in / 1440,
        });
        Cookies.set("token", res.data.token, {
          expires: res.data.expires_in / 1440,
        });
        Cookies.set("auth-company-subdir", res.data.company_subdir, {
          expires: res.data.expires_in / 1440,
        });
        Cookies.set("auth-company-name", res.data.company_name, {
          expires: res.data.expires_in / 1440,
        });
        Cookies.set("user-name", res.data.user_name, {
          expires: res.data.expires_in / 1440,
        });
        this.setState({
          showLinkToTenantDashboard: true,
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
          const pageErrors = [error.response.data.message];
          this.setState({
            pageErrors: pageErrors,
          });
        }
      });
  };

  render() {
    const { pageMessages, pageErrors, tenant, showLinkToTenantDashboard } = {
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
          {showLinkToTenantDashboard ? (
            <Alert
              key={"showLinktoTenantDashboard-1"}
              variant="filled"
              severity="success"
              className="standard-margin-bottom"
            >
              <a
                style={{ color: "#fff" }}
                href={AppConfig.TENANT_CLIENT_URL + "mycompany/dashboard"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here to go to tenant dashboard
              </a>
            </Alert>
          ) : null}
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
          <Button
            className="xs-full-width standard-margin-bottom"
            type="button"
            variant="contained"
            color="secondary"
            onClick={this.manageTenant}
          >
            Manage Tenant
          </Button>
        </main>
      </DashboardWrapper>
    );
  }
}

export default View;

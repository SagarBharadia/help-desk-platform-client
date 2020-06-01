import React, { Component } from "react";
import DashboardWrapper from "../layout/DashboardWrapper";
import axios from "axios";
import { getBaseHeaders } from "../../Helpers";

import Endpoints from "../../Endpoints";
import { Link } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  TextField,
  Divider,
  Button,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import Messages from "../layout/Messages";

class Create extends Component {
  state = {
    company_name: "",
    company_url_subdirectory: "",
    first_name: "",
    second_name: "",
    email_address: "",
    password: "",
    password_confirmation: "",
    errors: {
      company_name: [],
      company_url_subdirectory: [],
      first_name: [],
      second_name: [],
      email_address: [],
      password: [],
    },
    pageMessages: [],
    pageErrors: [],
  };

  resetErrors = () => {
    this.setState({
      pageErrors: [],
      pageMessages: [],
      errors: {
        company_name: [],
        company_url_subdirectory: [],
        first_name: [],
        second_name: [],
        email_address: [],
        password: [],
      },
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createTenant = (e) => {
    e.preventDefault();
    const headers = getBaseHeaders();
    const createTenantEndpoint = Endpoints.get("api", "createTenant");
    const data = {
      company_name: this.state.company_name,
      company_url_subdirectory: this.state.company_url_subdirectory,
      first_name: this.state.first_name,
      second_name: this.state.second_name,
      email_address: this.state.email_address,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    this.resetErrors();
    axios
      .post(createTenantEndpoint, data, headers)
      .then((res) => {
        this.setState({
          company_name: "",
          company_url_subdirectory: "",
          first_name: "",
          second_name: "",
          email_address: "",
          password: "",
          password_confirmation: "",
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
          if (error.response.status === 422) {
            var newErrorsState = { ...this.state.errors };
            const errorData = error.response.data;
            if (errorData.company_name)
              newErrorsState.company_name = errorData.company_name;
            if (errorData.company_url_subdirectory)
              newErrorsState.company_url_subdirectory =
                errorData.company_url_subdirectory;
            if (errorData.first_name)
              newErrorsState.first_name = errorData.first_name;
            if (errorData.second_name)
              newErrorsState.second_name = errorData.second_name;
            if (errorData.email_address)
              newErrorsState.email_address = errorData.email_address;
            if (errorData.password)
              newErrorsState.password = errorData.password;
            this.setState({
              errors: newErrorsState,
            });
          } else if (error.response.status === 401) {
            const pageErrors = [
              ...this.state.pageErrors,
              "Unauthorized to create tenants. Please contact your admin for this permission.",
            ];
            this.setState({ pageErrors: pageErrors });
          }
        }
      });
  };

  render() {
    const {
      pageMessages,
      pageErrors,
      errors,
      company_name,
      company_url_subdirectory,
      first_name,
      second_name,
      email_address,
      password,
      password_confirmation,
    } = {
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
            <Typography color="textPrimary">Create Tenant</Typography>
          </Breadcrumbs>
          <Typography
            component="h1"
            variant="h4"
            className="standard-margin-bottom"
          >
            Create Tenant
          </Typography>
          <Divider className="standard-margin-bottom" />
          <Messages pageErrors={pageErrors} pageMessages={pageMessages} />
          <form className="xs-full-width" onSubmit={this.createTenant}>
            <Box
              display="flex"
              flexDirection="column"
              className="xs-full-width standard-margin-bottom"
            >
              <Typography component="h3" variant="h5">
                Tenant Details
              </Typography>
              {errors.company_name.map((error, index) => (
                <Alert
                  variant="filled"
                  severity="error"
                  className="standard-margin-bottom"
                  key={"company_name-" + index}
                >
                  {error}
                </Alert>
              ))}
              <TextField
                name="company_name"
                type="string"
                label="Company Name"
                onChange={this.onChange}
                value={company_name}
                className="xs-full-width standard-margin-bottom"
                error={errors.company_name.length > 0 ? true : false}
                required
              />
              {errors.company_url_subdirectory.map((error, index) => (
                <Alert
                  variant="filled"
                  severity="error"
                  className="standard-margin-bottom"
                  key={"company_url_subdirectory-" + index}
                >
                  {error}
                </Alert>
              ))}
              <TextField
                name="company_url_subdirectory"
                type="string"
                label="URL Slug i.e. mycompany"
                onChange={this.onChange}
                value={company_url_subdirectory}
                className="xs-full-width standard-margin-bottom"
                error={
                  errors.company_url_subdirectory.length > 0 ? true : false
                }
                required
              />
              <Typography component="h3" variant="h5">
                Master Account Details
              </Typography>
              {errors.first_name.map((error, index) => (
                <Alert
                  variant="filled"
                  severity="error"
                  className="standard-margin-bottom"
                  key={"first_name-" + index}
                >
                  {error}
                </Alert>
              ))}
              <TextField
                name="first_name"
                type="string"
                label="First Name"
                onChange={this.onChange}
                value={first_name}
                className="xs-full-width standard-margin-bottom"
                error={errors.first_name.length > 0 ? true : false}
                required
              />
              {errors.second_name.map((error, index) => (
                <Alert
                  variant="filled"
                  severity="error"
                  className="standard-margin-bottom"
                  key={"second_name-" + index}
                >
                  {error}
                </Alert>
              ))}
              <TextField
                name="second_name"
                type="string"
                label="Second Name"
                onChange={this.onChange}
                value={second_name}
                className="xs-full-width standard-margin-bottom"
                error={errors.second_name.length > 0 ? true : false}
                required
              />
              {errors.email_address.map((error, index) => (
                <Alert
                  variant="filled"
                  severity="error"
                  className="standard-margin-bottom"
                  key={"email_address-" + index}
                >
                  {error}
                </Alert>
              ))}
              <TextField
                name="email_address"
                type="email"
                label="Email Address"
                onChange={this.onChange}
                value={email_address}
                className="xs-full-width standard-margin-bottom"
                error={errors.email_address.length > 0 ? true : false}
                required
              />
              {errors.password.map((error, index) => (
                <Alert
                  variant="filled"
                  severity="error"
                  className="standard-margin-bottom"
                  key={"password-" + index}
                >
                  {error}
                </Alert>
              ))}
              <TextField
                name="password"
                type="password"
                label="Password"
                onChange={this.onChange}
                value={password}
                className="xs-full-width standard-margin-bottom"
                error={errors.password.length > 0 ? true : false}
                required
              />
              <TextField
                name="password_confirmation"
                type="password"
                label="Password Confirmation"
                onChange={this.onChange}
                value={password_confirmation}
                className="xs-full-width standard-margin-bottom"
                error={errors.password.length > 0 ? true : false}
                required
              />
            </Box>

            <Button
              className="xs-full-width"
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Tenant
            </Button>
          </form>
        </main>
      </DashboardWrapper>
    );
  }
}

export default Create;

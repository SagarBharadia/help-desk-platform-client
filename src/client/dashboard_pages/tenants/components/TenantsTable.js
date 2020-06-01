import React, { Component } from "react";
import { Link } from "react-router-dom";
import Endpoints from "../../../Endpoints";
import axios from "axios";
import { getBaseHeaders } from "../../../Helpers";

import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@material-ui/core";

class TenantsTable extends Component {
  company_subdir = this.props.company_subdir;
  state = {
    tenants: {},
    prevPageURL: null,
    nextPageURL: null,
  };

  componentDidMount() {
    let headers = getBaseHeaders();
    const getTenantsEndpoint = Endpoints.get("api", "getAllTenants");
    axios
      .get(getTenantsEndpoint, headers)
      .then((res) => {
        this.setState({
          tenants: res.data.data,
          nextPageURL: res.data.next_page_url,
          prevPageURL: res.data.prev_page_url,
        });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            const pageErrors = [
              ...this.props.pageErrors,
              "Unauthorized to view tenants. Please contact your admin for this permission.",
            ];
            this.props.setPageErrors(pageErrors);
          }
        }
      });
  }

  loadNewTenants = (direction) => {
    let headers = getBaseHeaders();
    let endpoint = this.state.nextPageURL;
    if (direction === "previous") {
      endpoint = this.state.prevPageURL;
    }
    axios
      .get(endpoint, headers)
      .then((res) => {
        this.setState({
          tenants: res.data.data,
          nextPageURL: res.data.next_page_url,
          prevPageURL: res.data.prev_page_url,
        });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            const pageErrors = [
              ...this.props.pageErrors,
              "Unauthorized to view tenants. Please contact your admin for this permission.",
            ];
            this.props.setPageErrors(pageErrors);
          }
        }
      });
  };

  render() {
    const { tenants, prevPageURL, nextPageURL } = { ...this.state };
    return (
      <div>
        <TableContainer component={Paper} className="standard-margin-bottom">
          <Table aria-label="table containing the tenants">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(tenants).map((key) => {
                let tenant = tenants[key];
                return (
                  <TableRow key={tenant.id}>
                    <TableCell component="th" scope="row">
                      {tenant.id}
                    </TableCell>
                    <TableCell align="right">{tenant.company_name}</TableCell>
                    <TableCell align="right">
                      {tenant.created_by.first_name +
                        " " +
                        tenant.created_by.second_name}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        component={Link}
                        variant="contained"
                        color="primary"
                        to={Endpoints.get("client", "viewTenant", {
                          id: tenant.id,
                        })}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={this.loadNewTenants.bind(this, "previous")}
            disabled={prevPageURL === null ? true : false}
          >
            Previous Page
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.loadNewTenants.bind(this, "next")}
            disabled={nextPageURL === null ? true : false}
          >
            Next Page
          </Button>
        </Box>
      </div>
    );
  }
}

export default TenantsTable;

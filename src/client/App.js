import React, { Component } from "react";
import Routes from "./routes/Routes";
import Cookies from "js-cookie";

import "../css/normalize.css";
import "../css/index.css";
import Endpoints from "./Endpoints";
import Axios from "axios";

import { getBaseHeaders } from "./Helpers";

class App extends Component {
  state = {
    authenticated: false,
    loaded: false,
  };

  setAppState = (key, value) => {
    this.setState({ [key]: value });
  };

  componentDidMount() {
    if (
      Cookies.get("super-token") &&
      Cookies.get("super-token-type") &&
      Cookies.get("super-auth-company-subdir") &&
      Cookies.get("super-auth-company-name") &&
      Cookies.get("super-user-name")
    ) {
      const checkTokenEndpoint = Endpoints.get("api", "checkToken");
      const options = getBaseHeaders();
      Axios.get(checkTokenEndpoint, options)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ authenticated: true, loaded: true });
          }
        })
        .catch((error) => {
          Cookies.remove("super-token");
          Cookies.remove("super-token-type");
          Cookies.remove("super-auth-company-subdir");
          Cookies.remove("super-auth-company-name");
          Cookies.remove("super-user-name");
          this.setState({ loaded: true });
        });
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.loaded ? (
          <Routes
            setAppState={this.setAppState}
            authenticated={this.state.authenticated}
          />
        ) : (
          "Loading"
        )}
      </div>
    );
  }
}

export default App;

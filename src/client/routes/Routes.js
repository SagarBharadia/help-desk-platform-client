import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// Importing Guards
import Guarded from "./Guarded";

// Importing Dashboard Pages
import Login from "../dashboard_pages/Login";
import Dashboard from "../dashboard_pages/Dashboard";

// Importing error pages
import Error404 from "../website_pages/error_pages/Error404";
import Endpoints from "../Endpoints";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={Endpoints.getRaw("client", "login")}
            render={(props) => <Login {...this.props} {...props} />}
          />
          <Route
            exact
            path={Endpoints.getRaw("client", "dashboard")}
            render={(props) => (
              <Guarded page={Dashboard} {...this.props} {...props} />
            )}
          />
          <Route render={(props) => <Error404 {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;

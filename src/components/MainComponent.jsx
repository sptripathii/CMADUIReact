import React from "react";
import Login from "./LoginComponents/Login.jsx";
import AfterLogin from "./LoginComponents/AfterLogin.jsx";
import DashboardPage from "./DataComponents/DashboardPage.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class MainComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            exact
            path="/afterlogin"
            render={props => <AfterLogin {...props} />}
          />
          <Route path="/DashboardPage" component={DashboardPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default MainComponent;

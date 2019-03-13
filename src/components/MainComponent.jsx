import React from "react";
import Login from "./LoginComponents/Login.jsx";
import AfterLogin from "./LoginComponents/AfterLogin.jsx";
import DashboardPage from "./DataComponents/DashboardPage.jsx";
import UserListPage from "./DataComponents/UserListPage.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import userStore from "../stores/userStore";
import userPropStore from "../stores/userStore";

class MainComponent extends React.Component {
  render() {
    return (
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ""}>
        <Switch>
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            exact
            path="/afterlogin"
            render={props => (
              <AfterLogin
                {...props}
                authToken={userStore.getState().user.authToken}
                propStore={userPropStore}
              />
            )}
          />
          <Route
            path="/DashboardPage"
            render={props => (
              <DashboardPage
                authToken={userStore.getState().user.authToken}
                user={userStore.getState().user}
                propStore={userPropStore}
              />
            )}
          />
          <Route
            path="/users"
            render={props => (
              <UserListPage authToken={userStore.getState().user.authToken} />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default MainComponent;

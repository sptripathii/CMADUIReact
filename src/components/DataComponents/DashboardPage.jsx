import React from "react";
import DashBoardGrid from "./DashboardGrid.jsx";
import DashboardPie from "./DashboardPie.jsx";
import DashboardRefreshInterval from "./DashboardRefreshInterval.jsx";

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <DashboardPie
          authToken={this.props.authToken}
          propStore={this.props.userPropStore}
        />
        <DashboardRefreshInterval
          authToken={this.props.authToken}
          user={this.props.user}
          propStore={this.props.userPropStore}
        />
        <DashBoardGrid authToken={this.props.authToken} />
      </div>
    );
  }
}
export default DashboardPage;

import React from "react";
import Header from "./Header.jsx";
import DashBoardGrid from "./DashboardGrid.jsx";
import Dashboard from "./Dashboard.jsx";
import DashboardRefreshInterval from "./DashboardRefreshInterval.jsx";
import Footer from "./Footer";

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <Header title={"NMS - Monitoring"} />
        <Dashboard />
        <DashboardRefreshInterval />
        <DashBoardGrid />
        <Footer />
      </div>
    );
  }
}
export default DashboardPage;

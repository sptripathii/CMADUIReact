import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Hidden,
  Drawer,
  CssBaseline,
  MenuList,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import DashboardPage from "../DataComponents/DashboardPage.jsx";
import UserListPage from "../DataComponents/UserListPage.jsx";
import Footer from "./Footer";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: 800,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  centerHidden: {
    visibility: "hidden"
  },
  centerVisible: {
    visibility: "visible"
  }
});

class AfterLogin extends Component {
  state = {
    displayComponent: "DashboardPage"
  };

  constructor(props) {
    super(props);
    this.setState({
      displayComponent: "DashboardPage" // key defining which component to display
    });
    this.selectComponent = this.selectComponent.bind(this);
  }

  selectComponent(component) {
    this.setState({
      displayComponent: component // set the component you want to display
    });
  }

  render() {
    //console.log("After login page info toke", this.props.authToken);
    const {
      classes,
      location: { pathname },
      children
    } = this.props;

    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
          <MenuItem
            component={Link}
            to={DashboardPage}
            selected={"/DashboardPage" === pathname}
            onClick={() => this.selectComponent("DashboardPage")}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={Link}
            to={UserListPage}
            selected={"/UserListPage" === pathname}
            onClick={() => this.selectComponent("UserListPage")}
          >
            Users
          </MenuItem>
          <MenuItem component={Link} to="/" selected={"/" === pathname}>
            Logout
          </MenuItem>
          {/* <MenuItem
            component={Link}
            to="/logout"
            selected={"/logout" === pathname}
          >
            Logout
          </MenuItem> */}
        </MenuList>
        <Footer />
      </div>
    );

    return (
      <Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                NMS Log Manager
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div id="center" className={classes.toolbar}>
              {this.state.displayComponent === "DashboardPage" && (
                <DashboardPage authToken={this.props.authToken} />
              )}
              {this.state.displayComponent === "UserListPage" && (
                <UserListPage authToken={this.props.authToken} />
              )}
            </div>
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(AfterLogin);

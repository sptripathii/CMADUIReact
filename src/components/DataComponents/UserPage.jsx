import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { fetchUsers } from "../../rest/UserHandler.js";
import user_mgmt_store from "../../store/user_mgmt_store.js";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  fab: {
    margin: theme.spacing.unit,
    height: "50%",
    width: "60%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }
});
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      anchorEl: null
    };
    user_mgmt_store.subscribe(() => {
      console.log(
        "UserList::Updating userlist view" + user_mgmt_store.getState().user
      );
      this.forceUpdate();
    });

    this.handleToggle = value => () => {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      this.setState({
        checked: newChecked
      });
    };

    this.handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    this.handleProfileMenuClick = () => {
      this.setState({ anchorEl: null });
      //TODO: Bring the user edit screen
    };
    this.handleLogoutMenuClick = () => {
      this.setState({ anchorEl: null });
      //TODO: Bring the user edit screen
    };
    this.handleAddUserClick = () => {};
  }

  componentWillMount() {
    console.log(
      "UserList::Fetching users with userId",
      user_mgmt_store.getState().user.userId
    );
    fetchUsers();
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    var userList = user_mgmt_store.getState().userList;
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleProfileMenuClick}
      >
        <MenuItem onClick={this.handleProfileMenuClick}>Profile</MenuItem>
        <MenuItem onClick={this.handleLogoutMenuClick}>Logout</MenuItem>
      </Menu>
    );
    console.log("User list to render", userList);

    if (userList !== undefined && userList.length > 0) {
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <AppBar position="static" title="Users">
                <Toolbar>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                  <Fab color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon onClick={this.handleAddUserClick} />
                  </Fab>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <IconButton
                      aria-owns={isMenuOpen ? "material-appbar" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
              {renderMenu}
              <List className={classes.root}>
                <ListItem key="schema" role={undefined} dense button>
                  <ListItemText primary="User Id" />
                  <ListItemText primary="Name" />
                  <ListItemText primary="Devices" />
                </ListItem>
                {userList.map(value => (
                  <ListItem
                    key={value.userId}
                    role={undefined}
                    dense
                    button
                    onClick={this.handleToggle(value)}
                  >
                    {/* <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            /> */}
                    <ListItemText primary={value.userId} />
                    <ListItemText primary={value.userName} />
                    <ListItemText primary={value.devices} />
                  </ListItem>
                ))}
              </List>
            </div>
          </MuiThemeProvider>
        </div>
      );
    } else {
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <AppBar title="Users" />
              <List className={classes.root} />
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

UserPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserPage);

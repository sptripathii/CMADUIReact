import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Button from "@material-ui/core/Button";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as Colors from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import { onLogin } from "../../rest/userAjax.js";
import { Logo } from "./Logo";

const muiTheme = getMuiTheme({
  appBar: {
    color: "#3f51b5",
    textColor: Colors.white
  },
  palette: {
    primary1Color: "#3f51b5",
    primary2Color: Colors.blueGrey700,
    accent1Color: Colors.deepOrange500,
    accent2Color: Colors.blueGrey400,
    accent3Color: Colors.blueGrey500,
    height: 80
  },
  cardMedia: {
    overlayContentBackground: fade(Colors.darkBlack, 0.87)
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "admin2",
      password: "admin2",
      isAuthenticated: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    onLogin(this.state.username, this.state.password);
    this.props.history.push("/afterlogin");
  }

  onUserNameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleClick(event) {
    // var apiBaseUrl = "http://localhost:4000/api/";
    console.log("Login::Dispatching event for user login", this.state.username);
    onLogin(this.state.username, this.state.password, this.props.history);
    setTimeout(100);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          <div>
            <AppBar title="NMS Log Manager" />
            <div style={centerStyle}>
              <Logo style={logoStyle} />
              <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange={(event, newValue) =>
                  this.setState({ username: newValue })
                }
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) =>
                  this.setState({ password: newValue })
                }
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                label="Submit"
                primary={true}
                style={style}
                onClick={event => this.handleClick(event)}
              >
                Submit
              </Button>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 25
};
const centerStyle = {
  width: "300px",
  height: "500px",
  margin: "0 auto"
};

const logoStyle = {
  height: "500px"
};

export default Login;

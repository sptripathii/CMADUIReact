import React from "react";
import { fetchUser } from "../../rest/userAjax.js";
import userPropStore from "../../stores/userPropStore.js";
import "../../css/Header.css";
import "../../css/App.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class DashboardRefreshInterval extends React.Component {
  constructor(props) {
    super(props);
    userPropStore.subscribe(() => {
      this.forceUpdate();
      this.setState({
        refreshInterval: this.props.user.refreshInterval
      });
    });

    this.state = {
      refreshInterval: 20
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    fetchUser(this.props.authToken);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("I am clicked");
  }
  handleChange(event) {
    event.preventDefault();
    console.log("I am changed");
    this.setState({ refreshInterval: event.target.value });
    //this.props.userPropStore.user.setState()
  }

  render() {
    return (
      <FormControl style={styles.formControl}>
        <InputLabel />
        <form onSubmit={this.handleSubmit}>
          <Select
            value={this.state.refreshInterval}
            onChange={this.handleChange}
            inputProps={{
              name: "refreshInterval",
              id: "refreshInterval"
            }}
          >
            <MenuItem value="">
              <em>5</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {/* <label>
            Refresh Interval:
            <input
              type="select"
              placeholder="Refresh Interval"
              name="refreshInterval"
              value={this.state.refreshInterval}
            />
          </label> */}
        </form>
      </FormControl>
    );
  }
}

export default DashboardRefreshInterval;

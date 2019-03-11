import React from "react";
import { fetchUser } from "../../rest/ajax.js";
import store from "../../stores/store.js";
import "../../css/Header.css";
import "../../css/App.css";

class RefreshInterval extends React.Component {
  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.forceUpdate();
      this.setState({
        refreshInterval: store.getState().user.refreshInterval
      });
    });

    console.log("Refresh Interval constructor...", store.getState());
    this.state = {
      refreshInterval: 10
    };
  }

  async componentDidMount() {
    fetchUser();
    console.log(
      "My User details:",
      JSON.stringify(store.getState().user.userName)
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("I am clicked");
  }

  render() {
    return (
      <div id="dashboardRefresh" className="formInterval">
        <form onSubmit={this.handleSubmit}>
          <label>
            Refresh Interval:
            <input
              type="select"
              placeholder="Refresh Interval"
              name="refreshInterval"
              value={this.state.refreshInterval}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default RefreshInterval;

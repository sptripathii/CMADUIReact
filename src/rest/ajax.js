import store from "../stores/store.js";

const loginResourceURL = "http://localhost:8083/nmsLogsManager/v1/user/login";
const usersResourceURL = "http://localhost:8083/nmsLogsManager/v1/user/admin";
const syslogResourceURL = "http://localhost:8083/nmsLogsManager/v1/syslog";
const countResourceURL = "http://localhost:8083/nmsLogsManager/v1/syslog/count";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaXNzIjoiTm1zU3lzbG9nIiwiZGV2aWNlTGlzdCI6WyIxMC4xMi4xMi4xMSIsIjIwLjEyLjEyLjIyIiwiMTAuMS4xMS4xMTAiLCIxMC4yMC4yMC4yMCIsIjEwLjEyLjEyLjIzMCIsIjEwLjEyLjQ0LjExIiwiMTkyLjEyLjEyLjExIl0sImV4cCI6MTU1MjI4NjExMywiaWF0IjoxNTUyMjg1MjczLCJqdGkiOiIyMDUwNDUwOTQ3In0.-iuYnt8I-ih4NySs09GlWxlI6DzvGfcj_WZ9fxlcACc";
export function onLogin(username, password) {
  var credentials = username + ":" + password;
  var encodedData = "Basic " + btoa(credentials);
  return fetch(loginResourceURL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: encodedData
    }
  })
    .then(response => {
      if (response.status === 204 || response.status === 200) {
        store.dispatch({
          type: "login",
          userName: username,
          authToken: response.headers.get("x-auth-access-token"),
          devices: response.headers.get("Devices")
        });
      }
    })
    .catch(function(error) {
      console.error("UserHandler: Looks like an error" + error);
      alert(error);
    });
}

export function fetchUsers() {
  console.log(
    "UserHandler: Calling fetchUsers with user ",
    store.getState().user.userId
  );
  console.log("UserHandler: Calling fetchUsers with ", store.getState().user);
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": token
    }
  };
  return fetch(usersResourceURL, get_params)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log("Sudhanshu: fetch users response body ", json);
          store.dispatch({ type: "fetch_users", userList: json });
        });
      }
    })
    .catch(function(error) {
      console.error("UserHandler: Looks like an error" + error);
      alert(error);
    });
}

export function fetchLogsForGrid() {
  console.log("Sudhanshu fetch token", store.getState().authToken);
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": token
    }
  };
  return fetch(syslogResourceURL, get_params)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      store.dispatch({
        type: "grid",
        logs: response
      });
    });
}

export function fetchUser() {
  console.log("My tokne", store.getState().authToken);
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": token
    }
  };
  return fetch(usersResourceURL, get_params)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log("UserHandler: fetch users response body ", json);
          store.dispatch({ type: "fetch_users", user: json });
        });
      }
    })
    .catch(function(error) {
      console.error("UserHandler: Looks like an error" + error);
      alert(error);
    });
}

export function updateInterval() {
  return fetch("http://localhost:8083/nmsLogsManager/v1/user/")
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(intervalData) {
      store.dispatch({
        type: "interval",
        interval: intervalData.refreshInterval
      });
      console.log("Interval in ajax", intervalData);
    });
}

export function fetchCount() {
  var authToken = store.getState().userName;
  console.log("MY AUTHTOKEN", authToken);
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": token
    }
  };
  return fetch(countResourceURL, get_params)
    .then(function(response) {
      return response.json();
    })
    .then(function(countData) {
      console.log(countData);
      const formattedData = [];
      formattedData.push({
        key: "error",
        value: countData.errorCount
      });
      formattedData.push({
        key: "warning",
        value: countData.warnCount
      });
      formattedData.push({
        key: "info",
        value: countData.infoCount
      });
      formattedData.push({
        key: "debug",
        value: countData.debugCount
      });
      store.dispatch({
        type: "dashboard",
        count: formattedData
      });
      console.log("count in ajax", formattedData);
    });
}

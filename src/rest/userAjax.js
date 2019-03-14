import userStore from "../stores/userStore";
import userPropStore from "../stores/userStore";

const loginResourceURL = "/nmslog-manager/nmsLogsManager/v1/user/login";
const userResourceURL = "/nmslog-manager/nmsLogsManager/v1/user/admin";
const usersResourceURL = "/nmslog-manager/nmsLogsManager/v1/user/";

export function onLogin(username, password, history) {
  console.log("Logging in with user", username);
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
        userStore.dispatch({
          type: "login",
          userName: username,
          authToken: response.headers.get("x-auth-access-token"),
          devices: response.headers.get("Devices")
        });
        history.push("/afterlogin");
      } else {
        alert("Invalid username or password!");
        return false;
      }
    })
    .catch(function(error) {
      console.error("UserHandler: Looks like an error" + error);
      alert(error);
    });
}

export function fetchUsers(authToken) {
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": authToken
    }
  };
  return fetch(usersResourceURL, get_params)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log("Sudhanshu: fetch users response body ", json);
          userStore.dispatch({ type: "fetch_users", userList: json });
        });
      }
    })
    .catch(function(error) {
      console.error("UserHandler: Looks like an error" + error);
      alert(error);
    });
}

export function fetchUser(authToken) {
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": authToken
    }
  };
  return fetch(userResourceURL, get_params)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(
            "Sudhanshu Test 11 UserHandler: fetch users response body ",
            json
          );
          userPropStore.dispatch({ type: "fetch_users", user: json });
        });
      }
    })
    .catch(function(error) {
      console.error("UserHandler: Looks like an error" + error);
      alert(error);
    });
}

import store from "../stores/store.js";

const syslogResourceURL =
  "http://localhost:8080/nmslog-manager/nmsLogsManager/v1/syslog?page=";
const countResourceURL =
  "http://localhost:8080/nmslog-manager/nmsLogsManager/v1/syslog/count";

export function fetchLogsForGrid(authToken) {
  let queryURL = syslogResourceURL + store.getState().pageNumber;
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": authToken
    }
  };
  return fetch(queryURL, get_params).then(response => {
    if (response.ok) {
      response.json().then(json => {
        store.dispatch({
          type: "grid",
          logs: json,
          pageNumber: store.getState().pageNumber + 1
        });
      });
    }
  });
}

// export function updateInterval(authToken) {
//   return fetch("http://localhost:8083/nmsLogsManager/v1/user/")
//     .then(function(response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function(intervalData) {
//       store.dispatch({
//         type: "interval",
//         interval: intervalData.refreshInterval
//       });
//       console.log("Interval in ajax", intervalData);
//     });
// }

export function fetchCount(authToken) {
  console.log("MY AUTHTOKEN", authToken);
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": authToken
    }
  };
  return fetch(countResourceURL, get_params).then(response => {
    if (response.ok) {
      response.json().then(countData => {
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
  });
}

import store from "../stores/store.js";

const syslogResourceURL = "http://localhost:8083/nmsLogsManager/v1/syslog";
const countResourceURL = "http://localhost:8083/nmsLogsManager/v1/syslog/count";

export function fetchLogsForGrid(authToken) {
  console.log("Sudhanshu fetch token", authToken);
  var get_params = {
    method: "GET",
    mode: "cors",
    headers: {
      "x-auth-access-token": authToken
    }
  };
  return fetch(syslogResourceURL, get_params).then(response => {
    if (response.ok) {
      response.json().then(json => {
        store.dispatch({
          type: "grid",
          logs: json
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

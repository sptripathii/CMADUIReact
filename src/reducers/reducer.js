function rootReducer(
  state = {
    logs: [],
    count: [],
    user: {},
    userName: "",
    authToken: "",
    devices: []
  },
  action
) {
  switch (action.type) {
    case "grid":
      return {
        logs: action.logs,
        count: state.count,
        user: state.user,
        userName: state.userName,
        authToken: state.authToken,
        devices: state.devices
      };
    case "dashboard":
      return {
        logs: state.logs,
        count: action.count,
        user: state.user,
        userName: state.userName,
        authToken: state.authToken,
        devices: state.devices
      };
    case "fetch_users":
      return {
        logs: state.logs,
        count: state.count,
        user: action.user,
        userName: state.userName,
        authToken: state.authToken,
        devices: state.devices
      };
    case "login":
      console.log("test login", action.userName);
      return {
        logs: state.logs,
        count: state.count,
        user: state.user,
        userName: action.userName,
        authToken: action.authToken,
        devices: action.devices
      };
    default:
      return state;
  }
}

export default rootReducer;

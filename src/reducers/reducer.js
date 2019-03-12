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
        count: state.count
      };
    case "dashboard":
      return {
        logs: state.logs,
        count: action.count
      };
    case "fetch_users":
      return {
        logs: state.logs,
        count: state.count
      };
    case "login":
      console.log("test login", action.userName);
      return {
        logs: state.logs,
        count: state.count
      };
    default:
      return state;
  }
}

export default rootReducer;

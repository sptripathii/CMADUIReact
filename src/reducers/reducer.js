function rootReducer(
  state = {
    logs: [],
    count: [],
    user: {},
    userName: "",
    authToken: "",
    devices: [],
    pageNumber: 0
  },
  action
) {
  switch (action.type) {
    case "grid":
      return {
        logs: state.logs.concat(action.logs),
        count: state.count,
        pageNumber: action.pageNumber
      };
    case "dashboard":
      return {
        logs: state.logs,
        count: action.count,
        pageNumber: state.pageNumber
      };
    case "fetch_users":
      return {
        logs: state.logs,
        count: state.count,
        pageNumber: state.pageNumber
      };
    case "login":
      console.log("test login", action.userName);
      return {
        logs: state.logs,
        count: state.count,
        pageNumber: state.pageNumber
      };
    default:
      return state;
  }
}

export default rootReducer;

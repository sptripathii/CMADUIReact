function userReducer(
  state = { user: {}, userList: [], devicesList: [] },
  action
) {
  switch (action.type) {
    case "user_login":
      console.log("Logging in with user", action.userId);
      return {
        user: {
          userName: action.userName,
          password: state.password,
          authToken: state.authToken,
          devices: state.devices
        },
        userList: state.userList,
        devicesList: state.devicesList
      };
    case "login":
      console.log("User logged in successfully", action.userName);
      return {
        user: {
          userName: action.userName,
          password: action.password,
          authToken: action.authToken,
          devices: action.devices
        },
        userList: state.userList,
        devicesList: state.devicesList
      };
    case "fetch_users":
      console.log("Users fetched successfully", action.userList);
      console.log("userId", state.user.userId);
      return {
        userList: action.userList,
        user: state.user,
        devicesList: state.devicesList
      };
    case "fetch_devices":
      console.log("Devices fetched successfully", action.devicesList);
      return {
        userList: state.userList,
        user: state.user,
        devicesList: action.devicesList
      };
    default:
      console.log("userId", state.user.userId);
      return {
        user: {
          userName: state.userName,
          password: state.password,
          authToken: state.authToken,
          devices: state.devices
        },
        userList: state.userList,
        devicesList: state.devicesList
      };
  }
}

export default userReducer;

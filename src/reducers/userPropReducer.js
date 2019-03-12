function userPropReducer(
  state = {
    user: {}
  },
  action
) {
  switch (action.type) {
    case "fetch_users":
      return {
        user: action.user
      };
    default:
      return state;
  }
}

export default userPropReducer;

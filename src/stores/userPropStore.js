import { createStore } from "redux";
import userPropReducer from "../reducers/userPropReducer.js";

const userPropStore = createStore(userPropReducer);
export default userPropStore;

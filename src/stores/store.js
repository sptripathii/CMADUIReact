import { createStore } from "redux";
import rootReducer from "../reducers/reducer.js";
//import { onLogin } from "../rest/ajax.js";

const store = createStore(rootReducer);
export default store;

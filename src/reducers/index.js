import {combineReducers} from "redux";
import isLoggedReducer from "./isLoggedReducer";

const allReducers = combineReducers({
    isLoggedReducer: isLoggedReducer
});

export default allReducers;
import {combineReducers} from "redux";
import isLoggedReducer from "./isLoggedReducer";
import getUsersReducer from "./getUsersReducer";
import postUserReducer from "./postUserReducer";

const allReducers = combineReducers({
    isLoggedReducer: isLoggedReducer,
    getUsersReducer: getUsersReducer,
    postUserReducer: postUserReducer
});

export default allReducers;
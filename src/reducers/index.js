import {combineReducers} from "redux";
import isLoggedReducer from "./isLoggedReducer";
import getUsersReducer from "./getUsersReducer";
import postUserReducer from "./postUserReducer";
import deleteUserReducer from "./deleteUserReducer";

const allReducers = combineReducers({
    isLoggedReducer: isLoggedReducer,
    getUsersReducer: getUsersReducer,
    postUserReducer: postUserReducer,
    deleteUserReducer: deleteUserReducer
});

export default allReducers;
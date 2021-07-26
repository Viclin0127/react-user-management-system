import {combineReducers} from "redux";
import isLoggedReducer from "./isLoggedReducer";
import getUsersReducer from "./getUsersReducer";
import postUserReducer from "./postUserReducer";
import deleteUserReducer from "./deleteUserReducer";
import putUserReducer from "./putUserReducer";

const allReducers = combineReducers({
    isLoggedReducer: isLoggedReducer,
    getUsersReducer: getUsersReducer,
    postUserReducer: postUserReducer,
    deleteUserReducer: deleteUserReducer,
    putUserReducer: putUserReducer
});

export default allReducers;
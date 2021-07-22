const isLoggedReducer = (state = (localStorage.getItem("auth-token")?true:false), action) => {
    if (action.type === "LOG_IN"){
        return true
    }
    if (action.type === "LOG_OUT"){
        return false
    }
    return state
};

export default isLoggedReducer;
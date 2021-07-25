const store = JSON.parse(localStorage.getItem("auth-token"));

var initialState = {
    isLogged: ((store)?true:false), 
    curUser: ((store)? store.curUser : "")
};

const isLoggedReducer = (state = initialState, action) => {

    if (action.type === "LOG_IN"){
        return {isLogged: true, curUser: action.payload}
    }
    if (action.type === "LOG_OUT"){
        return {isLogged: false, curUser: ""}
    }
    return state
};

export default isLoggedReducer;
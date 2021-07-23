const getUserReducer = (state = [], action) => {
    if (action.type === "GET_USERS"){
        return action.payload
    }
    return state
};

export default getUserReducer;
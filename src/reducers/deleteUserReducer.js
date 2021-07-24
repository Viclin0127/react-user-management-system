const deleteUserReducer = (state = null, action) => {
    if (action.type === "DELETE_USER"){
        return action.payload
    }
    return state
};

export default deleteUserReducer;
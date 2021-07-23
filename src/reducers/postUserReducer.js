const postUserReducer = (state = null, action) => {
    if (action.type === "POST_USER"){
        return action.payload
    }
    return state
};

export default postUserReducer;
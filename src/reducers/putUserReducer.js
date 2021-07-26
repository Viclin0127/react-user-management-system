const putUserReducer = (state = null, action) => {
    if (action.type === "PUT_USER"){
        return action.payload
    }
    return state
};

export default putUserReducer;
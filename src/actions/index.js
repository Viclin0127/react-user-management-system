// Actions
import api from "../apis/api";

export const logIn = () => {
    return {
        type: "LOG_IN"
    }
};

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
};

// use Redux-Thunk middleware to handle async function
export const getUsers = ()=>{
    return async (dispatch) => {
        const store = JSON.parse(localStorage.getItem("auth-token"));
        if (store) {
            try{
                const res = await api.get("/api/users", {headers: {"x-auth-token": store.token}});
                dispatch({type: "GET_USERS", payload: res.data})
            }
            catch(err){
                alert(err.response.data)
            }
        }
    }
}

export const postUser = (data, callback)=>{
    return async (dispatch) => {
        try{
            const res = await api.post("/api/users", data);
            dispatch({type: "POST_USER", payload: res});
            callback(false);
            alert("Register successfully, please log in...")
        }
        catch(err){
            alert(err.response.data);
        }
    }
}

export const putUser = (data)=>{
    return {
        type: "PUT_USER",
        payload: data
    }
}

export const deleteUser = (data)=>{
    return {
        type: "DELETE_USER",
        payload: data
    }
}
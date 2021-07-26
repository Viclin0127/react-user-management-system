// Actions
import api from "../apis/api";

export const logIn = (curUser) => {
    return {
        type: "LOG_IN",
        payload: curUser
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

export const putUser = (user, data, curUser, callback)=>{
    return async (dispatch) => {

        const store = JSON.parse(localStorage.getItem("auth-token"));
        if (!store) return alert("No token provided...");
        // PUT myself
        if (!curUser.isAdmin){
            if (user._id !== curUser._id) {
                alert("No permission...");
                return
            }
            try{
                const res = await api.put("/api/users/update/myself", data, {headers: {"x-auth-token": store.token}});
                dispatch({type: "PUT_USER", payload: res});
                // TODO: Successfully updated... do something
                alert("Successfully updated!");
                callback(false);
                dispatch(logIn(res.data))
            }
            catch(err){
                alert(err.response.data)
            }
        }
        // PUT (admin only)
        else {
            try{
                const res = await api.put(`/api/users/${user._id}`, data, {headers: {"x-auth-token": store.token}});
                dispatch({type: "PUT_USER", payload: res});
                // TODO: Successfully updated... do something
                alert("Successfully updated by admin user!");
                callback(false);
                if (user.isAdmin){dispatch(logIn(res.data))}
            }
            catch(err){
                alert(err.response.data)
            }
        }
    }
}

export const deleteUser = (user, curUser)=>{
    return async (dispatch) => {
        
        const store = JSON.parse(localStorage.getItem("auth-token"));
        if (!store) return alert("No token provided...")

        if (!curUser.isAdmin){
            if (user._id !== curUser._id) {
                alert("No permission...");
                return
            }
            try{
                const res = await api.delete("/api/users/delete/myself", {headers: {"x-auth-token": store.token}});
                dispatch({type: "DELETE_USER", payload: res});
                
                // if successfully delete, clear LocalStorage
                // TODO: automated log out
                alert("Successfully deleted! you will be logged out immediately...")
                localStorage.clear();
                dispatch(logOut())

            }
            catch(err){
                alert(err.response.data)
            }
        }
        else{
            try{
                const res = await api.delete(`/api/users/${user._id}`, {headers: {"x-auth-token": store.token}});
                dispatch({type: "DELETE_USER", payload: res});
                alert("Successfully deleted...");
                // TODO: automated rerender.
            }
            catch(err){
                alert(err.response.data)
            }
        }
    }
}
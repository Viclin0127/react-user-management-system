import React, {useEffect, useState} from 'react';
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, getUsers } from '../actions';

function Dashboard() {
    const isLogged = useSelector(state => state.isLoggedReducer);
    const users = useSelector(state => state.getUsersReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUsers());
    },[isLogged]);

    const onClickLogOut = () => {
        // TODO: pop up declaration window to tell the client
        localStorage.clear();
        dispatch(logOut());
    }

    const renderUsers = (users) =>{
        return (
            users.map((user, index)=>{
                return <p key={index}>{user.name}</p>
            })
        )
    }

    return (
        <Route path="/dashboard">
            {(!isLogged)? <Redirect to="/login"/> : null}
            <div>
                User Management Sys
            </div>
            <div>
                <button onClick={() => onClickLogOut()}>Log Out</button>
            </div>
            <div>
                ---GET users---
                {(users)? renderUsers(users) : <div>Loading...</div>}
            </div>
            <div>
                
            </div>
        </Route>
    )
}

export default Dashboard;

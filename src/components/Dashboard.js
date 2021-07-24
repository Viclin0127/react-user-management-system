import React, {useEffect, useState} from 'react';
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, getUsers, deleteUser } from '../actions';
import {MdEdit} from "react-icons/md";
import {RiDeleteBinLine} from "react-icons/ri";

function Dashboard() {
    const isLogged = useSelector(state => state.isLoggedReducer);
    const users = useSelector(state => state.getUsersReducer);
    const deletedUser = useSelector(state => state.deleteUserReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUsers());
    },[isLogged]);

    const onClickLogOut = () => {
        // TODO: pop up declaration window to tell the client
        localStorage.clear();
        dispatch(logOut());
    }

    const onClickDeleteUser = id => {
        dispatch(deleteUser(id));
        // TODO: after deleting an user log out the system
    }

    const renderUsers = (users) =>{
        return (
            users.map((user, index)=>{
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{(user.isAdmin)? "Admin" : "User"}</td>
                        <td>
                            <MdEdit disabled={true} style={{color: "blue", cursor:"pointer"}}/>
                            <RiDeleteBinLine onClick={() => onClickDeleteUser(user._id)} style={{color: "orangered", cursor:"pointer"}}/>
                        </td>
                    </tr>
                )
            })
        )
    }

    return (
        <Route path="/dashboard">
            {(!isLogged)? <Redirect to="/login"/> : null}
            <div>
                <button onClick={() => onClickLogOut()}>Log Out</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(users)? renderUsers(users) : null}
                    </tbody>
                </table>
            </div>
        </Route>
    )
}

export default Dashboard;

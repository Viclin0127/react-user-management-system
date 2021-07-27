import React, {useEffect, useState} from 'react';
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, getUsers, deleteUser, putUser } from '../actions';
import {MdEdit} from "react-icons/md";
import {RiDeleteBinLine} from "react-icons/ri";
import "../css/dashboard.css";

function Dashboard() {
    const {isLogged,curUser} = useSelector(state => state.isLoggedReducer);
    const users = useSelector(state => state.getUsersReducer);
    const updatedUser = useSelector(state => state.putUserReducer);
    const dispatch = useDispatch();

    // local states
    const [openUpdate, setOpenUpdate] = useState({open: false, targetUser: null});
    const [nameUpdate, setNameUpdate] = useState("");
    const [emailUpdate, setEmailUpdate] = useState("");

    useEffect(()=>{
        dispatch(getUsers());
    },[isLogged, updatedUser, dispatch]);

    const onClickLogOut = () => {
        // TODO: pop up declaration window to tell the client
        localStorage.clear();
        dispatch(logOut());
    }

    const onClickDeleteUser = user => {
        // TODO: pop up declaration window to tell the client
        dispatch(deleteUser(user, curUser));
    };

    const onClickUpdateUser = (user) => {
        // open update bar, validate user (also did this validate in back-end)
        if ((user._id !== curUser._id)&& (!curUser.isAdmin)){ 
            return alert("No permission")
        }
        setOpenUpdate({open: !openUpdate.open, targetUser: user});
        setNameUpdate("");
        setEmailUpdate("");
    };

    const onSubmitUpdate = e => {
        e.preventDefault();

        const data = {name: nameUpdate, email: emailUpdate};
        // automated close update bar
        dispatch(putUser(openUpdate.targetUser, data, curUser, setOpenUpdate));
        setNameUpdate("")
        setEmailUpdate("")
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
                            <MdEdit 
                                className={((user._id !== curUser._id)&& (!curUser.isAdmin))? "edit-button":"edit-button-active"}
                                onClick={() => onClickUpdateUser(user)}
                            />
                            <RiDeleteBinLine 
                                className={((user._id !== curUser._id)&& (!curUser.isAdmin))? "delete-button":"delete-button-active"}
                                onClick={() => onClickDeleteUser(user)}
                            />
                        </td>
                    </tr>
                )
            })
        )
    };

    const renderUpdateBar = ()=>{
        return (
            <div className="update-user">
                <form className="update-form" onSubmit={e => onSubmitUpdate(e)}>
                    <div className="update-title">
                        New User Name
                        <input value={nameUpdate} onChange={e=>setNameUpdate(e.target.value)}/>
                    </div>
                    <div className="update-title">
                        New Email
                        <input value={emailUpdate} onChange={e=>setEmailUpdate(e.target.value)}/>
                    </div>
                    <button className="update-submit-button">Update</button>
                </form>
            </div>
        )
    }

    return (
        <Route path="/dashboard">
            {(!isLogged)? <Redirect to="/"/> : null}
            <div className="dashboard-header">
                <div className="dashboard-greeting">{`Hi, ${curUser.name}`}</div>
                <button className="dashboard-logout" onClick={() => onClickLogOut()}>Log Out</button>
            </div>
            
            {(openUpdate.open)?renderUpdateBar():null}
            <div className="dashboard-content">
                <table >
                    <thead >
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

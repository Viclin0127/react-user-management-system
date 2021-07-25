import React, {useEffect, useState} from 'react';
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, getUsers, deleteUser } from '../actions';
import {MdEdit} from "react-icons/md";
import {RiDeleteBinLine} from "react-icons/ri";

function Dashboard() {
    const {isLogged,curUser} = useSelector(state => state.isLoggedReducer);
    const users = useSelector(state => state.getUsersReducer);
    const dispatch = useDispatch();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [nameUpdate, setNameUpdate] = useState("");
    const [emailUpdate, setEmailUpdate] = useState("");

    useEffect(()=>{
        dispatch(getUsers());
    },[isLogged]);

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
        const store = JSON.parse(localStorage.getItem("auth-token"));
        if (user._id !== store.curUser._id){ return alert("No permission")}
        setOpenUpdate(!openUpdate);
    };

    const onSubmitUpdate = e => {
        e.preventDefault();
        // TODO: a PUT request
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
                                onClick={() => onClickUpdateUser(user)}
                                style={{color: "blue", cursor:"pointer"}}
                            />
                            <RiDeleteBinLine 
                                onClick={() => onClickDeleteUser(user)} 
                                style={{color: "orangered", cursor:"pointer"}}
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
                <form onSubmit={e => onSubmitUpdate(e)}>
                    <div>
                        New User Name
                        <input value={nameUpdate} onChange={e=>setNameUpdate(e.target.value)}/>
                    </div>
                    <div>
                        New Email
                        <input value={emailUpdate} onChange={e=>setEmailUpdate(e.target.value)}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }

    return (
        <Route path="/dashboard">
            {(!isLogged)? <Redirect to="/login"/> : null}
            <div>{`Hi, ${curUser.name}`}</div>
            <div>
                <button onClick={() => onClickLogOut()}>Log Out</button>
            </div>
            {(openUpdate)?renderUpdateBar():null}
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

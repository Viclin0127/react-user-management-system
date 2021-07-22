import React, {useState} from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { logIn, logOut } from '../actions';
import api from "../apis/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isLogged = useSelector(state => state.isLoggedReducer);
    const dispatch = useDispatch();

    const onSubmit = async e => {
        e.preventDefault();
        console.log(email, password);

        try{
            const result = await api.post("/api/auth", { email, password});
            const store = {token: result.data, date: new Date()};
            localStorage.setItem("auth-token", JSON.stringify(store));
            dispatch(logIn());
        }
        catch(ex){
            alert("Invalid email or password, please try again...");
        }
    }

    return (
        <Route path="/login">
            {(isLogged)? <Redirect to="/dashboard"/> : null}
            <div>
                Login page
                <div className="login-main">
                    <form onSubmit={ e => onSubmit(e) }>
                        <div className="login-title">
                            User Email
                        </div>
                        <input 
                            className="login-input-email" 
                            value={email}
                            onChange = { e => setEmail(e.target.value) }
                        />
                        <div className="login-title">
                            Password
                        </div>
                        <input 
                            className="login-input-password"
                            type="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                        <button className="login-button">Log in</button>
                    </form>
                </div>
            </div>
        </Route>
    )
}

export default Login

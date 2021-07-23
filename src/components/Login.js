import React, {useState} from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { logIn } from '../actions';
import api from "../apis/api";
import Register from './Register';
import "../css/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [onClickRegBtn, setOnClickRegBtn] = useState(false);

    // redux
    const isLogged = useSelector(state => state.isLoggedReducer);
    const dispatch = useDispatch();

    const onSubmit = async e => {
        e.preventDefault();
        try{
            const result = await api.post("/api/auth", { email, password});
            const store = {token: result.data, date: new Date()};
            localStorage.setItem("auth-token", JSON.stringify(store));
            dispatch(logIn());
        }
        catch(ex){
            alert("Invalid email or password, please try again...");
        }
    };

    const clickedRegisterBtn = ()=>{
        setOnClickRegBtn(!onClickRegBtn)
    }

    return (
        <Route path="/login">
            {(isLogged)? <Redirect to="/dashboard"/> : null}
            <>
                <div className="login-main">
                    <form onSubmit={ e => onSubmit(e) }>
                        <div className="login-title">
                            <p>User Email</p>
                            <input 
                            className="login-input-email" 
                            value={email}
                            onChange = { e => setEmail(e.target.value) }
                            />
                        </div>
                        <div className="login-title">
                            <p>Password</p>
                            <input 
                            className="login-input-password"
                            type="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                            />
                        </div>
                        <button className="login-button">Log in</button>
                    </form>
                </div>
                <div className="register-main">
                    <button onClick={() => clickedRegisterBtn()}>Register</button>
                    {(onClickRegBtn)? <Register callback={setOnClickRegBtn}/>: null}
                </div>
            </>
        </Route>
    )
}

export default Login

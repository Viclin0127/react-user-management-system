import React, {useState, useEffect} from 'react';
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
    const {isLogged} = useSelector(state => state.isLoggedReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        setEmail("");
        setPassword("");
    },[isLogged])

    const onSubmit = async e => {
        e.preventDefault();
        try{
            const result = await api.post("/api/auth", { email, password});
            const curUser = await api.get("/api/users/me", {headers: {"x-auth-token": result.data}});
            const store = {token: result.data, date: new Date(), curUser: curUser.data};
            localStorage.setItem("auth-token", JSON.stringify(store));
            dispatch(logIn(curUser.data));
        }
        catch(ex){
            alert("Invalid email or password, please try again...");
            setEmail("");
            setPassword("");
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
                            disabled={onClickRegBtn}
                            />
                        </div>
                        <div className="login-title">
                            <p>Password</p>
                            <input 
                            className="login-input-password"
                            type="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                            disabled={onClickRegBtn}
                            />
                        </div>
                        <button className="login-button" disabled={onClickRegBtn}>Log in</button>
                    </form>
                </div>
                <div className="register-main">
                    <p className="register-paragraph">If you don't have an account, please <button className="register-button" onClick={() => clickedRegisterBtn()}>Register</button> one...</p>
                    
                    {(onClickRegBtn)? <Register callback={setOnClickRegBtn}/>: null}
                </div>
            </>
        </Route>
    )
}

export default Login

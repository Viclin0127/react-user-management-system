import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postUser } from '../actions';

function Register({callback}) {
    const [userNameReg, setUserNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    // redux
    const newUser = useSelector(state => state.postUserReducer)
    const dispatch = useDispatch();

    const onSubmitReg = e => {
        e.preventDefault();
        const data = {name: userNameReg, email: emailReg, password: passwordReg}
        dispatch(postUser(data, callback));
        // pass callback func to reducer to close the register form
    }

    return (
        <form onSubmit={e => onSubmitReg(e)}>
            <div className="register-title">
                User Name
                <input value={userNameReg} onChange={e=>setUserNameReg(e.target.value)}/>
            </div>
            <div className="register-title">
                Email
                <input value={emailReg} onChange={e=>setEmailReg(e.target.value)}/>
            </div>
            <div className="register-title">
                Password
                <input type="password" value={passwordReg} onChange={e=>setPasswordReg(e.target.value)}/>
            </div>
            <button className="register-submit-button">Submit</button>
        </form>
    )
}

export default Register

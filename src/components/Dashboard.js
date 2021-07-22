import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {useSelector} from "react-redux";

function Dashboard() {
    const isLogged = useSelector(state => state.isLoggedReducer);

    return (
        <Route path="/dashboard">
            {(!isLogged)? <Redirect to="/login"/> : null}
            <div>
                User Management Sys
            </div>
        </Route>
    )
}

export default Dashboard;

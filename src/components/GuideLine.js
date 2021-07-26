import React from 'react';
import "../css/guideline.css";

function GuideLine() {
    return (
        <div className="guide-line">
            <p> - user name requires at least <span style={{color: "red"}}>3</span> chars</p>
            <p> - password requires at least <span style={{color: "red"}}>5</span> chars</p>
            <p className="guide-line-admin"> * If you want to log in as an admin, the password is the first five numbers of fibonacci nums</p>
        </div>
    )
}

export default GuideLine

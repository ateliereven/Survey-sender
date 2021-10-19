import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

const Header = (props) => {
    const auth = useSelector(state => state.auth);
    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return (<li className="flow-text"><a href="/auth/google"><i className="google icon pink-text" /><b>Login With Google</b></a></li>) // here we use ancor tag because we need to route the user to a different domain
            default: // there is an object in the state - meaning we're signed in
                return (
                    <React.Fragment>
                        <li><Payments /></li>
                        <li style={{ margin: '0 10px' }}><b>Credits: <span className="pink-text">{auth.credits}</span></b></li>
                        <li><a href="/api/logout"><i className="google icon" /><b>Logout</b></a></li>
                    </React.Fragment>
                )
        }
    }
    return (
        <div>
        <nav>
            <div className="nav-wrapper blue-grey lighten-2">
                <Link to={auth ? '/surveys' : '/' /*if auth is truthy - has an object - go to surveys, otherwise navigae to homepage */} className="left brand-logo active">
                    <i className="material-icons pink-text">dashboard</i>
                    MYSENDER</Link>
                <ul className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
        <br/>
        </div>
        
    )
}

export default React.memo(Header); //prevents rerendering when the app component rerenders
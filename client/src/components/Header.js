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
                return (<li><a href="/auth/google">Login With Google</a></li>) // here we use ancor tag because we need to route the user to a different domain
            default: // there is an object in the state - meaning we're signed in
                return (
                    <React.Fragment>
                    <li><Payments /></li>
                        <li style={{ margin: '0 10px' }}>Credits: {auth.credits}</li>
                    <li><a href="/api/logout">Logout</a></li>
                    </React.Fragment>
                )
        }
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={auth ? '/surveys' : '/' /*if auth is truthy - has an object - go to surveys, otherwise navigae to homepage */} className="left brand-logo">Emaily</Link>
                <ul className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    )
}

export default React.memo(Header); //prevents rerendering when the app component rerenders
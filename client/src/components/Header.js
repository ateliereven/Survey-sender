import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

import Payments from "./Payments";
import PeopleIcon from "../img/people-bw.png";
import logo from '../img/ms-logo.png'

const Header = (props) => {
    const auth = useSelector(state => state.auth);
    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return (<li><Link to="/login"><b className="white-text">Sign In</b></Link></li>)
            default:
                return (
                    <React.Fragment>
                        <li>
                            <Payments />
                            <b style={{ margin: '0 10px' }} className="badge">Credits: <span className="pink-text text-accent-2">{auth.credits}</span></b>
                        </li>
                        <li>
                            <div>
                                <a className="flow-text btn-flat blue-grey lighten-2 white-text" style={{ textTransform: "initial", fontSize: '16px' }} href="/api/logout"><b>Logout</b></a>
                            </div>
                        </li>
                    </React.Fragment>
                )
        }
    }
    // for side nav bar open on small screens:
    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, { edge: "right" });
    }, []);
    return (
        <div className="navbar-fixed" style={{ marginBottom: '10px' }}>
            <nav className="blue-grey lighten-2" >
                <div className="container nav-wrapper">
                    <Link to={auth ? '/surveys' : '/'} className="left brand-logo active" style={{paddingLeft: "10px"}}>
                        <img src={logo} style={{ paddingRight: "15px", height: "25px" }}/>
                        MySender</Link>
                    
                    <a href="#!" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><img src={PeopleIcon} alt='people-icon' style={{ paddingTop: "2px" }} height={'60px'} className="center brand-logo valign-center" /></li>
                        {renderContent()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav sidenav-close" style={{ width: '230px' }} id="mobile-demo">
                {renderContent()}
            </ul>
            <br />
        </div>

    )
}

export default React.memo(Header);
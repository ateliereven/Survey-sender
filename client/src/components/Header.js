import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

import Payments from "./Payments";

const Header = (props) => {
    const auth = useSelector(state => state.auth);
    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return (<li className="flow-text "><Link to="/signin"><b>Sign In</b></Link></li>)
            default:
                return (
                    <React.Fragment>
                        <li>
                            <Payments />
                            <b style={{ margin: '0 10px' }} className="badge">Credits: <span className="pink-text">{auth.credits}</span></b>
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
    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, { edge: "right" });
    }, []);
    return (
        <div>
            <nav>
                <div className="nav-wrapper blue-grey lighten-2">
                    <Link to={auth ? '/surveys' : '/'} className="left brand-logo active" style={{paddingLeft: "10px"}}>
                        <i className="material-icons pink-text">dashboard</i>
                        MYSENDER</Link>
                    <a href="#!" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
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
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

import Payments from "./Payments";
import logo from '../img/ms-logo.png'

const Header = () => {
    const auth = useSelector(state => state.auth);
    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return (
                    <>
                        <li>
                            <a href="#product" className="btn-flat blue-grey lighten-2 white-text center">Product</a>
                        </li>
                        <li>
                            <Link to="/login" className="btn-flat blue-grey lighten-2 white-text center">
                                Sign In
                            </Link>
                        </li>
                        <li><Link to="/login/demo" className="btn flow-text">
                            Try Demo
                        </Link>
                        </li>
                    </>
                )
            default:
                return (
                    <>
                        <li>
                                <a href="/api/logout">
                                    Logout
                                </a>
                        </li>
                    </>
                );
        };
    };
    const renderMobileContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return;
            default:
                return (
                    <>
                    <li>
                            <a>
                                <span
                                className="mr-2 left new badge"
                                style={{marginLeft: '0px'}}
                                data-badge-caption="credits"
                                >
                                {auth.credits}
                                </span>
                                <Payments credits={auth.credits} />
                            </a>
                        </li>
                        <li>
                            <a  className="action-btn">
                            New survey
                            <Link to="/surveys/new" className="btn-floating btn-small pink accent-2 ml-2">
                            <i className="material-icons">add</i>
                                </Link>
                                </a>
                        </li>
                        </>
                );
        };
    };

    // for side nav bar open on small screens:
    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, { edge: "right" });
    }, []);

    return (
        <header className="navbar-fixed z-depth-2 mb-2">
            <nav className="blue-grey lighten-2" >
                <div className="nav-wrapper">
                    <Link to={auth ? '/surveys' : '/'} className="left brand-logo active pink-text text-accent-2 ml-3">
                        <i><img src={logo} alt="logo" style={{ paddingRight: "15px", height: "22px" }} />
                        MySender</i></Link>
                    <a href="#!" data-target="mobile" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down mr-3">
                        {renderContent()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav sidenav-close" style={{ width: '230px' }} id="mobile">
                {renderMobileContent()}
                {renderContent()}
            </ul>
        </header>

    )
}

export default React.memo(Header);
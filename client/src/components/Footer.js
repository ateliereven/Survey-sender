import React from "react";
import GithubLogo from "../img/iconmonstr-github-1.svg";
import logo from '../img/ms-logo.png'

const Footer = () => {
    return (
        <footer className="pt-2">
            <div className="container valign-wrapper">
                <div className="pr-3">
                    <img src={logo} alt="logo" className="pr-1" height={'15px'}/>
                    <b>&copy;</b>
                    2022
                </div>
                <div className="valign-wrapper">
                    View project code
                    <i className="material-icons pink-text text-accent-3">arrow_forward</i>
                    <a href="https://github.com/ateliereven/Survey-sender" target="blank"><img src={GithubLogo} alt='github' className="py-1" height={'40px'} />
                    </a>
                </div>

            </div>
        </footer>
    )
}

export default Footer;
import React from "react";
import { Link, useHistory } from "react-router-dom";

import Modal from "../Modal";
import AuthForm from "./AuthForm";
import GoogleLogo from "../../img/Google__G__Logo.svg";

const SignIn = () => {
    const history = useHistory();

    const renderActions = () => {
        return (
            <React.Fragment>
                <span><b>Don't have an account?</b></span>  <Link style={{ marginLeft: '10px' }} to='/signup' className="btn pink accent-3 white-text"><b>Sign Up</b></Link>
                <Link to='/' style={{ marginLeft: '30px' }} className="btn grey white-text right">Cancel</Link>
            </React.Fragment>
        )
    }

    const renderContent = () => {
        return (
            <div className="row">
                <ul className="center-align col s6 offset-s3">
                    <li className="card-panel grey lighten-4">
                        <a href="/auth/google" className="valign-wrapper black-text center-align"><img src={GoogleLogo} alt='G' style={{ paddingRight: '10px' }} />Login With Google</a>
                    </li>
                    or
                    <li className="card-panel grey lighten-4 left-align">
                        <AuthForm button={signInButton()} emailPlaceholder="Please enter the email you signed-up with" passPlaceholder="Please enter the password you signed-up with" />
                    </li>
                </ul>
            </div>
        )
    }

    const signInButton = () => {
        return (
            <button className="teal btn-flat white-text">
                <b>Sign in</b>
            </button>
        )
    }

    return (
        //passing details down props to make Modal reusable:
        <Modal
            title="Log in to Your Account"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push('/')}
        />
    )
}

export default SignIn;

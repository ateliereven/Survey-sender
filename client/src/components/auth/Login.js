import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Modal from "../Modal";
import AuthForm from "./AuthForm";
import GoogleLogo from "../../img/Google__G__Logo.svg";
import { signinUser, signupUser } from "../../actions";

//component has two rendering states - one for sign in and the other for sign up
const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [isSignup, setIsSignup] = useState(false);
    // to toggle isSignup state:
    const toggleIsSignUp = () => {
        setIsSignup(prevIsSignup => !prevIsSignup);
    }

    const renderActions = () => {
        return (
            <React.Fragment>
                <span><b>{!isSignup ? "Don't have an account?" : "Have an account?"}</b></span>
                <button style={{ marginLeft: '10px' }} className={`btn ${!isSignup ? 'pink accent-3' : 'teal'}  white-text`} onClick={() => toggleIsSignUp()}>
                    <b>{!isSignup ? 'Sign Up' : 'Sign In'}</b>
                </button>
                <Link to='/' style={{ marginLeft: '30px' }} className="btn grey white-text right">Cancel</Link>
            </React.Fragment>
        )
    }

    const renderContent = () => {
        return (
            <div className="row">
                <ul className="center-align col s12 m6 offset-m3" style={{ marginTop: '0', marginBottom: '0' }}>
                    <i className='small material-icons pink-text text-accent-3 valign-center'>account_circle</i>
                    {!isSignup && <li className="card-panel grey lighten-4">
                        <a href="/auth/google" className="valign-wrapper black-text center-align">
                            <img src={GoogleLogo} alt='G' style={{ paddingRight: '10px' }} />Login With Google
                        </a>
                    </li>}
                    {!isSignup && 'or'}
                    <li className="card-panel grey lighten-4 left-align">
                        <AuthForm
                            onSubmit={onSubmit}
                            emailPlaceholder="Please enter the email you signed-up with"
                            passPlaceholder="Please enter the password you signed-up with"
                            isSignup={isSignup}
                        />
                    </li>
                </ul>
            </div>
        )
    }

    const onSubmit = (values) => {
        if (isSignup) {
            dispatch(signupUser(values, history));
        } else {
            dispatch(signinUser(values, history));
        }

    }

    return (
        //passing details down props to Modal component:
        <Modal
            title={!isSignup ? "Log in to Your Account" : "Create a new Account"}
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push('/')}
        />
    )
}

export default Login;

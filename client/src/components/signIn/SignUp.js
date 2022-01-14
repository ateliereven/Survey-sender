import React from "react";
import { useHistory } from "react-router-dom";

import Modal from "../Modal";
import AuthForm from "./AuthForm";

const SignUp = () => {

    const history = useHistory();

    const renderContent = () => {
        return (
            <div className="row">
                <ul className=" col s6 offset-s3">
                    <li className="card-panel grey lighten-4">
                        <AuthForm button={signUpButton()} emailPlaceholder="Please enter your email address" passPlaceholder="Please enter a password (8 characters)"/>
                        </li>
                </ul>
            </div>
        )
    }

    const signUpButton = () => {
        return (
            <button className="btn pink accent-3 white-text">
                <b>Sign up</b> 
            </button>
        )
    }

    return (
        //passing details down props to make Modal reusable:
        <Modal
            title="Create a new Account"
            content={renderContent()}
            onDismiss={() => history.push('/signin')}
        />
    )
}

export default SignUp;
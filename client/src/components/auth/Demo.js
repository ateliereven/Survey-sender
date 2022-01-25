import React from "react";
import { useHistory, Link } from "react-router-dom";

import Modal from "../Modal";
import GoogleLogo from "../../img/Google__G__Logo.svg";

const Demo = () => {
    const history = useHistory();

    const renderContent = () => {
        return (
            <div className="row">
                <div className="col s10 m6 offset-s1 offset-m3">
                    <div className="card-panel grey lighten-4">
                        <p>Enter email: <b>mysurvey.example@gmail.com</b></p>
                        <p>Enter password: <b>mysurveypass</b></p>
                    </div>
                </div>
            </div>

        )
    }
    const renderActions = () => {
        return (
            <div>
                <a href="/auth/google" className="btn white valign-wrapper black-text center-align">
                    <img src={GoogleLogo} alt='G' style={{ paddingRight: '10px', height: '14px' }} />Login With Google
                </a>
                <Link to='/' style={{ marginLeft: '30px' }} className="btn grey white-text right">Cancel</Link>
            </div>
        )
    }

    return (
        <Modal
            title="Log in to Google with our free demo account"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push('/')}
        />
    )
}

export default Demo;
import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import AuthForm from "./AuthForm";
import GoogleLogo from "../../img/Google__G__Logo.svg";
import { loginUser } from "../../actions";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);

    const auth = useSelector(state => state.auth);

    const renderActions = () => {
        return (
            <React.Fragment>
                <span><b>Don't have an account?</b></span>  <button style={{ marginLeft: '10px' }} className="btn pink accent-3 white-text" onClick={()=>setIsSignup(true)}><b>Sign Up</b></button>
                <Link to='/' style={{ marginLeft: '30px' }} className="btn grey white-text right">Cancel</Link>
            </React.Fragment>
        )
    }

    const renderContent = () => {
        return (            
            <div className="row">
                <ul className="center-align col s6 offset-s3" style={{marginTop: '0', marginBottom: '0'}}>
                    <i className='small material-icons pink-text text-accent-3 valign-center'>account_circle</i>
                    {!isSignup && <li className="card-panel grey lighten-4">
                        <a href="/auth/google" className="valign-wrapper black-text center-align"><img src={GoogleLogo} alt='G' style={{ paddingRight: '10px' }} />Login With Google</a>
                    </li>}
                        or
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
        console.log("I was submitted");
        dispatch(loginUser(values));
        if (auth) history.push('/surveys');
    
    }

    return (
        //passing details down props to make Modal reusable:
        <Modal
            title="Log in to Your Account"
            content={renderContent()}
            actions={!isSignup && renderActions()}
            onDismiss={() => isSignup ? setIsSignup(false) : history.push('/')}
        />
    )
}

export default Login;

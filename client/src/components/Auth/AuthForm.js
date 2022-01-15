import React, { useState } from "react";
import { Field, Form } from 'react-final-form';
import validateEmails from "../../utils/validateEmails";
import validatePassword from "../../utils/validatePassword";

const AuthForm = (props) => {
    //Return an input element to the component prop, and hook it with relevant properties deconstructed from formProps:
    const inputField = ({ input, label, meta: { error, touched } }) => {
        return <div>
            <label style={{ fontSize: "15px" }}>{label}</label>
            <input style={{ marginBottom: '5px' }} {...input} placeholder={label === "Email Address" ? props.emailPlaceholder : props.passPlaceholder} />
            <div className="red-text" style={{ marginBottom: '15px' }}>
                {touched && error}
            </div>
        </div>
    };
    // the field attributes:
    const FIELDS = [
        { label: "Email Address", name: "email" },
        { label: "Password", name: "password" },
        { label: "Repeat Password", name: "confirmPassword" },
    ];

    const [showPassword, setShowPassword] = useState(false);
    // to toggle showPassword icon:
    const handleShowPassword = () => {
        setShowPassword(prevShowPass => !prevShowPass);
    }
    const onSubmit = (formValues) => {
        console.log(formValues); //returns all the values form the form
        props.onSubmit(formValues); //calls the function from parent component
        console.log("I was submitted too")
    }

    return (
        //form is rendered according to signIn / signUp
        <Form
            onSubmit={onSubmit}
            validate={(formValues) => {
                const errors = {};
                //if no emails have been entered provide an empty string. if there are emails run the function:
                errors.email = validateEmails(formValues.email || '');
                errors.password = validatePassword(formValues.password || '');
                // if sign-up - confirm repeated password matches first password:
                if (formValues.confirmPassword && formValues.confirmPassword !== formValues.password) {
                    errors.confirmPassword = 'Passwords must be identical'
                }
                // to get a customised arror message for each field
                FIELDS.forEach(({ name, label }) => {
                    if (!formValues[name] && formValues[label]) {
                        errors[name] = `Please enter ${label.toLowerCase()}`
                    }
                })
                return errors;
            }}

            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field type="text" component={inputField} label={FIELDS[0].label} name={FIELDS[0].name} />
                    <i className="right small material-icons grey-text" style={{ cursor: 'pointer' }} onClick={() => handleShowPassword()}>{showPassword ? 'visibility_off' : 'visibility'}</i>
                    <Field type={showPassword ? "text" : "password"} component={inputField} label={FIELDS[1].label} name={FIELDS[1].name} />
                    {props.isSignup && <Field type={showPassword ? "text" : "password"} component={inputField} label={FIELDS[2].label} name={FIELDS[2].name} />}
                    <button type="submit" className={`${props.isSignup ? 'pink accent-3' : 'teal'} btn white-text`}>
                        <b>{props.isSignup ? 'Sign up' : 'Sign in'}</b>
                    </button>
                </form>
            )}
        />
    )
}

export default AuthForm;
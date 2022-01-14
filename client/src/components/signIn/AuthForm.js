import React from "react";
import { Field, Form } from 'react-final-form';
import validateEmails from "../../utils/validateEmails";

const AuthForm = (props) => {
    //Return an input element to the component prop, and hook it with relevant properties deconstructed from formProps:
    const inputField = ({ input, label, meta: { error, touched } }) => {
        return <div>
            <label style={{fontSize: "15px"}}>{label}</label>
            <input style={{ marginBottom: '5px' }} {...input} placeholder={label === "Email Address" ? props.emailPlaceholder : props.passPlaceholder}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    };
    // the field attributes:
    const FIELDS = [ 
        { label: "Email Adress", name: "email" },
        { label: "Password", name: "password" },
    ];
    const onSubmit = (formValues) => {
        props.onSubmit(); //calls the function from parent component
        console.log(formValues); //returns all the values form the form
    }

return (
    <Form
        onSubmit={onSubmit}
        validate={(formValues) => {
            const errors = {};
//if no emails have been entered provide an empty string. if there are emails run the function:
            errors.emails = validateEmails(formValues.emails || '')
// to get a customised arror message for each field
            FIELDS.forEach(({ name, label }) => { 
                if (!formValues[name]) { 
                    errors[name] = `Please enter ${label.toLowerCase()}`
                }
            })

            return errors;
        }}

        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <Field type="text" component={inputField} label={FIELDS[0].label} name="email" />
                <Field type="password" component={inputField} label={FIELDS[1].label} name="password" />
                {props.button}
            </form>
        )}
    />
)
}

export default AuthForm;
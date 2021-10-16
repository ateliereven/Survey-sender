import React from "react";
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from './formFields'

const SurveyForm = (props) => {
    const renderFields = () => {
        return formFields.map(({ label, name }) => { //map over the array of fields and return 4 separate Field components
            return <Field key={name} type="text" component={SurveyField} label={label} name={name} /> //need the key property because it's a list
        })
    };
    const onSubmit = () => {
        props.onSurveySubmit(); //calls the function from SurveyNew
    }
    return (
        <div>
            <form onSubmit={props.handleSubmit(onSubmit)}>
                {renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                <button className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>
            </form>
        </div>
    )
};

const validate = (formValues) => {
    const errors = {};

    errors.recipients = validateEmails(formValues.recipients || '') //if no emails have been entered provide an empty string. if there are emails run the function

    formFields.forEach(({ name, label }) => { // to get a customised arror message for each field
        if (!formValues[name]) { // to reference a property/key on the object use square brackets
            errors[name] = `Please enter ${label.toLowerCase()}`
        }
    })
    return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);
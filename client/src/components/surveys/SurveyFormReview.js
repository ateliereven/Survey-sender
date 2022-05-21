import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

import formFields from "./formFields";
import { submitSurvey } from '../../actions';

const SurveyFormReview = ({ onCancel, history }) => {
    const formValues = useSelector(state => state.form.surveyForm.values);
    const numOfCredits = useSelector(state => state.auth.credits);
    const dispatch = useDispatch();

    const reviewFields = formFields.map(({ name, label }) => {
        return <div key={name} style={{ paddingBottom: '1em' }}>
            <label>{label}</label>
            <h6><i>{formValues[name]}</i></h6>
            <div className="divider"></div>
        </div >
    })
    const sendSurvey = () => {
        if (numOfCredits === 0) {
            alert('Please add credits first')
        }
        return dispatch(submitSurvey(formValues, history))
    }
    return (
        <div className="container">
            <div>
            <h6>Please confirm your entries:</h6>
                <div className="card-panel white">
            {reviewFields}
                </div>
            
            <button className="amber lighten-1 white-text btn-flat" onClick={onCancel}>
                <i className="material-icons left">arrow_back</i>
                Back
                </button>
                <button className="teal btn-flat white-text right" onClick={() => sendSurvey()}>
                Send Survey
                <i className="material-icons right">send</i>
            </button>
            </div>
            <br />
        </div>
    )
}

export default withRouter(SurveyFormReview);
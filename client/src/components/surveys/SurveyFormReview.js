import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

import formFields from "./formFields";
import { submitSurvey } from '../../actions';

const SurveyFormReview = ({ onCancel, history }) => {
    const formValues = useSelector(state => state.form.surveyForm.values);
    //console.log(formValues);
    const numOfCredits = useSelector(state => state.auth.credits);
    const dispatch = useDispatch();

    const reviewFields = formFields.map(({ name, label }) => {
        return <div key={name} className="white">
            <label><h6>{label}</h6></label>
            <div><b>{formValues[name]}</b></div>
            <div className="divider"></div>
        </div>
    })
    const sendSurvey = () => {
        if (numOfCredits === 0) {
            alert('Please add credits first')
        }
        return dispatch(submitSurvey(formValues, history))
    }
    return (
        <div>
            <div>
            <h5>Please comfirm your entries:</h5>
            {reviewFields}
            <br/>
            <button className="amber lighten-1 white-text btn-flat" onClick={onCancel}>
                <i className="material-icons left">arrow_back</i>
                Back
                </button>
                <button className="green lighten-2 btn-flat white-text right" onClick={() => sendSurvey()}>
                Send Survey
                <i className="material-icons right">send</i>
            </button>
            </div>
        </div>
    )
}

export default withRouter(SurveyFormReview);
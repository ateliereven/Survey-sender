import React from "react";
import { useState } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import newMessage from '../../img/undraw_new_message_re_fp03.svg';
import delivered from '../../img/undraw_messenger_re_8bky.svg';

const SurveyNew = () => {
    const [showFormReview, setShowFormReview] = useState(false);
    const renderContent = () => {
        if (showFormReview) {
            return (
                <div className="row">
                    <SurveyFormReview onCancel={() => { setShowFormReview(false) }} />
                    <img src={delivered} alt="delivered" className="col l3 offset-l5 s7  offset-s3"></img>
                </div>)
        }
        return (
            <div className="row">
                <SurveyForm onSurveySubmit={() => { setShowFormReview(true) }} />
                <img src={newMessage} alt="new message" className="col l4 offset-l4 s9  offset-s1"></img>
            </div>
        )
    }

    return (
        <section className="container">
            {renderContent()}
        </section>
    )
}

export default reduxForm({ // to clear surveyForm when we navigate out of the page.
    form: 'surveyForm'
})(SurveyNew);
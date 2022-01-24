import React from "react";
import { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
    const [showFormReview, setShowFormReview] = useState(false);
const renderContent = () => {
    if (showFormReview) {
        return <SurveyFormReview onCancel={() => { setShowFormReview(false) }}/>
    }
    return <SurveyForm onSurveySubmit={() => { setShowFormReview(true) }}/>
}
    
return (
    <div className="container footer-padding">
        {renderContent()}
    </div>
)
}

export default reduxForm({ // to clear surveyForm when we navigate out of the page.
    form: 'surveyForm'
})(SurveyNew);
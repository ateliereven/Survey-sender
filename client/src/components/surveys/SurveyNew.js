import React from "react";
import { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
    const [showFormReview, setShowFormReview] = useState(false);
const renderContent = () => {
    if (showFormReview) { // if showFormReview is truthy
        return <SurveyFormReview onCancel={() => { setShowFormReview(false) }} />
    }
    return <SurveyForm onSurveySubmit={() => { setShowFormReview(true)}}/>
}
    
return (
    <div className="container">
        {renderContent()}
    </div>
)
}

export default reduxForm({ // to clear surveyForm when we navigate out of the page. destroyOnUnmount in true by default
    form: 'surveyForm'
})(SurveyNew);
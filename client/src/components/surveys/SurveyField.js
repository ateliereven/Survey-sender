import React from "react";

const SurveyField = ({ input, label, meta: {error, touched} }) => { // desturcuring input and label from props, nested distructuring of error and touched from meta
    return <div>
        <label>{label}</label>
        <input style={{ marginBottom: '5px'}} {...input}/*taking all props and assigning them as attributes*/ />
        <div className="red-text" style={{ marginBottom: '20px'}}>
            {touched && error /*if touched is true and error is a string shows error, if it's false stops execution */}
        </div>
    </div>
};

export default SurveyField;
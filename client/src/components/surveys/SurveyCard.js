import React from "react";

const SurveyCard = (props) => {
    return (
        <div className="card blue-grey darken-2 hoverable">
            <div className="card-content white-text">
                {props.link}
                <span className="card-title">{props.title}</span>
                <h6>{props.body}</h6>
                {props.content}
            </div>
            {props.actions}
        </div>
    )
}

export default SurveyCard;
import React from "react";

const SurveyCard = (props) => {
    return (
        <div className="col s12 l6">
        <div className="card blue-grey darken-3 hoverable">
            <div className="card-content white-text">
                {props.link}
                <span className="card-title">{props.title}</span>
                    <h6><i>{props.body}</i></h6>
                {props.content}
            </div>
            {props.actions}
            </div>
            </div>
    )
}

export default SurveyCard;
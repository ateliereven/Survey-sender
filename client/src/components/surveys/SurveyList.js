import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSurveys } from "../../actions";

const SurveyList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSurveys());
    }, [dispatch])
    const surveys = useSelector(state => state.surveys);
    console.log(surveys);
    const renderSurveys = surveys.reverse().map(survey => {
        return (
            <div className="card blue-grey darken-1" key={survey._id}>
                <div className="card-content white-text">
                    <span className="card-title">{survey.title}</span>
                    <p>{survey.body}</p>
                    <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
                </div>
                <div className="card-action">
                    <a href="#!">Yes: {survey.yes}</a>
                    <a href="#!">No: {survey.no}</a>
                </div>
            </div>
        )
    })
    return (
        <div>
            {renderSurveys}
        </div>
    )
};

export default SurveyList;
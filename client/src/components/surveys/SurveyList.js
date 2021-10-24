import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSurveys } from "../../actions";
import SurveyResultChart from "./SurveyResultChart";
import "../../css/SurveyList.css";

const SurveyList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSurveys());
    }, [dispatch])
    const surveys = useSelector(state => state.surveys);

    const renderSurveys = () => {
        if (surveys.length === 0) {
            return (
                <div className="card blue-grey darken-2">
                    <div className="card-content white-text">
                        <span className="right"><Link to="/surveys/new">
                            <i className="material-icons pink-text medium">add_circle_outline</i>
                        </Link>
                        </span>
                        <span className="card-title">No Surveys Yet...</span>
                        <h6>Create your first survey</h6>

                    </div>
                </div>
            )
        }
        return (
            surveys.reverse().map(survey => {
                return (
                    <div className="card blue-grey darken-2" key={survey._id}>
                        <div className="card-content white-text">
                            <Link to={`/surveys/delete/${survey._id}`} className="right btn-flat white-text">
                                <i className="material-icons">delete</i>
                            </Link>
                            <span className="card-title">{survey.title}</span>
                            <h6>{survey.body}</h6>
                            <SurveyResultChart
                                data={[survey.strongpositive, survey.positive, survey.neutral, survey.negative, survey.strongnegative]}
                                height='150px'
                                width='150px'
                            />
                            <p className="right">Sent on: <i>{new Date(survey.dateSent).toLocaleDateString()}</i></p>
                            <br />
                            <p className="right">Last responded on: <i>{survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : 'no votes yet'}</i></p>

                        </div>
                        <div className="card-action">
                            <a href="#!" className="strong-positive"><i className="material-icons">sentiment_very_satisfied</i> {survey.strongpositive}</a>
                            <a href="#!" className="positive"><i className="material-icons">sentiment_satisfied</i> {survey.positive}</a>
                            <a href="#!" className="neutral"><i className="material-icons">sentiment_neutral</i> {survey.neutral}</a>
                            <a href="#!" className="negative"><i className="material-icons">sentiment_dissatisfied</i> {survey.negative}</a>
                            <a href="#!" className="strong-negative"><i className="material-icons">sentiment_very_dissatisfied</i> {survey.strongnegative}</a>
                            <p className="right white-text"><b>TOTAL VOTES: {survey.strongpositive + survey.positive + survey.neutral + survey.negative + survey.strongnegative}</b></p>
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            {renderSurveys()}
        </div>
    )
};

export default SurveyList;
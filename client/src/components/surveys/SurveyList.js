import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSurveys, /*deleteSurvey*/ } from "../../actions";
import { Link } from "react-router-dom";

const SurveyList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSurveys());
    }, [dispatch])
    const surveys = useSelector(state => state.surveys);

    const renderSurveys = () => {
        if (surveys.length === 0) {
            return (
                <div className="card blue-grey darken-1">
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
                    <div className="card blue-grey darken-1" key={survey._id}>
                        <div className="card-content white-text">
                            <Link to={`/surveys/delete/${survey._id}`} className="right btn-flat white-text">
                                <i className="material-icons">delete</i>
                            </Link>
                            <span className="card-title">{survey.title}</span>
                            <p>{survey.body}</p>
                            <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
                            <br />
                            <p className="right">Last responded on: {new Date(survey.lastResponded).toLocaleDateString()}</p>
                        </div>
                        <div className="card-action">
                            <a href="#!"><i className="material-icons">sentiment_very_satisfied</i> {survey.yes}</a>
                            <a href="#!"><i className="material-icons">sentiment_very_dissatisfied</i> {survey.no}</a>
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
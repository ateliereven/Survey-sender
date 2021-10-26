import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSurveys } from "../../actions";
import SurveyCard from "./SurveyCard";
import SurveyResultChart from "./SurveyResultChart";

const SurveyList = () => {
    const dispatch = useDispatch();
    const dispatchFetchSurveys = useCallback(() => dispatch(fetchSurveys()), [dispatch]);
    useEffect(() => {
        dispatchFetchSurveys();
    }, [dispatchFetchSurveys])
    
    const surveys = useSelector(state => state.surveys);

    const renderSurveys = () => {
        if (surveys.length === 0) {
            const linkToNew = () => {
                return <span className="right"><Link to="/surveys/new">
                    <i className="material-icons pink-text medium">add_circle_outline</i>
                </Link>
                </span>
            }
            return (
                <SurveyCard
                    link={linkToNew()}
                    title='No Surveys Yet...'
                    body='Create your first survey'
                />
            )
        }
        return (
            //map over all surveys and return a survey card with details for each survey:
            surveys.reverse().map(survey => {

                const linkToDelete = () => {
                    return <Link to={`/surveys/delete/${survey._id}`} className="right btn-flat white-text">
                        <i className="material-icons">delete</i>
                    </Link>
                }

                const votesArray = [survey.strongpositive, survey.positive, survey.neutral, survey.negative, survey.strongnegative];
                const colorsArray = ['#15fd4f', '#b5fc43', '#ffea00', '#ffae35', '#ff4c16'];
                const iconNamesArray = ['sentiment_very_satisfied', 'sentiment_satisfied', 'sentiment_neutral', 'sentiment_dissatisfied', 'sentiment_very_dissatisfied'];
                const renderIconOfVotes = (num) => {
                    return (
                        <a href="#!" style={{ color: colorsArray[num] }}><i className="material-icons">{iconNamesArray[num]}</i><b> {votesArray[num]}</b></a>
                    )
                };
                const matchColor = () => {
                    if (Math.max(...votesArray) === survey.strongpositive) {
                        return colorsArray[0];
                    } if (Math.max(...votesArray) === survey.positive) {
                        return colorsArray[1];
                    } if (Math.max(...votesArray) === survey.neutral) {
                        return colorsArray[2];
                    } if (Math.max(...votesArray) === survey.negative) {
                        return colorsArray[3];
                    } else {
                        return colorsArray[4]
                    }
                }
                const content = () => {
                    return <React.Fragment>
                        <SurveyResultChart
                            data={votesArray}
                            height={180}
                            width={180}
                            colors={colorsArray}
                        />
                        <p className="right">Sent on: <i>{new Date(survey.dateSent).toLocaleDateString()}</i></p>
                        <br />
                        <p className="right">Last responded on: <i>{survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : 'no votes yet'}</i></p>
                    </React.Fragment>
                }
                const actions = () => {
                    return <div className="card-action">
                        {renderIconOfVotes(0)}
                        {renderIconOfVotes(1)}
                        {renderIconOfVotes(2)}
                        {renderIconOfVotes(3)}
                        {renderIconOfVotes(4)}
                        <p className="right white-text"><b style={{ color: matchColor() }}>TOTAL VOTES: {votesArray.reduce((a, b) => a + b, 0)}</b></p>
                    </div>
                }

                return (
                    <SurveyCard
                        key={survey._id}
                        link={linkToDelete()}
                        title={survey.title}
                        body={survey.body}
                        content={content()}
                        actions={actions()}
                    />
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
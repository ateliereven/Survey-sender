import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import '../../scss/SurveyList.scss';

import { fetchSurveys } from "../../actions";
import SurveyCard from "./SurveyCard";
import SurveyResultChart from "./SurveyResultChart";

const SurveyList = ({ sortSelection }) => {
    const dispatch = useDispatch();
    const dispatchFetchSurveys = useCallback(() => dispatch(fetchSurveys()), [dispatch]);
    const surveys = useSelector(state => state.surveys);
    
    useEffect(() => {
        // fetching surveys from database:
        dispatchFetchSurveys();
    }, [dispatchFetchSurveys]);

    useEffect(() => {
        // for displaying tooltips:
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems);
    });
    
    const renderSurveys = () => {
        if (surveys.length === 0) {
            const linkToNew = () => {
                return <span className="right"><Link to="/surveys/new">
                    <i className="material-icons medium">add_circle_outline</i>
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
            surveys.sort((a, b) => {return (new Date(b.lastResponded) - new Date(a.lastResponded))}).map(survey => {

                const linkToDelete = () => {
                    return <Link
                        to={`/surveys/delete/${survey._id}`}
                        className="right btn-flat white-text delete-btn"
                    >
                        <i className="material-icons">delete</i>
                    </Link>
                }

                const votesByType = {
                    'strong positive': {
                        vote: survey.strongpositive,
                        color: '#5fe043',
                        iconName: 'sentiment_very_satisfied'
                    },
                    'positive': {
                        vote: survey.positive,
                        color: '#b4ff3b',
                        iconName: 'sentiment_satisfied'
                    },
                    'neutral': {
                        vote: survey.neutral,
                        color: '#ffff3c',
                        iconName: 'sentiment_neutral'
                    },
                    'negative': {
                        vote: survey.negative,
                        color: '#ffce2c',
                        iconName: 'sentiment_dissatisfied'
                    },
                    'strong negative': {
                        vote: survey.strongnegative,
                        color: '#ff3c3c',
                        iconName: 'sentiment_very_dissatisfied'
                    }
                }
                const votesArray = [];
                const colorsArray = [];
                    for (let type in votesByType) {
                        votesArray.push(votesByType[type].vote);
                        colorsArray.push(votesByType[type].color);
                };
                const totalVotes = votesArray.reduce((a, b) => a + b, 0);
                const votesRate = () => { return totalVotes > 0 ? Math.round(totalVotes / survey.numOfRecipients * 100) : 0 };

                const renderIconOfVotes = () => {
                    return Object.entries(votesByType).map(type => {
                        return (
                            <a
                                key={type[0]}
                                style={{ color: type[1].color }}
                                className="tooltipped votes-icon"
                                data-position="top"
                                data-tooltip={type[0]}
                            >
                                <i className="material-icons">{type[1].iconName}</i>
                                 {type[1].vote}
                            </a>
                        )
                    });
                };
                const matchColor = () => {
                    for (let type in votesByType) {
                        if (Math.max(...votesArray) === votesByType[type].vote) return votesByType[type].color;
                    };
                };

                const content = () => {
                    return <React.Fragment>
                        <div className="py-1">
                        <SurveyResultChart
                            data={votesArray}
                            height={180}
                            width={180}
                            colors={colorsArray}
                            labels={Object.keys(votesByType)}
                            />
                        </div>
                        <p className="right">
                            Sent on:
                            <i>{new Date(survey.dateSent).toLocaleDateString()}</i>
                        </p>
                        <br />
                        <p className="right">
                            Last responded on:
                            <i>
                                {survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : 'no votes yet'}
                            </i>
                        </p>
                        <br />
                        <p className="right">
                            Response rate: 
                            <progress
                                className="ml-1 tooltipped"
                                value={totalVotes}
                                max={survey.numOfRecipients}
                                data-position="right"
                                data-tooltip={`${votesRate()}%`}
                            >
                                {votesRate()}%
                            </progress>
                        </p>

                    </React.Fragment>
                }
                const actions = () => {
                    return <div className="card-action">
                        {renderIconOfVotes()}
                        <p>
                            <b style={{ color: matchColor() }}>
                                TOTAL VOTES: {totalVotes}
                            </b>
                        </p>
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
        <div className='col l9 m8 s12'>
            {renderSurveys()}
        </div>
    )
};

export default SurveyList;
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SurveyList from "./surveys/SurveyList";
import Payments from "./Payments";

const Dashboard = () => {

    const auth = useSelector(state => state.auth);
    const numOfSurveys = useSelector(state => state.surveys.length);

    return (
        <section className="row footer-padding">
            <div className="col s12 m4 l3">
                <div className="p-2 card">
                    <h6>Welcome!</h6>
                    <p className="pb-1">You have {numOfSurveys} current surveys</p>
                    {auth &&
                        <div>
                            <p><span className="mr-2 my-1 left new badge" data-badge-caption="credits">{auth.credits}</span></p>
                            <Payments credits={auth.credits}/>
                        </div>
                    }
                    <div className="action-btn py-1">
                    <p className="tab col my-1 pink-text text-accent-2">Create new survey</p>
                        <Link to="/surveys/new" className="btn-floating btn-small pulse">
                            <i className="material-icons">add</i>
                        </Link>
                    </div>
                    
                </div>
            </div>
            <SurveyList />
        </section>
    )
}

export default Dashboard;
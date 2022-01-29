import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {

    return (
        <section className="container footer-padding">
            <div className="row card horizontal grey lighten-5" style={{ padding: '0.3em' }}>
                <h6 className="tab grey lighten-5 col">Create Survey</h6>
                <div className="action-btn ">
                    <Link to="/surveys/new" className="btn-floating btn-medium pink pulse">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
            <SurveyList />
        </section>
    )
}

export default Dashboard;
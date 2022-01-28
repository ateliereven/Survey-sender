import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactGA from 'react-ga';
import * as actions from '../actions';
import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";
import Landing from "./landing/Landing";
import Login from "./auth/Login";
import Demo from "./auth/Demo";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyDelete from "./surveys/SurveyDelete";
import Thankyou from "./Thankyou";
import RouteChangeTracker from "../utils/RouteChangeTracker";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchUser());
    }, [dispatch])


    //google analytics:
    const TRACKING_ID_1 = "UA-217875414-1";
    const TRACKING_ID_2 = "G-SLP4RGLEHP";
    ReactGA.initialize([{ trackingId: TRACKING_ID_1 }, { trackingId: TRACKING_ID_2 }]);
    ReactGA.event({
        category: 'User',
        action: 'Created an Account'
    });
    ReactGA.exception({
        description: 'An error ocurred',
        fatal: true
    });


    return (
        <div className={`app-body`}>
            <Router>
                <div>
                    <RouteChangeTracker />
                    <Route path={["/", "/surveys", "/surveys/new", "/surveys/delete/:id", "/login", "/login/demo"]} exact component={Header} />
                    <Route path={["/", "/surveys", "/surveys/new", "/surveys/delete/:id", "/login", "/login/demo"]} exact component={Footer} />
                    <Route path={["/", "/login", "/login/demo"]} exact component={Landing} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/login/demo" exact component={Demo} />
                    <Route path={["/surveys", "/surveys/delete/:id"]} exact component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                    <Route path="/surveys/delete/:id" exact component={SurveyDelete} />
                    <Route path="/surveys/thanks/:id/:choice" exact component={Thankyou} />
                </div>
            </Router>
        </div>
    )
}

export default App;
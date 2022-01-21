import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../actions';
import "../css/App.css";


import Header from "./Header";
import Footer from "./Footer";
import Landing from "./landing/Landing";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyDelete from "./surveys/SurveyDelete";
import Thankyou from "./Thankyou";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchUser());
    }, [dispatch])

    // setting a background image class to the "/" path:
    const [isHome, setIsHome] = useState(true);
    useEffect(() => {
        const getCurrUrl = window.location.pathname;
        getCurrUrl === "/" ? setIsHome(true) : setIsHome(false)
    }, [isHome])

    return (
        <div className={`app-body ${isHome && "landing"}`}>
            <Router>
                <div>
                    <Route path={["/", "/surveys", "/surveys/new", "/surveys/delete/:id", "/login"]} exact component={Header} />
                    <Route path={["/", "/surveys", "/surveys/new", "/surveys/delete/:id", "/login"]} exact component={Footer} />
                    <Route path={["/", "/login"]} exact component={Landing} />
                    <Route path="/login" exact component={Login} />
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
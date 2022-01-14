import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../actions';


import Header from "./Header";
import Landing from "./landing/Landing";
import SignIn from "./signIn/SignIn";
import SignUp from "./signIn/SignUp";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyDelete from "./surveys/SurveyDelete";
import Thankyou from "./Thankyou";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchUser());
    }, [dispatch])
    return (
        <div className="container">
            <Router>
                <div>
                    <Route path={["/", "/surveys", "/surveys/new", "/surveys/delete/:id", "/signin", "/signup"]} exact component={Header} />
                    <Route path={["/", "/signin", "/signup"]} exact component={Landing} />
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/signup" exact component={SignUp} />
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
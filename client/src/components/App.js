import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../actions';


import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyDelete from "./surveys/SurveyDelete";
//import history from "../history";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchUser());
    }, [dispatch])
    return (
        <div className="container">
            <Router>
                <div>
                    <Header />
                    <Route path="/" exact component={Landing} />
                    <Route path="/surveys" exact component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                    <Route path="/surveys/delete/:id" exact component={SurveyDelete} />
                </div>
            </Router>
        </div>
    )
}

export default App;
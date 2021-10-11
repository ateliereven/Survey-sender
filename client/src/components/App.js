import React, {useEffect} from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../actions';


import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


const App = () => {
    const dispatch = useDispatch(); // calling the dispatch function from the redux store
    useEffect(() => {
dispatch(actions.fetchUser()); // dispatching the action to the reducers
    }, [dispatch])
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/" exact component={Landing} />
                    <Route path="/surveys" exact component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
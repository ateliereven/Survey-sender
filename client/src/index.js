import './scss/index.scss';
import React from 'react';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
//for testing requests to server before setting up the frontend
//import axios from 'axios';  
//window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

reactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
 document.querySelector('#root'));
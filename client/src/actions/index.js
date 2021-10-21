import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: response.data
    })
};

// sends the token received from stripe api to the server:
export const handleToken = (token) => async dispatch => { 
    const response = await axios.post('/api/stripe', token);
    dispatch({ 
        type: FETCH_USER,
        payload: response.data
    })
};

//sends out the submitted survey:
export const submitSurvey = (formValues, history) => async dispatch => { 
    const response = await axios.post('/api/surveys', formValues);
    response.error ? alert('Please add credits first') : history.push('/surveys'); //fix code to show an alert
    dispatch({ type: FETCH_USER, payload: response.data }) 
}

//fetches the surveys for a specific user:
export const fetchSurveys = () => async dispatch => {  
    const response = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: response.data })
};

//deletes a survey for a specific user:
export const deleteSurvey = (survey) => async dispatch => {
    const response = await axios.delete(`/api/surveys/${survey._id}`);
    dispatch({ type: FETCH_SURVEYS, payload: response.data })
}
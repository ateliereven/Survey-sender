import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: response.data
    })
};

//sends out the user's sign-in/sign-up details:
export const loginUser = (formValues) => async dispatch => {
    const response = await axios.post('/api/login', formValues);
    dispatch({ type: FETCH_USER, payload: response.data })
}

//sends the token received from stripe api to the server:
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
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: response.data }) 
}

//fetches the surveys for a specific user:
export const fetchSurveys = () => async dispatch => {  
    const response = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: response.data })
};

//deletes a survey for a specific user:
export const deleteSurvey = (id) => async dispatch => {
    const response = await axios.delete(`/api/surveys/${id}`);
    dispatch({ type: FETCH_USER, payload: response.data });
    
}
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: response.data
    })
};

//sends out the user's sign-in details:
export const signinUser = (formValues, history) => async dispatch => {
    try {
        const response = await axios.post('/api/signin', formValues);
        history.push('/surveys');
        dispatch({ type: FETCH_USER, payload: response.data });
    } catch(error) {
        console.log(error);
    }  
}

//sends out the user's sign-up details:
export const signupUser = (formValues, history) => async dispatch => {
    try {
        const response = await axios.post('/api/signup', formValues);
        history.push('/surveys');
        dispatch({ type: FETCH_USER, payload: response.data });
    } catch (error) {
        console.log(error);
    }  
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
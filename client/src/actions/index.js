import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: response.data
    })
};

export const handleToken = (token) => async dispatch => { // sends the token received from stripe api to the server
    const response = await axios.post('/api/stripe', token);
    dispatch({ // assuming we get the exact user model as in fetchUser
        type: FETCH_USER,
        payload: response.data
    })
};

export const submitSurvey = (formValues, history) => async dispatch => { //sends out the submitted survey
    const response = await axios.post('/api/surveys', formValues);
    history.push('/surveys') // redirecting the user after reuquest is finished
    dispatch({ type: FETCH_USER, payload: response.data }) // assuming we get the exact user model as in fetchUser
}

export const fetchSurveys = () => async dispatch => { //fetches the surveys for a specific user 
    const response = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: response.data })
};
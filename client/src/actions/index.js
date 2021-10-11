import axios from 'axios';
import { FETCH_USER } from './types';

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
}
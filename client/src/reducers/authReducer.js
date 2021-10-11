import { FETCH_USER } from "../actions/types";

export default function authReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; // if the payload is an empty string or false then return false
        default: 
        return state;
    }
}
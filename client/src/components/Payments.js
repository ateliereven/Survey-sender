import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from "react-redux";
import * as actions from '../actions';

const Payments = () => {
    const dispatch = useDispatch(); // calling the dispatch function from the redux store
    return ( // generates a payment form
        <StripeCheckout
            name="MySender" //name of the app
            description="5$ for 5 survey credits" //give the user info about what they are paying for
            amount={500} // defualt currency is USD, amount is in cents
            token={token => dispatch(actions.handleToken(token))} // token receives a cllback function with the token we receive from strike after the user submits their credit card number
            stripeKey={process.env.REACT_APP_SRIPE_KEY} //the key is returned when the app builds
        >
            <button className="btn pink flow-text">
                Add Credits
            </button>
        </StripeCheckout>
    )
};

export default Payments;
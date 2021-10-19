import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from "react-redux";
import * as actions from '../actions';

const Payments = () => {
    const dispatch = useDispatch(); 
    return (
        <StripeCheckout
            name="MySender"
            description="5$ for 5 survey credits"
            amount={500}
            token={token => dispatch(actions.handleToken(token))}
            stripeKey={process.env.REACT_APP_SRIPE_KEY}
        >
            <button className="btn pink flow-text">
                Add Credits
            </button>
        </StripeCheckout>
    )
};

export default Payments;
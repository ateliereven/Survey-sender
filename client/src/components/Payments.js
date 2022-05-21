import React, {useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import * as actions from '../actions';

const Payments = (props) => {
    const dispatch = useDispatch(); 

    // for displaying tooltips:
    useEffect(() => {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems);
    });
    
    return (
        <StripeCheckout
            name="MySender"
            description="5$ for 5 survey credits"
            amount={500}
            token={token => dispatch(actions.handleToken(token))}
            stripeKey={process.env.REACT_APP_SRIPE_KEY}
        >
            <div className="action-btn" >
                <button
                    className={`btn-floating btn-small tooltipped ${props.credits < 1 && 'pulse'}`}
                    data-position="right"
                    data-tooltip="add credits"
                >
                <i className="material-icons">add</i>
                </button>
                </div>
        </StripeCheckout>
    )
};

export default Payments;
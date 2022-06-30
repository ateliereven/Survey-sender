import React from "react";
import { useParams } from "react-router-dom";

import thankyou from "../img/undraw_super_thank_you_re_f8bo.svg"

const Thankyou = () => {
    const { choice } = useParams();
    //console.log(choice);
    const onFeedback = () => {
        if (choice === 'negative' || choice === 'strongnegative') {
            return <h5>We hope to improve our service to your satisfaction</h5>
        }
        if (choice === 'positive' || choice === 'strongpositive') {
            return <h5>This let's us know we're on the right track</h5>
        }
        return;
    }
    return <section className="row center container">
        <h1 className="pink-text text-accent-2">Thanks for voting!</h1>
        {onFeedback()}
        <img src={thankyou} alt="people" width='45%' className="pt-3"/>
    </section>
}

export default Thankyou;
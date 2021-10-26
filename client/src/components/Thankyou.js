import React from "react";
import { useParams } from "react-router-dom";

const Thankyou = () => {
    const { choice } = useParams();
    console.log(choice);
    const onFeedback = () => {
        if (choice === 'negative' || choice === 'strongnegative') {
            return <h5>We hope to improve our service to your satisfaction</h5>
        }
        if (choice === 'positive' || choice === 'strongpositive') {
            return <h5>This let's us know we're on the right track</h5>
        }
        return;
    }
    return <div className="row center container">
        <div className="section"></div>
        <h1 className="pink-text text-accent-2">Thanks for voting!</h1>
        {onFeedback()}
    </div>
}

export default Thankyou;
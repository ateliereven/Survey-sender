import React from "react";

const Landing = (props) => {
    return <div className="row center container">
        <div className="section">
            <h1>MySender</h1>
            <h5 className="blue-grey-text"><i>Collect Feedback From Your Users</i></h5>
        </div>
        <div className="section col s12 blue-grey darken-2 white-text flow-text left-align hoverable">
            <br/>
            <p>
                Send feedback surveys to your clients and get statistics on their response to your product.
                How does MySender work? Simply top up your account with credits, create a new survey by filling out a form with your feedback question, and MySender will email it to your list of designated recipients. Keep track on the progrees of all your surveys and view results on your personal dashboard.
            </p>
            <p>
                To see how it works, try out our free demo account: login with <span className="pink-text text-accent-2">mysurvey.example@gmail.com</span> and enter password <i className="pink-text text-accent-2">mysurveypass</i>
            </p>
            <br />
        </div>
    </div>
};

export default Landing;
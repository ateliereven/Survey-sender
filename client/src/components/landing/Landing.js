import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";
import topup from '../../img/topup.svg';
import surveyForm from '../../img/survey-form.svg';
import surveyCard from '../../img/survey-card.svg';
import illustration from '../../img/undraw_feedback_re_urmj.svg';
import email from '../../img/email.png';
//import opinion from '../img/undraw_opinion_re_jix4.svg'

const Landing = () => {
    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const carouselData = [
        <CarouselItem
            title="Send feedback surveys to your clients and get statistics on their response to your product"
            content={<div>
                <p>How does MySender work?</p>
            </div>}
        />,
        <CarouselItem
            title="1"
            content="Top up your account with credits"
            img={<img src={topup} alt="top-up"></img>}
        />,
        <CarouselItem
            title="2"
            content="Create a new survey by filling out a form with your feedback question, and MySender will email it to your list of designated recipients"
            img={<img src={surveyForm} alt="survey form"></img>}
        />,
        <CarouselItem
            title="3"
            content="Keep track on the progrees of your surveys and view results on your personal dashboard"
            img={<img src={surveyCard} alt="survey card"></img>}
        />,
        <CarouselItem
            title="To check it out, try out our free demo account"
            content={<div>
                <p>Login with Google: <b>mysurvey.example@gmail.com</b></p>
                <p>Enter password: <b>mysurveypass</b></p>
                <button className="btn flow-text ">
                    <a href="/auth/google" className="valign-wrapper center-align white-text">
                        Go to Google
                    </a>
                </button>
            </div>}
        />
    ]

    if (auth) {
        history.push('/surveys')
    } else {
        return <main className="container app-body">

            <section className="flex-row">
                <div className="flex-row" style={{alignItems: 'flex-start'}} >
                <div className="flex-column width-55">
                    <div className="textbox">
                        <h4 className="pink-text text-accent-2"><i>How well is your product doing? Are your clients satisfied? How are you capturing that information?</i></h4>
                        <h6>Whether you're offering a product or a service, harnessing customer insights will allow you to identify and correct problem areas, and gain an understanding of where you're struggling and succeeding. But how?</h6>
                        <h6 className="pink-text text-accent-2"><b>Introducing <i>MySender</i></b></h6>
                    </div>
                    <img id="illustration" src={illustration} alt="people" className="width-55" />
                </div>
                <Carousel items={carouselData}/>
                </div>
            </section>

            <section id="product">
                <h6 className="blue-grey-text text-lighten-2"><b>Product</b></h6>
                <div className="flex-row" style={{ alignItems: 'flex-start' }}>
                    <div className=" width-55">
                    <div className="textbox">
                        <h4 className="pink-text text-accent-2"><i>Send one-click email surveys</i></h4>
                        <h6>Find out how people feel, what they like, or what's stopping them from using your product more.</h6>
                        <h6>MySender's survey emails track the customers' response, and the results are available to you directly on your dashboard.</h6>
                    </div>
                    </div>
                    <img src={email} alt="email" className="width-45"/>
                </div>
            </section>

        </main>
    }

};

export default Landing;

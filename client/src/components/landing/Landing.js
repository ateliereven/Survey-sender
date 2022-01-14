import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";
import topup from '../../img/topup.png';
import surveyForm from '../../img/survey-form.png';
import surveyCard from '../../img/survey-card.png';

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
            content={<div><p>Login with Google: <b>mysurvey.example@gmail.com</b></p>
                <p>Enter password: <b>mysurveypass</b></p></div>}
        />
    ]

    if (auth) {
        history.push('/surveys')
    }
    return <div>
        <Carousel items={carouselData} />
    </div>
};

export default Landing;

import React, { useEffect, useState, useRef } from "react";
import carouselStyles from "../../scss/Carousel.module.scss";

const Carousel = ({ items }) => {

    const [currentItem, setCurrentItem] = useState(0)
    const [isNext, setIsNext] = useState(false);
    const [isPrev, setIsPrev] = useState(false);

    // change state to move to next item:
    const nextItem = () => {
        setIsNext(true);
        setCurrentItem(currentItem === items.length - 1 ? 0 : currentItem + 1);
        setTimeout(() => setIsNext(false), 300)
    }
    // change state to move to prev item:
    const prevItem = () => {
        setIsPrev(true);
        setCurrentItem(currentItem === 0 ? currentItem : currentItem - 1);
        setTimeout(() => setIsPrev(false), 300)
    }

    // to clear setTimeout effects after component unmounts:
    const idRef = useRef();

    useEffect(() => {
        const timeOutId = idRef.current;
        return () => clearTimeout(timeOutId)
    }, [])

    //return current item:
    const carouselItems = items.map((item, index) => {
        return <div key={index} className={`${isNext && carouselStyles.slideInNext} ${isPrev && carouselStyles.slideInPrev}`}>
            {index === currentItem && (item)}
        </ div>
    })
    // round buttons at bottom of carousel:
    const renderButtons = () => {
        const buttonsArray = Array(5).fill(<></>)
        return buttonsArray.map((button, index) => {
            return <React.Fragment key={index}>
                <span
                    className={index === currentItem ? carouselStyles.carouselButtonSelected : carouselStyles.carouselButton}
                    onClick={() => setCurrentItem(index)}
                >
                </span>
            </ React.Fragment>
        })
    }

    return (
        <div className={carouselStyles.carousel}>
            <i className={`material-icons medium white-text ${carouselStyles.leftArrow}`} onClick={prevItem}>keyboard_arrow_left</i>
            <i className={`material-icons medium white-text ${carouselStyles.rightArrow}`} onClick={nextItem}>keyboard_arrow_right</i>
            {carouselItems}
            <div className={carouselStyles.carouselNav}>
                {renderButtons()}
            </div>
        </div>
    )
}

export default Carousel;
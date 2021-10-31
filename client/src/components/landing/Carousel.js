import React, { useState } from "react";
import carouselStyles from "../../css/Carousel.module.css";

const Carousel = ({ items }) => {

    const [currentItem, setCurrentItem] = useState(0)
    const nextItem = () => {
        setCurrentItem(currentItem === items.length - 1 ? 0 : currentItem + 1)
    }
    const prevItem = () => {
        setCurrentItem(currentItem === 0 ? currentItem : currentItem - 1)
    }
    const carouselItems = items.map((item, index) => {
        return <React.Fragment key={index}>
            {index === currentItem && (item)}
        </ React.Fragment>
    })

    const renderButtons = () => {
        const buttonsArray = Array(5).fill(<></>)
        return buttonsArray.map((button, index) => {
            return <React.Fragment key={index}>
                <span className={index === currentItem ? carouselStyles.carouselButtonSelected : carouselStyles.carouselButton}></span>
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
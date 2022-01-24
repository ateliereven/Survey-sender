import React from "react";
import carouselStyles from "../../css/Carousel.module.css";

 const CarouselItem = (props) => {
     return (
         <div className={carouselStyles.carouselItem}>
             <div className={`${carouselStyles.itemContent} ${!props.img && carouselStyles.itemWithOnlyText }`}>
             <h4 className={carouselStyles.pink}>{props.title}</h4>
             
             <h5>{props.content}</h5>
             {props.img}
             </div>
        </div>
     )
 }

 export default CarouselItem;
import React from 'react'
import { mainCarouselData } from './MainCarouselData';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";

const MainCarousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
        // pauseOnHover: true,
    };

    const items = mainCarouselData.map((item) => {
        return (
            <div className="slider_area">
                <img src={item.image} className='w-full h-full relative object-cover z-10 cursor-pointer' role='representation' alt="" />
            </div>
        );
    });
    return (
        <Slider {...settings}>
            {items}
        </Slider>
    );
}

export default MainCarousel;

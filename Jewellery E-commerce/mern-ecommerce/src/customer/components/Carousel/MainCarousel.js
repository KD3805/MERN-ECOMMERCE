import React from 'react'
import { mainCarouselData } from './MainCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";
import './style.css';

const MainCarousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        autoplay: true
    };

    const items = mainCarouselData.map((item) => {
        return (
            // <!-- slider section starts -->
            <div className="slider_area slider_black owl-carousel">
                {/* <img src={item.image} className='w-full h-full relative object-cover object-left-top z-10 cursor-pointer' role='representation' alt="" /> */}
                <div class="single_slider w-full h-full object-cover" style={{ backgroundImage: "url(" + item.image + ")" }}>
                    <div className="container">
                        <div className="row h-full align-items-center">
                            <div className="col-12">
                                <div className="slider_content">
                                    <p>{item.offer}</p>
                                    <h1>{item.product}</h1>
                                    <span>{item.quality}</span>
                                    <p className="slider_price">starting at <span>Rs. {item.price}</span></p>
                                    <a href="#" className="button">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <!-- slider section ends -->
        );
    });
    return (
        // <div>
        //     <AliceCarousel
        //         // autoWidth
        //         // autoHeight
        //         animationType='fadeout'
        //         animationDuration={1000}
        //         disableButtonsControls
        //         autoPlay
        //         autoPlayInterval={1000}
        //         infinite
        //         items={items}
        //         mouseTracking
        //     />
        // </div>

        <Slider {...settings}>
            {items}
        </Slider>
    );
}

export default MainCarousel;

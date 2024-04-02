import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../Section_card/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";
import Slider from "react-slick";
import "./style1.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../state/store";
import { findProducts } from "../../../state/product/Action";

const HomeSectionCarousel = ({
    sectionName,
    sectionDisc,
    sectionLabel,
    sectionCategory,
    _id,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store);

    useEffect(() => {
        try {
            const data = {
                category: sectionCategory || "jewellery",
                color: [],
                minPrice: 10,
                maxPrice: 1000000,
                minDiscount: 0,
                maxDiscount: 100,
                sort: "low_to_high",
                pageNumber: 1,
                pageSize: 12,
                occasion: [],
                type: [],
            };
            dispatch(findProducts(data));
        } catch (error) {
            console.error("Error in useEffect:", error);
        }
    }, [sectionCategory]);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    };
    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const settings = {
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        fade: false,
        arrows: true,
        autoplay: false,
        initialSlide: 0,
        swipeToSlide: true,
        className: "center",
        leftPadding: "60px",
        // focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false,
                    className: "center",
                    centerPadding: "60px",
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 968,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // centerMode: true,
                    dots: false,
                    speed: 500,
                    className: "center",
                    infinite: true,
                    centerPadding: "60px",
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    speed: 500,
                    initialSlide: 2,
                    className: "center",
                    infinite: true,
                    centerPadding: "60px",
                    swipeToSlide: true,
                    // className: "center",
                    // centerMode: true,
                    // centerPadding: "40px",
                },
            },
        ],
    };

    // const slidePrev = ()=>setActiveIndex(activeIndex-1);
    // const slideNext = ()=>setActiveIndex(activeIndex+1);

    const items = products.products?.content
        ? products.products.content?.map((item, index) => (
            <HomeSectionCard
                product={item}
                index={index}
                key={item._id}
                productLabel={sectionLabel}
            />
        ))
        : null;

    return (
        <div className="my-5" id={_id}>
            {sectionName && (
                <div>
                    <h2
                        style={{ letterSpacing: "1px" }}
                        className="text-4xl font-semibold text-pink-950 text-center px-10"
                    >
                        {sectionName}
                    </h2>
                    <p className="text-lg font-normal text-center pt-2">{sectionDisc}</p>
                    <img
                        src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711727694/Line-Design_fhgakp.svg"
                        className="w-full h-20 object-cover"
                        alt=""
                    />
                </div>
            )}

            <div className="slider-container">
                <Slider {...settings}>{items}</Slider>

                {/* <AliceCarousel
                    disableButtonsControls
                    items={items}
                    responsive={responsive}
                    disableDotsControls
                    onSlideChanged={syncActiveIndex}
                    activeIndex={activeIndex}
                />
                { 
                    activeIndex !== items.length-5 && <Button
                        onClick={slideNext}
                        variant="contained" 
                        className="z-50" 
                        sx={{position:'absolute', top:"8rem", right:"0rem", transform:"translateX(50%) rotate(90deg)", bgcolor:'white'}}
                        aria-label='next'
                    >
                        <KeyboardArrowLeftIcon sx={{transform:"rotate(90deg)", color:'black'}}/>
                    </Button>
                }

                {
                    activeIndex !== 0 && <Button
                        onClick={slidePrev}
                        variant="contained" 
                        className="z-50" 
                        sx={{position:'absolute', top:"8rem", left:"0rem", transform:"translateX(-50%) rotate(-90deg)", bgcolor:'white'}}
                        aria-label='next'
                    >
                        <KeyboardArrowLeftIcon sx={{transform:"rotate(90deg)", color:'black'}}/>
                    </Button>
                } */}
            </div>
        </div>
    );
};

export default HomeSectionCarousel;

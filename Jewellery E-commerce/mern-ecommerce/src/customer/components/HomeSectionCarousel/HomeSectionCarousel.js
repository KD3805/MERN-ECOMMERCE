import React, { useEffect, useState } from "react";
import HomeSectionCard from "../Section_card/HomeSectionCard";
import Slider from "react-slick";
import "./style1.css";
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
            </div>
        </div>
    );
};

export default HomeSectionCarousel;

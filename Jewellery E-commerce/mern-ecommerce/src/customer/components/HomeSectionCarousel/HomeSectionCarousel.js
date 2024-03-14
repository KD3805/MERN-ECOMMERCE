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
        // infinite: true,
        // speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        fade: false,
        arrows: true,
        syncActiveIndex: { syncActiveIndex },
        activeIndex: { activeIndex },
        // autoplay:true
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
        <div className="my-5">
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
                        src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw78fb320b/images/home/Line-Design.svg"
                        className="w-full h-20 object-cover"
                        alt=""
                    />
                </div>
            )}

            <div className="relative p-4">
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

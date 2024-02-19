import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import HomeSectionCard from '../Section_card/HomeSectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';
import Slider from "react-slick";
import './style1.css';

const HomeSectionCarousel = ({ data, sectionName, sectionDisc }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    };
    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const settings = {
        // dots: true,
        // infinite: true,
        // speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        syncActiveIndex: { syncActiveIndex },
        activeIndex: { activeIndex },
        // autoplay:true
    };

    // const slidePrev = ()=>setActiveIndex(activeIndex-1);
    // const slideNext = ()=>setActiveIndex(activeIndex+1);

    const items = data.map((item) => <HomeSectionCard product={item} />)
    return (
        <div>
            <h2 style={{ letterSpacing: '1px' }} className='text-4xl font-semibold text-pink-950 text-center px-10'>{sectionName}</h2>
            <p className='text-lg font-normal text-center pt-2'>{sectionDisc}</p>
            <img src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw78fb320b/images/home/Line-Design.svg" className='w-full h-20 object-cover' alt="" />
            <div className='relative p-4'>
                <Slider {...settings}>
                    {items}
                </Slider>

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
}

export default HomeSectionCarousel

import React, { useContext, useState } from "react";
import MainCarousel from "../../components/Carousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalContext } from "../../../context/modal/modalContext";
import HomeSectionCategory from "../../components/Section_card/HomeSectionCategory";

const HomePage = () => {
  const [hoverFirst, setHoverFirst] = useState(false);
  const [hoverSecond, setHoverSecond] = useState(false);
  const [hoverThird, setHoverThird] = useState(false);
  const location = useLocation();
  const modal = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <div onLoad={() => {
      if (location.pathname === "/login" || location.pathname === "/register") {
        modal.openModal();
      }
    }}>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">

        <HomeSectionCarousel
          sectionLabel={"Best Sellers"}
          sectionName={"Best of Gayatri"}
          sectionDisc={
            "Browse through your favorite categories. We've got them all!"
          }
          _id="best-of-gayatri"
        />

        <div 
          className="flex justify-around flex-wrap transition-all duration-200 items-start space-x-4 my-5 w-full h-[25rem] overflow-hidden"
          id="offers-contest"  
        >
          <div
            onMouseEnter={() => setHoverFirst(true)}
            onMouseLeave={() => setHoverFirst(false)}
            className="w-3/12 h-full shadow-md relative transition-all duration-300 ease cursor-pointer"
          >
            {hoverFirst && (
              <div>
                <div className="absolute rounded-lg top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-0"></div>
                <div className="flex-col absolute top-1/3 left-16 justify-start space-y-2">
                  <p className="text-white text-lg font-semibold">
                    Featured Bangles
                  </p>
                  <p className="text-amber-300 text-3xl font-semibold w-4/5">
                    Stunning Gold Bangle
                  </p>
                  <p className="text-white text-sm font-medium">Sale 20% off</p>
                </div>
              </div>
            )}
            <img
              src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1710436469/e7fad45b267d7ba771897be24e01b498_fwgh4f.jpg"
              alt=""
              className="w-full h-full rounded-lg transition-all duration-200 overflow-hidden"
            />
          </div>

          <div
            onMouseEnter={() => setHoverSecond(true)}
            onMouseLeave={() => setHoverSecond(false)}
            className="w-3/12 h-full shadow-md relative transition-all duration-300 ease cursor-pointer"
          >
            {hoverSecond && (
              <div>
                <div className="absolute rounded-lg top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-0"></div>
                <div className="flex-col absolute top-1/3 left-16 justify-start space-y-2">
                  <p className="text-white text-lg font-semibold">
                    New Designs
                  </p>
                  <p className="text-amber-300 text-3xl font-semibold w-4/5">
                    Gayatri Special Diamond Bangle
                  </p>
                  <p className="text-white text-sm font-medium">Sale 20% off</p>
                </div>
              </div>
            )}
            <img
              src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1710435672/8b7d5918e74a102d62d3adf67490fb53_pqrcda.jpg"
              alt=""
              className="w-full h-full rounded-lg transition-all duration-200 overflow-hidden"
            />
          </div>

          <div
            onMouseEnter={() => setHoverThird(true)}
            onMouseLeave={() => setHoverThird(false)}
            className="w-3/12 h-full shadow-md relative transition-all duration-300 ease cursor-pointer"
          >
            {hoverThird && (
              <div>
                <div className="absolute rounded-lg top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-0"></div>
                <div className="flex-col absolute top-1/3 left-16 justify-start space-y-2">
                  <p className="text-white text-lg font-semibold">
                    Bestsellings
                  </p>
                  <p className="text-amber-300 text-3xl font-semibold w-4/5">
                    Trending Earrings for wedding
                  </p>
                  <p className="text-white text-sm font-medium">Sale 10% off</p>
                </div>
              </div>
            )}
            <img
              src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1710435672/6abc908eb4b598f559219dfd3386efe7_gojywd.jpg"
              alt=""
              className="w-full h-full rounded-lg transition-all duration-200 overflow-hidden"
            />
          </div>
        </div>

        <HomeSectionCategory />

        <HomeSectionCarousel
          sectionName={"New Arrivals"}
          sectionLabel={"New Arrivals"}
          sectionDisc={"Our latest releases, just for you !!"}
          _id="new-arrivals"
        />

        <div className="flex justify-center items-center px-5 ">
          <div className="w-full h-[70vh] flex justify-center items-center gap-5 flex-wrap">
            <img
              onClick={() => navigate('/all-jewellery/category/necklace')}
              src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711733524/dailwear-jewellery_ti8wdt.webp"
              alt="necklace"
              className="w-5/12 h-full object-contain rounded-lg cursor-pointer flex-grow"
            />
            <img
              onClick={() => navigate('/gold/earrings/stud?type=gold')}
              src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711733523/latest-earrings_osmidc.webp"
              alt="earrings"
              className="w-5/12 h-full object-contain rounded-md cursor-pointer flex-grow"
            />
          </div>
        </div>


        <HomeSectionCarousel
          sectionName={"Recommended for you"}
          sectionLabel={"Recommended"}
          sectionDisc={
            "Discover products tailored to your preferences and interests!"
          }
          _id="reccomanded"
        />
        {/* <HomeSectionCarousel data={best_sellers} sectionName={"Best of Gayatri"} sectionDisc={"Browse through your favorite categories. We've got them all!"}/> */}
      </div>
    </div>
  );
};

export default HomePage;

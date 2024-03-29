import React from "react";
import MainCarousel from "../../components/Carousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { best_sellers } from "../../components/Data/best_sellers";

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousel
          sectionLabel={"Best Sellers"}
          sectionName={"Best of Gayatri"}
          sectionDisc={
            "Browse through your favorite categories. We've got them all!"
          }
        />
        <HomeSectionCarousel
          sectionName={"New Arrivals"}
          sectionLabel={"New Arrivals"}
          sectionDisc={"Our latest releases, just for you !!"}
        />
        <HomeSectionCarousel
          sectionName={"Recommended for you"}
          sectionLabel={"Recommended"}
          sectionDisc={
            "Discover products tailored to your preferences and interests!"
          }
        />
        {/* <HomeSectionCarousel data={best_sellers} sectionName={"Best of Gayatri"} sectionDisc={"Browse through your favorite categories. We've got them all!"}/> */}
      </div>
    </div>
  );
};

export default HomePage;

"use client"
import React from "react";
import NewsUpdates from "./NewsUpdates";
import LotMore from "./LotMore";
import Featured from "./Featured";
import TopRanking from "./TopRanking";
import Trending from "./Trending";
import { CompanyNameProps } from "../types";
import BannerVideo from "./BannerVideo";
import DesktopEventCards from "./DesktopEventCard";
import { useHoverContext } from "./HoverProvider";
import PointsTable from "./PointsTable";

const Homepage = ({companyName}: CompanyNameProps ) => {
  const {isEventsHovered, setIsEventsHovered} = useHoverContext();
  return (
    <div>
      <div onMouseEnter = {() => setIsEventsHovered(true)}
           onMouseLeave={() => setIsEventsHovered(false)}
           className="relative">
            <div className="absolute z-50 top-0 lg:left-[40%] 2xl:left-1/2">
            {isEventsHovered && (
              <DesktopEventCards/>
            )}
            </div>
      </div>
      <BannerVideo />
      {/* Certificates */}
      {/* <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-20 mb-12">
        <WRC companyName={companyName} />
        <Certificate />
      </div> */}
      {/* News Updates */}
      <div className="px-4 lg:px-24 mb-20 pt-12">
        <NewsUpdates />
      </div>
      {/* Ranking */}
      <div>
        <PointsTable companyName={companyName}/>
      </div>
      {/* A Lot more session */}
      <div className="px-4 lg:px-24  bg-gray-100 pt-20">
        <LotMore companyName={companyName} />
      </div>
      {/* Testimonial */}
      
      {/* Top Ranking */}
      <div className="px-4 lg:px-24 py-20 pb-0 bg-[url(https://www.technoxian.com/images/h3teambg.jpg)] bg-cover mb-20">
        <TopRanking companyName={companyName} />
      </div>
      {/* Featured News */}
      <div className="px-4 lg:px-24 py-16 lg:mb-20 flex flex-col lg:flex-row gap-6 justify-between max-md:gap-y-12">
        <Featured/>
        <Trending />
      </div>
    </div>
  );
};

export default Homepage;

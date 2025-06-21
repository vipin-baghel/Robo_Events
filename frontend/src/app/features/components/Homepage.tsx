"use client"
import React from "react";
import NewsUpdates from "./NewsUpdates";
import LotMore from "./LotMore";
import TopRanking from "./TopRanking";
import { CompanyNameProps } from "../types";
import BannerVideo from "./BannerVideo";
import PointsTable from "./PointsTable";

const Homepage = ({companyName}: CompanyNameProps ) => {
  return (
    <div>
      
      <BannerVideo />
      
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
      <div className="px-4 lg:px-24 py-20 pb-0  mb-20">
        <TopRanking companyName={companyName} />
      </div>
      {/* Featured News */}
      {/* <div className="px-4 lg:px-24 py-16 lg:mb-20 flex flex-col lg:flex-row gap-6 justify-between max-md:gap-y-12">
        <Featured/>
        <Trending />
      </div> */}
    </div>
  );
};

export default Homepage;

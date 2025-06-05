/* eslint-disable @next/next/no-img-element */

import React from "react";
import { CompanyNameProps } from "../types";

const TopRanking = ({companyName}: CompanyNameProps) => {
  const topRanking = [
    {
      id: 1,
      username: "wrc_aze",
      country: "Azerbaijan",
      image: "https://www.technoxian.com/images/clubimages/wrc_aze_club.jpg",
    },
    {
      id: 2,
      username: "Apply Industries India",
      country: "India",
      image:
        "https://www.technoxian.com/images/clubimages/Apply-Industries-India.jpg",
    },
    {
      id: 3,
      username: "Trincabotz",
      country: "Brazil",
      image: "https://www.technoxian.com/images/trincabotz3.jpg",
    },
    {
      id: 4,
      username: "Invincibles Robotics",
      country: "India",
      image: "https://www.technoxian.com/images/boudsia4.jpg",
    },
  ];
  return (
    <div>
      <h3 className="uppercase text-md text-[#b70000] font-bold tracking-tighter mb-2">
        Top Ranking
      </h3>
      <h2 className="text-4xl text-[#222222] tracking-tighter font-bold mb-10">
        {companyName} RoboClub
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {topRanking.map((item) => {
          return (
            <li key={item.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden  shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Team Photo */}
              <div className="aspect-[4/3] w-full">
                <img
                  src={item.image}
                  alt={item.username}
                  className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Overlay gradient for better text readablitiy */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Team Info Card */}
              <div className="bg-white group-hover:bg-[#b70000] shadow-md -mt-8 mx-4 relative z-10 p-6 group-hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center">
                <h3 className="font-semibold text-md text-gray-800 group-hover:text-white mb-1 truncate">{item.username}</h3>
                <p className="text-red-600 group-hover:text-white font-medium text-sm">{item.country}</p>
                </div>
              </div>
             
             
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopRanking;

"use client"
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Image from 'next/image';
import { FeaturedNewsProps } from "../types";

const FeaturedNews = ({ item }: FeaturedNewsProps) => {
  const { summary, date, image, headline } = item;

  return (
    <li className="flex flex-col md:flex-row lg:items-center group" style={{boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`}}>
      {/* Image */}
      <div className="w-full md:w-1/2 h-75">
        <Image
           src={image}
           alt={headline || 'News image'}
           width={500}
           height={300}
           className="object-cover h-full w-full"
           priority
        />
      </div>
      {/* Content */}
      <div className="bg-white p-4 md:w-1/2">
        <h2 className="text-lg text-[#222222] font-medium group-hover:text-[#b70000] mb-2">{headline}</h2>
        <div className="flex items-center gap-1 mb-2">
          <FaCalendarAlt size={15} className="text-gray-400" />
          <span className="text-md text-gray-400">{date}</span>
        </div>
         <p className="text-md text-gray-400 mb-6">{summary}</p>
          <button className="uppercase border border-gray-300 bg-gray-50 group-hover:bg-[#b70000] text-gray-400 font-semibold group-hover:text-white px-6 py-1">Read More</button>
      </div>


    </li>
  );
};

export default FeaturedNews;

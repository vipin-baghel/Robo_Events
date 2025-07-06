/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaArrowRight, FaCalendarAlt, FaLink } from "react-icons/fa";
import { NewsUpdatesProps } from "../types";
import { formatDateRange } from "../utils/format-date-range";

const NewsCard = ({
  id,
  title,
  news_date,
  content,
  image_url,
  is_published
}: NewsUpdatesProps) => {
  const date = formatDateRange(news_date);

  return (
   <Card className="flex flex-col justify-between h-full bg-white overflow-x-hidden w-full p-0">
        {/* Image */}
        <div className="flex-shrink-0 w-full">
          <img 
              src={image_url}
              alt={title}
              className="w-full h-48"
          />
        </div>
        {/* Content */}
        <div className="flex flex-col flex-grow justify-center p-5">
          <div className="flex items-center gap-1 text-gray-500 mb-2">
            <FaCalendarAlt size={13} />
            <span className="text-sm">{date}</span>
          </div>
           <h2 className="text-sm lg:text-lg font-semibold leading-tight text-gray-900 group-hover:text-red-700 mb-4">
            {title}
          </h2>
          
          <div className="mt-auto flex items-end cursor-pointer">
            <p className="uppercase text-[0.75rem] text-red-700 hover:text-gray-800 font-semibold flex items-center gap-1">
              News Detail
              <FaArrowRight size={13} />
            </p>
          </div>

        </div>
   </Card>
  );
};

export default NewsCard;

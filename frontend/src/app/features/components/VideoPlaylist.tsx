/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FaClock, FaEye, FaPlay } from "react-icons/fa";
import { PlaylistProps } from "../types";

const VideoPlaylist = ({title, image, article_url, watch_url}: PlaylistProps) => {
//   const { title, image, article_url, watch_url } = currentElement;
  return (
    <li className="relative w-[345px] h-[200px] overflow-hidden rounded-sm group">
      <img
        src={image}
        alt={title}
        width={500}
        height={250}
        className="object-cover w-full h-full"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-2 z-10">
        <Link href={watch_url}>
          <div className="max-w-[50px] max-h-[50px] p-3 rounded-full flex items-center justify-center bg-[#761324] group-hover:bg-red-700 ">
            {" "}
            <FaPlay size={17} className="text-white" />
          </div>
        </Link>
        <div className="flex flex-col gap-4">
          <Link href={article_url}>
            <h2 className="text-white group-hover:text-red-700 text-lg font-semibold">
              {title}
            </h2>
          </Link>
          <div className="flex items-center gap-2">
            <FaClock size={15} className="text-gray-200" />
            <FaEye size={20} className="text-gray-200" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoPlaylist;

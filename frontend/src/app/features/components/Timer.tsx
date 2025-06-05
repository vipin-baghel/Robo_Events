"use client"
import React from "react";
import useTimer from "../hooks/useTimer";

const TechnoxianTimer = () => {
  const { days, hours, minutes, seconds } = useTimer("2025-08-23T23:00:00");
  return (
    <div>
      <ul className="flex items-center justify-between px-10 ">
        <li className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-gray-400 text-2xl">{days}</h2>
            <span className=" text-sm text-gray-400 uppercase">Days</span>
          </div>
        </li>
        <li className="flex flex-col items-center border-l  border-gray-300 h-16">
          <div className="ml-12">
            <h2 className="text-2xl text-gray-400">{hours}</h2>
            <span className="text-sm text-gray-400 uppercase">Hours</span>
          </div>
        </li>
        <li className="flex flex-col items-center border-l  border-gray-300 h-16">
          <div className="ml-12">
            <h2 className="text-2xl text-gray-400">{minutes}</h2>
            <span className="text-sm text-gray-400 uppercase">Minutes</span>
          </div>
        </li>
        <li className="flex flex-col items-center border-l  border-gray-300 h-16">
          <div className="ml-12">
            <h2 className="text-2xl text-gray-400">{seconds}</h2>
            <span className="text-sm text-gray-400 uppercase">Seconds</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TechnoxianTimer;

/* eslint-disable @next/next/no-img-element */
import React from "react";
import TechnoxianTimer from "./Timer";
import { CompanyNameProps } from "../types";


const WRC = ({companyName}: CompanyNameProps) => {
  return (
    <section className="lg:max-w-[650px] lg:h-fit w-full" style={{boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`}}>
      <div
        className=" w-full rounded-sm"
      >
        <header className="bg-[#b70000] text-xl lg:text-2xl text-white p-3 lg:px-12 whitespace-nowrap">
         {companyName} World Robotics Championship
        </header>

      </div>
      <div className="flex items-center lg:gap-16 justify-between bg-white p-4 lg:px-12 lg:py-8">
        <img src="/assets/Technoxian-Banner2.jpg" alt="Technoxian-logo" width={130} height={130} className="w-full object-contain" />
        <div className="flex flex-col ">
          <h2 className="text-md truncate">23rd - 26th, August 2025</h2>
          <span className="font-semibold text-sm text-center">9.0th Edition</span>
        </div>
        <img src="/assets/Technoxian-Banner2.jpg" alt="Technoxian-logo" width={130} height={130} className="w-full object-contain" />
      </div>
      <div>
        <div className="bg-gray-300 min-h-[1px]"></div>
        <TechnoxianTimer />
      </div>
    </section>
  );
};

export default WRC;

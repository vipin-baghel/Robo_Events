/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import { FaLocationArrow } from 'react-icons/fa6';
import CountdownTimer from './CountdownTimer';
import { formatDateRange } from '../utils/format-date-range';

interface ActiveChamipionship {
  id: number,
  name: string,
  start_date: string,
  end_date: string,
  is_active: boolean,
  location: string
};
import { API_COMPETITIONS } from '../api';
const CountdownBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [apiData, setApiData] = useState<ActiveChamipionship[]>([]);
    
     const fetchActiveChamipionship = async() => {
        try{
          const response = await fetch(API_COMPETITIONS);
          const data = await response.json();
          const activeChampionship = await data?.filter((item: ActiveChamipionship) => item.is_active) || [];
          setApiData(activeChampionship);
        }catch(error){
          console.error("Failed to get data: ", error);
        }
     }
    useEffect(() => {
     fetchActiveChamipionship();
    },[]);
  const clearButton = () => {
    console.info("clear button ");
    setIsVisible(false);
  };

   const active = apiData.length > 0 ? apiData[0] : null;
  
  return (
    <div>
      {
        isVisible && active && (
          <section className={`max-lg:hidden bg-[#0c1121] flex gap-20 items-center justify-between px-24 py-6 relative transition-transform duration-500 ease-in-out ${!isVisible ? "transform -translate-x-full": ""}`}>
        <img
          src="/assets/Technoxian-Banner.jpg"
          alt="Technoxian-Banner"
          height={90}
          width={90}
        />
        <div>
          <p className="text-[0.85rem] text-gray-300 truncate">
              {formatDateRange(active.start_date, active.end_date)}
          </p>
          <h2 className="text-sm text-red-600">10:00 AM IST+ WRC</h2>
        </div>
        <div>
          <CountdownTimer startDate={active.start_date}/>
        </div>
        <div className="flex items-center gap-3">
          <FaLocationArrow size={30} className="text-red-600 " />
          <h3 className="text-[0.90rem] text-gray-400 font-medium line-clamp-3">
            {active.location}
          </h3>
        </div>
        <div className="absolute top-5 right-5">
          <button
            onClick={clearButton}
            className="max-w-[30] max-h-[30] rounded-sm bg-red-700 text-white font-bold p-2 flex items-center justify-center"
          >
            X
          </button>
        </div>
      </section>
        )
      }
      </div>
  )
}

export default CountdownBanner

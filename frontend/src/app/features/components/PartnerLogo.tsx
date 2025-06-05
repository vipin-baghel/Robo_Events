/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CompetitionProps } from "../types";
import { API_COMPETITIONS } from '../api';

const fetcherCompetitions = async (...args: Parameters<typeof fetch>): Promise<CompetitionProps[]> => {
    const response = await fetch(...args);
    return response.json();
};

const PartnerLogo = () => {
  const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const data = await fetcherCompetitions(API_COMPETITIONS);
        setCompetitions(data);
      } catch (err) {
        console.error('Error fetching competitions:', err);
      }
    };
    fetchCompetition();
  }, []);

  
  return (
    <>
        <div className="space-y-1 pb-4 max-md:px-4">
          <ul className="flex items-stretch justify-center gap-8 ml-auto divide-x divide-stone-800 text-center ">
            {competitions.slice(8, 14).map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex flex-col items-center gap-2 px-4 w-[150px] text-center"
                >
                  <div className="h-[80px] w-[80px] mx-auto">
                    <img
                      src={item.logo}
                      alt={item.competition}
                      width={100}
                      height={100}
                      className="object-contain h-full w-full"
                    />
                  </div>
                  <span className="mt-1 text-md text-white italic min-h-[2rem] whitespace-nowrap">
                    {item.competition}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center text-stone-300">
            <button className="hover:bg-stone-500 ">
              <FiChevronLeft size={15}/>
            </button>
            <button className="hover:bg-stone-500">
              <FiChevronRight size={15} />
            </button>
          </div>
        </div>
    </>
  );
};

export default PartnerLogo;

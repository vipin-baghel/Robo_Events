
"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { CompanyNameProps, InternationOfficesProps } from "../types";
import { API_INTERNATIONAL_OFFICES } from '../api';

const fetcherInternationalOffices = async (...args: Parameters<typeof fetch>): Promise<InternationOfficesProps[]> => {
    const response = await fetch(...args);
    return response.json();
};

const InternationalOffices = ({companyName}: CompanyNameProps) => {
  const [internationalOffices, setInternationalOffices] = useState<InternationOfficesProps[]>([]);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcherInternationalOffices(API_INTERNATIONAL_OFFICES);
        setInternationalOffices(data);
      } catch (err) {
        console.error('Error fetching international offices:', err);
      } finally {
        setOpen(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section>
        <h2 className="text-xl text-white tracking-wide font-medium mb-6">
          {companyName} International Offices
        </h2>
        <div className="max-w-[300px]">
          <ul className="grid grid-cols-4 gap-3 mb-4">
            {internationalOffices.slice(0, 8).map((item) => {
              return (
                <li key={item.id} className="flex flex-col mx-auto gap-y-1">
                  <div className="w-[60px]">
                    <Image
                      src={item.flag}
                      alt={item.country}
                      width={60}
                      height={40}
                      className="object-contain h-full w-full"
                      priority
                    />
                  </div>
                  <p className="text-xs text-gray-100 italic text-center">
                    {item.country}
                  </p>
                </li>
              );
            })}
          </ul>
          {isOpen && (
            <ul className="grid grid-cols-4 gap-3 mb-4">
              {internationalOffices.slice(8).map((item) => {
                return (
                  <li
                    key={item.id}
                    className="flex flex-col justify-center mx-auto gap-y-1"
                  >
                    <div className="w-[60px]">
                      <Image
                        src={item.flag}
                        alt={item.country}
                        width={60}
                        height={40}
                        className="object-contain h-full w-full"
                        priority
                      />
                    </div>
                    <p className="text-xs text-gray-100 italic text-center">
                      {item.country}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}

          {!isOpen ? (
            <button
              onClick={() => setOpen(true)}
              className="bg-gray-100 px-2 py-[2px] rounded-xs text-sm mb-4"
            >
              View more
            </button>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-100 px-2 py-[2px] rounded-xs text-sm mb-4"
            >
              View less
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default InternationalOffices;

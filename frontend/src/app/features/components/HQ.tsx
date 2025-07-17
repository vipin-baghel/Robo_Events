import React from "react";
import { FaEnvelope } from "react-icons/fa6";
import { IoLocationSharp, IoCall } from "react-icons/io5";
import { CompanyNameProps } from "../types";
import useSWR from "swr";
import { API_FOOTER } from "../api";
import { fetcherFooter } from "../utils/fetcherFooter";

const HQ = ({ companyName }: CompanyNameProps) => {
  const { data, error, isLoading } = useSWR(API_FOOTER, fetcherFooter);
  console.log(data);
  if (error) {
    console.log("Failed to fetch Footer: ", error);
  }
  if (isLoading) {
    return <p className="animate-spin bg-gray-500 "></p>;
  }
  return (
    <>
      <section className="mb-4 h-full">
        <h2 className="text-xl tracking-wide text-white font-medium mb-3">
          {companyName} Contact Us
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <IoLocationSharp size={15} className="text-red-700 shrink-0" />
            <span className="text-sm text-gray-400">{data?.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <IoCall size={15} className="text-red-700 shrink-0" />
            <span className="text-sm text-gray-400">{data?.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope size={15} className="text-red-700 shrink-0" />
            <span className="text-sm text-gray-400">{data?.email}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default HQ;

import React from "react";
import { FaEnvelope } from "react-icons/fa6";
import { IoLocationSharp, IoCall } from "react-icons/io5";
import { CompanyNameProps } from "../types";

const HQ = ({companyName}: CompanyNameProps) => {
  return (
    <>
      <section className="mb-4">
        <h2 className="text-xl tracking-wide text-white font-medium mb-3">
          HQ. & Corp. Office
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <IoLocationSharp size={15} className="text-red-700" />
            <span className="text-sm text-gray-400">
              225 US Complex, Jasola New Delhi - 110076
            </span>
          </div>
          <div className="flex items-center gap-3">
            <IoCall size={15} className="text-red-700" />
            <span className="text-sm text-gray-400">+91 92890 95404</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope size={15} className="text-red-700" />
            <span className="text-sm text-gray-400">info@{companyName}.com</span>
          </div>
          <div className="flex items-center gap-3">
            <IoCall size={15} className="text-red-700" />
            <span className="text-sm text-gray-400">www.{companyName}.com</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default HQ;

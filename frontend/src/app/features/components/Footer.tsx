import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
// import PartnerLogo from "./PartnerLogo";
import HQ from "./HQ";
import { CompanyNameProps } from "../types";

const Footer = ({companyName}: CompanyNameProps) => {
  return (
    <div className="bg-[#131727] px-4 lg:px-24 py-6 divide-y divide-stone-800 mb-4 overflow-x-hidden">
      {/* <PartnerLogo /> */}
      <div className="flex flex-col lg:flex-row justify-between w-full mt-10 lg:mt-16 mb-4">
       <div className="max-md:mb-6">
        <HQ companyName={companyName} />
        {/* <InternationalOffices companyName={companyName} /> */}
      </div>
      <div>
      {/* <ImpLinks companyName={companyName} /> */}
      </div>
      </div>
      {/* Bottom Footer */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-md:gap-y-6">
        <div className="flex items-stretch gap-6">
                  <button>
                    <FaFacebookF size={20} className="text-gray-700 hover:text-[#fd1e50]" />
                  </button>
                  <button>
                    <FaTwitter size={20} className="text-gray-700 hover:text-[#fd1e50]" />
                  </button>
                  <button>
                    <FaInstagram size={20} className="text-gray-700 hover:text-[#fd1e50]" />
                  </button>
                  <button>
                    <FaLinkedinIn size={20} className="text-gray-700 hover:text-[#fd1e50]" />
                  </button>
                  <button>
                    <FaYoutube size={20}  className="text-gray-700 hover:text-[#fd1e50]" />
                  </button>
                </div>
        <p className="text-sm text-gray-500 ">Copyright © 2024 {companyName}. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;

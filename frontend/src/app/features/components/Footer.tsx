/* eslint-disable react/display-name */
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import HQ from "./HQ";
import { CompanyNameProps } from "../types";
import useSWR from "swr";
import { API_FOOTER } from "../api";
import { fetcherFooter } from "../utils/fetcherFooter";
import Link from "next/link";

const Footer = React.forwardRef<HTMLDivElement, CompanyNameProps>(
  ({ companyName }, ref) => {
    const { data, error, isLoading } = useSWR(API_FOOTER, fetcherFooter);
    console.log(data);
    if (error) {
      console.log("Failed to fetch Footer: ", error);
    }
    if (isLoading) {
      return <p className="animate-spin bg-gray-500 "></p>;
    }
    return (
      <div
        ref={ref}
        className="bg-[#131727] px-4 lg:px-24 py-6 divide-y divide-stone-800 overflow-x-hidden
        "
      >
        {/* <PartnerLogo /> */}
        <div className="flex flex-col lg:flex-row justify-between w-full mt-10 lg:mt-16 mb-4">
          <div className="max-md:mb-6">
            <HQ companyName={companyName} />
          </div>
          <div>{/* <ImpLinks companyName={companyName} /> */}</div>
        </div>
        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-md:gap-y-6">
          <div className="flex items-stretch gap-6">
            <button>
              <Link
                href={data?.facebook_url || "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  size={20}
                  className="text-gray-700 hover:text-[#fd1e50]"
                />
              </Link>
            </button>
            <button>
              <Link
                href={data?.twitter_url || "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  size={20}
                  className="text-gray-700 hover:text-[#fd1e50]"
                />
              </Link>
            </button>
            <button>
              <Link
                href={data?.instagram_url || "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={20}
                  className="text-gray-700 hover:text-[#fd1e50]"
                />
              </Link>
            </button>
            <button>
              <Link
                href={data?.linkedin_url || "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn
                  size={20}
                  className="text-gray-700 hover:text-[#fd1e50]"
                />
              </Link>
            </button>
            <button>
              <Link
                href={data?.youtube_url || "/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube
                  size={20}
                  className="text-gray-700 hover:text-[#fd1e50]"
                />
              </Link>
            </button>
          </div>
          <p className="text-sm text-gray-500 ">
            Copyright © 2024 {companyName}. All Rights Reserved
          </p>
        </div>
      </div>
    );
  }
);

export default Footer;

/* eslint-disable @next/next/no-img-element */

import React from "react";
import { FaFacebookSquare } from "react-icons/fa";

type Props = {
    companyName: string
}

const SocialLinks = ({companyName}: Props) => {
  return (
    <section>
      <h2 className="text-xl font-medium text-white mb-3">
        Follow us on Facebook
      </h2>
      <div className="w-[250px] relative">
        <img
          src="https://futuretech.media/wp-content/uploads/2025/02/F2-6.jpg"
          alt="Technoxian"
          width={100}
          height={100}
          className="object-contain w-full"
        />

        <div className="absolute top-2 left-2 flex items-center gap-2">
          <img
            src="https://technoxian.com/images/tx-favicon.png"
            alt="Technoxian Logo"
            width={40}
            height={40}
            className="rounded-full border border-white"
          />
          <div>
            <p className="font-semibold text-white leading-4">{companyName}</p>
            <p className="text-sm text-white/80">103K followers</p>
          </div>
        </div>

        <button className="absolute bottom-2 left-2 bg-white font-semibold  text-xs px-2 py-1 rounded flex items-center gap-2">
          <FaFacebookSquare size={15} className="text-blue-900" />
          Follow Page
        </button>
      </div>
      <h2 className="text-xl font-medium text-white mb-3">
        Follow us on Facebook
      </h2>
      <p className="text-sm text-blue-700">Tweets by {companyName}</p>
    </section>
  );
};

export default SocialLinks;

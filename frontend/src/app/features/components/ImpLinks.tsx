import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import SocialLinks from "./SocialLinks";
import { CompanyNameProps } from "../types";

const ImpLinks = ({companyName}: CompanyNameProps) => {
  const impLinks = [
    { id: 1, link: "VISA Information" },
    { id: 2, link: "Travel Information" },
    { id: 3, link: "Sponsorship" },
    { id: 4, link: "City Coordinator" },
    { id: 5, link: "Cancellation" },
    { id: 6, link: "Contact us" },
    { id: 7, link: "Certificate" },
  ];
  const participants = [
    { id: 1, title: "Calendar" },
    { id: 2, title: "IRC Roboclub Ranking" },
    { id: 3, title: "IRC Ranking Rules" },
    { id: 4, title: "WRC Referees" },
    { id: 5, title: "RoboClub Registration" },
    { id: 6, title: "Terms and Conditions" },
    { id: 7, title: "Disclaimer" },
    { id: 8, title: "Privacy Policy" },
  ];
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-6  lg:gap-16 justify-between"> 
        <div>
          <h2 className="text-xl text-gray-100 font-medium mb-3">
            Important Links
          </h2>
          <ul className="flex flex-col gap-y-2">
            {impLinks.map((element) => {
              return (
                <li key={element.id} className="flex items-center gap-2 group">
                  <FaAngleDoubleRight size={15} className="text-red-700" />
                  <span className="text-gray-400 text-md group-hover:text-white">{element.link}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-xl text-gray-100 font-medium mb-3">
            For Participants
          </h2>
          <ul className="flex flex-col gap-y-2">
            {participants.map((element) => {
              return (
                <li key={element.id} className="flex items-center gap-2 group">
                  <FaAngleDoubleRight size={15} className="text-red-700" />
                  <span className="text-gray-400 text-md group-hover:text-white">{element.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
       
        <SocialLinks companyName={companyName}/>
      </section>
    </>
  );
};

export default ImpLinks;

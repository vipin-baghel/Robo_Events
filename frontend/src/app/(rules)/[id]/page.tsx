/* eslint-disable @next/next/no-img-element */
"use client";

import { API_EVENTS } from "@/app/features/api";
import { EventsProps } from "@/app/features/types";
import { formatDateRange } from "@/app/features/utils/format-date-range";
import { Download } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { NotFound } from "../not-found/not-found";
// import useSWR from "swr";

const fetcherEventDetails = async (url: string): Promise<EventsProps> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Event not Found");
  return res.json();
};

const EventPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      router.replace(`/`);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  const {
    data: eventData,
    error,
    isLoading,
  } = useSWR<EventsProps>(`${API_EVENTS}${id}`, fetcherEventDetails);
  console.log(eventData);
  if (isLoading) return <p className="animate-spin text-blue-900"></p>;
  if (error) console.log("Failed to load event details: ", error);

  if (!eventData) return <NotFound />;
  // const eventData = events?.find(e => slugify(e.name) === slug);

  // if(!eventData) console.log("Event details not found");

  return (
    <div className="p-4 lg:px-24 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 max-md:mb-8">
        {/* Left  */}
        <div className="lg:w-1/2">
          <header className="space-y-1 mb-4">
            <h2 className="text-[2.2rem] lg:text-5xl text-gray-900 font-bold mb-3">
              {eventData?.name}
            </h2>
            <p className="italic text-base text-gray-600">
              <strong className="text-lg text-gray-700 font-bold">
                Date:{" "}
              </strong>{" "}
              {eventData &&
                formatDateRange(eventData.start_date, eventData.end_date)}
            </p>
            <p className="text-base text-gray-600">
              <strong className="text-lg text-gray-700 font-bold">
                Venue:{" "}
              </strong>
              {eventData?.location}
            </p>
          </header>
          <div>
            <div className="space-y-1 mb-4">
              {eventData.short_description?.split("\n").map((rule, index) => (
                <p key={index}>{rule.trim()}</p>
              ))}
            </div>

            <div className="space-y-1">
              <p className="text-base text-gray-600">
                <strong className="text-lg text-gray-700 font-bold">
                  Organized by:{" "}
                </strong>
                {eventData.organized_by}
              </p>
              <p className="text-base text-gray-600">
                <strong className="text-lg text-gray-700 font-bold">
                  Sponsored by:{" "}
                </strong>
                {eventData.sponsored_by}
              </p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div>
          <img
            src={eventData?.image_url}
            alt={eventData?.name}
            className="w-full lg:w-[500px] object-cover"
          />
        </div>
      </div>

      {/* Eligibility */}
      <div className="mb-8">
        <h3 className="text-[1.50rem] lg:text-[1.75rem] text-gray-800 font-bold mb-2">
          Eligibility Criteria
        </h3>
        <ul className="list-none space-y-1">
          {eventData.rules_and_eligibility?.split("\n").map((rule, index) => (
            <li key={index}>{rule.trim()}</li>
          ))}
        </ul>
      </div>

      {/* How to Register */}
      <div className="mb-8">
        <h3 className="text-[1.50rem] lg:text-[1.75rem] text-gray-800 font-bold mb-2">
          How to Register
        </h3>
        <ul className="list-none space-y-1">
          {eventData.how_to_register?.split("\n").map((rule, index) => (
            <li key={index}>{rule.trim()}</li>
          ))}
        </ul>
      </div>

      {/* Rules  */}
      <div className="mb-8">
        <h3 className="text-[1.50rem] lg:text-[1.75rem] text-gray-800 font-bold mb-2">
          Rules for {eventData.name}
        </h3>
        {/* Event area description*/}
        <div className="mb-3">
          <p>{eventData.event_area_description}</p>
        </div>
        <ul className="list-none pl-6 space-y-1">
          {eventData.rules_for_robo_building?.split("\n").map((rule, index) => (
            <li key={index}>{rule.trim()}</li>
          ))}
        </ul>
      </div>

      {/* Gameplay rules */}
      <div className="mb-8">
        <h3 className="text-[1.50rem] lg:text-[1.75rem] text-gray-800 font-bold mb-2">
          {eventData.name} Gameplay
        </h3>
        <ul className="list-none space-y-1">
          {eventData.gameplay_rules?.split("\n").map((rule, index) => (
            <li key={index}>{rule.trim()}</li>
          ))}
        </ul>
      </div>

      {/* Competition Info */}
      <div className="mb-8">
        <h3 className="text-[1.50rem] lg:text-[1.75rem] text-gray-800 font-bold mb-2">
          Guidelines
        </h3>
        <p>{eventData.competition_info}</p>
      </div>

      {/* How to Register */}
      <div className="mb-8">
        <h3 className="text-[1.50rem] lg:text-[1.75rem] text-gray-800 font-bold mb-2">
          Competition Information ({eventData.name})
        </h3>

        <ul className="list-none space-y-1 mb-3">
          {eventData.competition_info?.split("\n").map((rule, index) => (
            <li key={index}>{rule.trim()}</li>
          ))}
        </ul>

        <button className="py-2 px-6 bg-[#b70000] font-bold text-white text-base rounded-sm flex gap-1 items-center justify-center uppercase tracking-tighter">
          <Download className="w-5" />
          Click here to Participate
        </button>
      </div>
    </div>
  );
};

export default EventPage;

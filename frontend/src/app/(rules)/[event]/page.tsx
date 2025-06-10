'use client'

import { API_EVENTS_DETAILS } from "@/app/features/api";
import { EventDetailsProps } from "@/app/features/types";
import { formatDateRange } from "@/app/features/utils/format-date-range";
import { slugify } from "@/app/features/utils/slugify";
import { Download } from "lucide-react";
import { useParams } from "next/navigation"
import useSWR from "swr";
// import useSWR from "swr";

const fetcherEventDetails = async(url: string): Promise<EventDetailsProps[]> => {
    const res = await fetch(url);
    if(!res.ok) throw new Error('Event not Found');
    return res.json();
};


const EventPage = () => {
   
    const {event: slug} = useParams();
    const {data: events, error, isLoading} = useSWR<EventDetailsProps[]>(API_EVENTS_DETAILS, fetcherEventDetails);

    if(isLoading) return <p className="animate-spin text-blue-900"></p>;
    if (error) console.log("Failed to load event details: ", error);

    const eventData = events?.find(e => slugify(e.name) === slug);

    if(!eventData) console.log("Event details not found");
    
    return(
        <div className="p-4 lg:px-24 py-8">
            <header className="space-y-1 mb-4">
            <h2 className="text-[2.2rem] text-gray-900 font-bold mb-2">{eventData?.name}</h2>
            <p className="italic text-md text-gray-600">
                {eventData && formatDateRange(eventData.championship.start_date, eventData.championship.end_date)};
            </p>
            <p className="text-md text-gray-600">{eventData?.championship.location}</p>
            </header>
            <div className="mb-4">
            <p className="text-base">Design and build a water rocket within the specified dimensions robust enough to withstand the pressure and when launched from the launch pad achieves the maximum altitude above ground level. The team with maximum air time will be nominated as the winner.</p>
            </div>

            {/* Eligibility */}
            <div className="mb-8">
                <h3 className="text-[1.85rem] text-gray-900 font-bold mb-2">Eligibility Criteria</h3>
                <p className="text-base"><strong className="font-semibold">Open for all:</strong> Schools/Colleges/Universities every age group can participate</p>
            </div>

            <button className="py-2 px-6 bg-[#b70000] font-bold text-white text-base rounded-sm flex gap-1 items-center justify-center uppercase tracking-tighter">
                <Download className="w-5"/>
                Click here to Participate</button>
        </div>
    )
}

export default EventPage;
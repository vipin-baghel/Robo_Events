"use client"
import React from 'react'
import { EventsProps } from '../types'
import useSWR from 'swr';
import { API_EVENTS } from '../api';

const fetcherEvents = async (...args: Parameters<typeof fetch>): Promise<EventsProps[]> => {
    const response = await fetch(...args);
    return response.json();
};

const Events = () => {
    const { data: events, error, isLoading } = useSWR<EventsProps[]>(API_EVENTS, fetcherEvents);
    if (error) return <div>Failed to load events</div>;
    if (isLoading || !events) return <div>Loading events...</div>;

  return (
    <div className='bg-white z-40 shadow-lg p-6 w-[500px]'>
      <ul className='flex flex-col gap-6'>
        {
            events.map((event: EventsProps, index: number) => (
                <li key={event.id || index}>
                    <h3>{event.name}</h3>
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default Events

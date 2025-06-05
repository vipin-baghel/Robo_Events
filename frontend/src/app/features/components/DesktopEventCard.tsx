'use client';
import { Card } from '@/components/ui/card';
import React from 'react'
import useSWR from 'swr'
import { EventsProps } from '../types';

import { API_EVENTS } from '../api';

const fetcherEvents = async (...args: Parameters<typeof fetch>): Promise<EventsProps[]> => {
    const response = await fetch(...args);
    return response.json();
};

const DesktopEventCards = () => {
    const {data: events, error, isLoading} = useSWR<EventsProps[]>(API_EVENTS, fetcherEvents);

    console.log('New Data: ', events);
    if(error) console.log(error);
    if(isLoading) return <p className='animate-spin text-blue-900'></p>
    
    return (
        <div className="mx-auto ">
            <Card className='bg-white flex flex-wrap gap-4 p-8 w-full'>
                {events &&  events.map((event: EventsProps) => (
                    <div key={event.id}>
                        <h3>{event.name}</h3>
                    </div>
                ))}

            </Card>
        </div>
  )
}

export default DesktopEventCards

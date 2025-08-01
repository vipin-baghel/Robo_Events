'use client';
import { Card } from '@/components/ui/card';
import React, { Dispatch, SetStateAction } from 'react'
import useSWR from 'swr'
import { EventsProps } from '../types';

import { API_EVENTS } from '../api';
import { useRouter } from 'next/navigation';


const fetcherEvents = async (...args: Parameters<typeof fetch>): Promise<EventsProps[]> => {
    const response = await fetch(...args);
    return response.json();
};

type DesktopEventCardProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const DesktopEventCards = ({setIsOpen}: DesktopEventCardProps) => {
    const {data: events, error, isLoading} = useSWR<EventsProps[]>(API_EVENTS, fetcherEvents);
    const router = useRouter();

    console.log('New Data: ', events);
    if(error) console.log(error);
    if(isLoading) return <p className='animate-spin text-blue-900'></p>
    
    return (
        <div className="mx-auto ">
            <Card className='bg-white flex flex-wrap gap-4 p-8 w-full'>
                {events &&  events.map((event: EventsProps) => (
                    <div key={event.id}>
                        <h3  onClick={() => 
                        {
                            router.push(`/${event.id}`)
                            setIsOpen(false)
                        }
                        }>{event.name}</h3>
                    </div>
                ))}

            </Card>
        </div>
  )
}

export default DesktopEventCards

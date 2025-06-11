import React, { useState } from 'react'
import { EventsProps } from '../types';
import useSWR from 'swr';
import { API_EVENTS } from '../api';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'



const fetcherEvents = async (...args: Parameters<typeof fetch>): Promise<EventsProps[]> => {
    const response = await fetch(...args);
    return response.json();
};

const DropdownEvents = () => {
    const {data: events, error, isLoading} = useSWR<EventsProps[]>(API_EVENTS, fetcherEvents);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    
    console.log('New Data: ', events);
    if(error) console.log(error);
    if(isLoading) return <p className='animate-spin text-blue-900'></p>

    
  return (
    <div onMouseOver={() => setOpen(true)}
         onMouseLeave={() => setOpen(false)}>
      <DropdownMenu open={open} onOpenChange={setOpen}> 
         <DropdownMenuTrigger className="hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold focus:outline-none focus:border-none">Events</DropdownMenuTrigger>
        <DropdownMenuContent>
            {events?.map((event) => (
                <DropdownMenuItem key={event.id} onClick={() => {router.push(`/${event.id}`)
                                                                setOpen(false)}}>
                  {event.name}
                </DropdownMenuItem>
            ))}
           
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DropdownEvents

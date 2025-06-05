/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';
import useSWR from 'swr';
import { TestimonialsProps } from '../types';
import { API_TESTIMONIALS } from '../api';

const fetcherTestimonials = async (...args: Parameters<typeof fetch>): Promise<TestimonialsProps[]> => {
    const response = await fetch(...args);
    return response.json();
};

const Testimonials = () => {
    const { data: testimonials = [], error, isLoading } = useSWR<TestimonialsProps[]>(API_TESTIMONIALS, fetcherTestimonials);
    if (error) return <div>Failed to load testimonials</div>;
    if (isLoading || !testimonials) return <div>Loading testimonials...</div>;
  return (
    <>
      {testimonials.slice(0,1).map((item) => {
        return <div key={item.id} className='flex flex-col items-center'>
            <div className='mb-4'>
                <img src={item.image} alt={item.fullName} width={100} height={100} className='object-cover rounded-full' />
            </div>
            <div className='text-center'>
                <h2 className='text-2xl text-red-700 font-medium mb-1'>{item.fullName}</h2>
                <p className='text-[0.95rem] text-gray-700 line-clamp-2'>{item.designation}</p>
                <p className='text-[0.95rem] text-gray-700 mb-3'>{item.role}</p>

                <p className='text-xl text-gray-600 font-normal italic'>{item.summary}</p>
            </div>
            
        </div>
      })}
    </>
  )
}

export default Testimonials

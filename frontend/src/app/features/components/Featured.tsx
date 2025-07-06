"use client"
import React from 'react';
// import FeaturedNews from './FeaturedNews';
// import { NewsItemProps } from '../types';
// import useSWR from 'swr';
// import { API_FEATURED_NEWS } from '../api';

// const fetcherFeaturedNews = async (...args: Parameters<typeof fetch>): Promise<NewsItemProps[]> => {
//     const response = await fetch(...args);
//     return response.json();
// };

const Featured = () => {
    // const { data: featuredNews = [], error, isLoading } = useSWR<NewsItemProps[]>(API_FEATURED_NEWS, fetcherFeaturedNews);
    // if (error) return <div>Failed to load featured news</div>;
    // if (isLoading || !featuredNews) return <div>Loading featured news...</div>;

    return (
        <section className="flex items-center justify-between xl:w-[60%]">
            <div className='max-w-7xl mx-auto'>
                <h3 className="uppercase text-md text-[#b70000] font-bold tracking-tighter mb-2">
                    Featured News
                </h3>
                <h2 className="text-4xl text-[#222222] tracking-tighter font-bold mb-10">
                    Featured News
                </h2>
                <ul className="flex flex-col items-center gap-6">
                    {/* {featuredNews.map((item) => <FeaturedNews key={item.id} item={item}></FeaturedNews>)} */}
                </ul>
            </div>
        </section>
    );
};

export default Featured;

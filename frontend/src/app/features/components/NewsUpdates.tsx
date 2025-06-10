/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NewsUpdatesProps } from '../types';
import NewsCard from './NewsCard';
import { API_NEWS_UPDATES } from '../api';

const fetcherNewsUpdates = async (url: string): Promise<NewsUpdatesProps[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
};

const NewsUpdates = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const { data: newsList = [], error, isLoading } = useSWR<NewsUpdatesProps[]>(
    API_NEWS_UPDATES, 
    fetcherNewsUpdates,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) return <div>Loading news updates...</div>;
  if (error) return <div>Failed to load news updates</div>;
  if (newsList.length === 0) return <div>No news available</div>;

  const getVisibleNewsCount = (width: number): number => {
    if (width < 640) return 1;    // Mobile
    if (width < 1024) return 2;   // Tablet
    return 3;                     // Desktop
  };

  const visibleNews = newsList.slice(0, getVisibleNewsCount(screenWidth));

  return (
    <>
      <section className='flex flex-col '>
        <div className='flex items-center gap-2 mb-8'>
          <img
            src="/assets/NewsUpdates-Icon.jpg" 
            alt="News updates icon"  
            className="object-contain w-20" 
          />
          <h2 className='text-3xl font-semibold text-gray-900'>News Updates</h2>
        </div>
        <ul className='grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch'>
          {visibleNews.map((currentNews) => (
            <NewsCard 
              key={currentNews.id}
              id={currentNews.id}
              title={currentNews.title}
              news_date={currentNews.news_date}
              content={currentNews.content}
              image_url={currentNews.image_url}
              is_published={currentNews.is_published}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default NewsUpdates;

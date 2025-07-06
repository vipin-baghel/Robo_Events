"use client"
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NewsUpdatesProps } from '../types';
import NewsCard from './NewsCard';
import { API_NEWS_UPDATES } from '../api';
import { ArrowLeft, ArrowRight, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fetcherNewsUpdates = async (url: string): Promise<NewsUpdatesProps[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
};

const NewsUpdates = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: newsList = [], error, isLoading } = useSWR<NewsUpdatesProps[]>(
    API_NEWS_UPDATES, 
    fetcherNewsUpdates,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      if(width < 640) setVisibleCount(1);
      else if(width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const getVisibleNewsCount = (width: number): number => {
  //   if (width < 640) return 1;    // Mobile
  //   if (width < 1024) return 2;   // Tablet
  //   return 3;                     // Desktop
  // };

  const handleNext = () => {
    if(currentIndex + visibleCount < newsList.length){
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if(currentIndex > 0){
      setCurrentIndex((prev) => prev - 1);
    }
  };

   if (isLoading) return <div>Loading news updates...</div>;
  if (error) return <div>Failed to load news updates</div>;
  if (newsList.length === 0) return <div>No news available</div>;
  const visibleNews = newsList.slice(currentIndex, currentIndex + visibleCount);

  return (
    <>
      <section className='flex flex-col '>
        <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 mb-8'>
          <Newspaper/>
          <h2 className='text-3xl font-semibold text-gray-900'>News Updates</h2>
        </div>
        <div className='flex items-center gap-2'>
          <Button 
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className='bg-red-600 hover:bg-red-700 focus:scale-[1.02] cursor-pointer data-[state=disabled]:bg-red-300 data-[state=disabled]:cursor-not-allowed'>
              <ArrowLeft className='w-6 h-6'/>
          </Button>
          <Button 
              onClick={handleNext}
              disabled={currentIndex + visibleCount >= newsList.length}
              className='bg-red-600 hover:bg-red-700 focus:scale-[1.02] cursor-pointer data-[state=disabled]:bg-red-300 data-[state=disabled]:cursor-not-allowed'>
          <ArrowRight />
          </Button>
        </div>
        </div>
        <div className='flex gap-6 overflow-hidden'>
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
        </div>
      </section>
    </>
  );
};

export default NewsUpdates;

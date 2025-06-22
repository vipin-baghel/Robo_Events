"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState, useEffect } from 'react'
import useSWR from 'swr';
import { TeamRankProps } from '../types';

import { API_EVENT_RANKS } from '../api';

const fetcherRank = async (...args: Parameters<typeof fetch>): Promise<TeamRankProps[]> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
};

const RankTable = () => {
  const { data: teams, error, isLoading } = useSWR<TeamRankProps[]>(API_EVENT_RANKS, fetcherRank);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  console.log("Ranks: ", teams);
    useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);
  if (error) console.log("Failed to get Top Team Ranks: ", error);
  if (isLoading || !teams) return <p>Loading...</p>

  teams.forEach(teamRank => {
    if (!teamRank.team) {
      console.warn('Missing team object for rank:', teamRank);
    }
  });



  return (
    // <div className='px-4'>
    //   <Table className='w-xl max-sm:w-[250px] max-md:w-2xl md:w-3xl lg:w-md text-center border-collapse overflow-auto'>
    //     <TableHeader className=''>
    //       <TableRow className='bg-[#b70000] hover:bg-[#b70000] text-white text-sm uppercase'>
    //         <TableHead className='text-white py-6 text-center'>Rank</TableHead>
    //         <TableHead className='text-white py-6 text-start'>Team</TableHead>
    //         <TableHead className='text-white py-6 text-center'>Points</TableHead>
    //         </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //         {teams.map((teamRank: TeamRankProps, index: number) => (
    //           <TableRow key={teamRank.id} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'}`}>
    //             <TableCell className='py-6 font-medium'>{teamRank.rank}</TableCell>
    //             <TableCell className='py-3'>
    //               {teamRank.team ? (
    //                  <div className='flex items-start gap-4'>
    //                 <span className='font-semibold'>
    //                   {teamRank.team.name} 
    //                   </span> 
    //                 <span className='font-semibold'>
    //                   {teamRank.team.institution}
    //                   </span>
    //               </div>
    //               ): (
    //                 <span className='italic text-gray-500'>Team data unavailable</span>
    //               )}


    //             </TableCell>

    //             <TableCell className='py-6 font-semibold'>{teamRank.points_earned}</TableCell>
    //             </TableRow>
    //         ))}

    //     </TableBody>
    //   </Table>

    // </div>
    <div className='px-4'>
      {screenWidth < 500
        ? (
          <div className='space-y-4'>
            {teams.map((teamRank: TeamRankProps, index: number) => (
              <div key={teamRank.id} className={`p-4 rounded-lg border ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'}`}>
                <div className='flex justify-between items-start mb-2'>
                  <div className='flex items-center gap-2'>
                    <span className='bg-[#b70000] text-white px-2 py-1 rounded text-sm font-bold'>
                      #{teamRank.rank}
                    </span>
                    <span className='font-bold text-lg'>{teamRank.points_earned} pts</span>
                  </div>
                </div>
                {teamRank.team ? (
                  <div className='space-y-1'>
                    <div className='font-semibold text-lg'>{teamRank.team.name}</div>
                    <div className='text-gray-600 text-sm'>{teamRank.team.institution}</div>
                  </div>
                ) : (
                  <span className='italic text-gray-500'>Team data unavailable</span>
                )}
              </div>
            ))}
          </div>
        )
        : (
          <div className='overflow-x-auto'>
            <Table className='min-w-[500px] w-full text-center border-collapse'>
              <TableHeader>
                <TableRow className='bg-[#b70000] hover:bg-[#b70000] text-white text-sm uppercase'>
                  <TableHead className='text-white py-4 px-3 text-center min-w-[60px]'>Rank</TableHead>
                  <TableHead className='text-white py-4 px-3 text-start min-w-[300px]'>Team</TableHead>
                  <TableHead className='text-white py-4 px-3 text-center min-w-[80px]'>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((teamRank: TeamRankProps, index: number) => (
                  <TableRow key={teamRank.id} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'}`}>
                    <TableCell className='py-4 px-3 font-medium'>{teamRank.rank}</TableCell>
                    <TableCell className='py-4 px-3 text-left'>
                      {teamRank.team ? (
                        <div className='space-y-1'>
                          <div className='font-semibold text-sm'>
                            {teamRank.team.name}
                          </div>
                          <div className='text-xs text-gray-600'>
                            {teamRank.team.institution}
                          </div>
                        </div>
                      ) : (
                        <span className='italic text-gray-500 text-sm'>Team data unavailable</span>
                      )}
                    </TableCell>
                    <TableCell className='py-4 px-3 font-semibold'>{teamRank.points_earned}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      }

    </div>
  )
}


export default RankTable

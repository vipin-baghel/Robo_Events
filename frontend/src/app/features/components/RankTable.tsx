import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'
import useSWR from 'swr';
import { TeamRankProps } from '../types';

import { API_EVENT_RANKS } from '../api';

const fetcherRank = async (...args: Parameters<typeof fetch>): Promise<TeamRankProps[]> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
};

const RankTable = () => {
  const {data: teams, error, isLoading} = useSWR<TeamRankProps[]>(API_EVENT_RANKS, fetcherRank);
  console.log("Ranks: ", teams);
  if(error ) console.log("Failed to get Top Team Ranks: ", error);
  if(isLoading || !teams) return <p>Loading...</p>

  teams.forEach(teamRank => {
  if (!teamRank.team) {
    console.warn('Missing team object for rank:', teamRank);
  }
});
  
  return (
    <div className='px-4'>
      <Table className='w-xl max-sm:w-xs max-md:w-2xl md:w-3xl lg:w-md text-center border-collapse'>
        <TableHeader className=''>
          <TableRow className='bg-[#b70000] hover:bg-[#b70000] text-white text-sm uppercase'>
            <TableHead className='text-white py-6 text-center'>Rank</TableHead>
            <TableHead className='text-white py-6 text-start'>Team</TableHead>
            <TableHead className='text-white py-6 text-center'>Points</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {teams.map((teamRank: TeamRankProps, index: number) => (
              <TableRow key={teamRank.id} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'}`}>
                <TableCell className='py-6 font-medium'>{teamRank.rank}</TableCell>
                <TableCell className='py-3'>
                  {teamRank.team ? (
                     <div className='flex items-start gap-4'>
                    <span className='font-semibold'>
                      {teamRank.team.name} 
                      </span> 
                    <span className='font-semibold'>
                      {teamRank.team.institution}
                      </span>
                  </div>
                  ): (
                    <span className='italic text-gray-500'>Team data unavailable</span>
                  )}
              
                 
                </TableCell>
              
                <TableCell className='py-6 font-semibold'>{teamRank.points_earned}</TableCell>
                </TableRow>
            ))}
          
        </TableBody>
      </Table>
      
    </div>
  )
}

export default RankTable

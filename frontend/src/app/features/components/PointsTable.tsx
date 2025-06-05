import React from 'react'
import { CompanyNameProps } from '../types'
import RankTable from './RankTable'

const PointsTable = ({companyName}:CompanyNameProps) => {
  return (
    <div className='bg-[#8d1f3d]'>
    <div className='px-4 py-20 lg:px-20 xl:px-24 flex flex-col lg:flex-row items-center max-lg:gap-y-6 lg:gap-6 justify-between'>
      {/* Content */}
      <div className=''>
         <h2 className='uppercase text-[1.95rem]  text-white font-bold mb-12 leading-tight'>Championing Excellence and Nurturing Individual Growth</h2>
         <p className='ml-4 text-[1.1rem] italic text-white font-medium w-full leading-relaxed tracking-tight '>Beyond a competition, {companyName} is the fertile ground where personal growth sprouts, where we nurture innovation and self-discovery. We empower you to transcend limits in robotics and automation, shaping you into a confident, capable individual ready to conquer the future.</p>
      </div>
      <div>
        <RankTable />
      </div>
      </div>

    </div>
  )
}

export default PointsTable

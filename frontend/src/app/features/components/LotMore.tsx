/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { CompanyNameProps } from '../types'

const LotMore = ({companyName}: CompanyNameProps) => {
    const competitions = [
        {id: 1, title: "Sumo Bots", src:"https://www.technoxian.com/images/Sumo-Bot.jpg"},
        {id: 2, title: "Drone Racing", src: "https://www.technoxian.com/images/drone-race.jpg"},
        {id: 3, title: "RC Car Racing", src: "https://www.technoxian.com/images/RC-car.jpg"},
        {id: 4, title: "Drone Soccer", src: "https://www.technoxian.com/images/drone-soccer.jpg"},
        {id: 5, title: "Robo Hockey", src: "https://www.technoxian.com/images/robo-hockey.jpg"}
    ]
  return (
    <div>
      {/* Content */}
      <div className='mb-6'>
          <p className='uppercase text-md text-[#b70000] font-bold'>World Robotics Championship</p>
          <div className='flex flex-col lg:flex-row items-center max-lg:items-start gap-y-2 justify-between'>
          <h2 className='uppercase text-2xl max-lg:text-[2rem] lg:text-[2.5rem] text-[#222222] font-bold'>A LOT MORE NEW THIS SEASON</h2>
          <button className='capitalize bg-[#094277] text-white text-sm flex items-center justify-center px-4 py-2 rounded-md'>Registration Process for {companyName} World Cup &apos; 25</button>
          </div>
      </div>
      {/* Images */}
      <div className='w-full flex flex-col lg:flex-row items-center gap-3 justify-between'>
        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1 grid-rows-2 w-full'>
          {competitions.map((competition, index) => (
            <div key={competition.id}
              className={`w-full h-full relative group overflow-hidden shadow-md ${index === 1? 'md:cols-span-2 md:row-span-2': ''}`} >
                  <img
                    src={competition.src}
                    alt={competition.title}
                    className="object-fill w-full h-full  group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="uppercase absolute bottom-2 left-2  px-3 py-1 rounded text-white text-2xl font-medium">
                    {competition.title}
                  </div>
               </div>
          ))}
        </div>

        {/* Poster */}
        <div className='max-md:w-full max-lg:hidden'>
          <img 
            src="https://www.technoxian.com/images/RightBanner.jpg"
            alt='Robotics Championship'
            className='w-full object-fill'
          />
        </div>
      </div>
    </div>
  )
}

export default LotMore

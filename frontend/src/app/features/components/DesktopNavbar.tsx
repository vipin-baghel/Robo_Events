"use client"
import { ChevronDown, Download } from 'lucide-react'
import React from 'react'
import { useHoverContext } from './HoverProvider'

const DesktopNavbar = () => {
  const {setIsEventsHovered } = useHoverContext();
  return (
    <div className='flex items-center gap-3 justify-between'>
        {/* Home */}
     <div className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold '>Home</div>
     {/* Events */}
      <div 
         onMouseEnter={() => setIsEventsHovered(true)}
         onMouseLeave={() => setIsEventsHovered(false)}
        className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold flex items-center gap-0.5 '>Events
        <ChevronDown className='w-5'/>
      </div>

      {/* Community */}
       <div className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold flex items-center gap-0.5 '>Community
        <ChevronDown className='w-5'/>
      </div>
        {/* Membership */}
          <div className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold '>Membership</div>
        {/* Gallery */}
          <div className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold '>Gallery</div>
          {/* More */}
                 <div className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold flex items-center gap-0.5 '>More
        <ChevronDown className='w-5'/>
      </div>
      {/* Button */}
      <button className='max-xl:hidden w-[150px] p-2 bg-[#b70000] font-bold text-white rounded-sm flex items-enter justify-center gap-0.5 uppercase tracking-tighter'>
        <Download className='w-7' />
         Certificate
      </button>

      
      
    </div>
  )
}

export default DesktopNavbar

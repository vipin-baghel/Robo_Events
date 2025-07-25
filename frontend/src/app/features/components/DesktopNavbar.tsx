"use client"
import { ChevronDown, Download } from 'lucide-react'
import React from 'react'
import DropdownEvents from './DropdownEvents'
import Link from 'next/link'

const DesktopNavbar = ({onContactClick}: {onContactClick: () => void}) => {
  return (
    <div className='flex items-center gap-3 justify-between'>
        {/* Home */}
    <Link href="/" className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold '>Home</Link>
     {/* Events */}
      <DropdownEvents/>

      {/* Community */}
       <div className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold flex items-center gap-0.5 '>Community
        <ChevronDown className='w-5'/>
      </div>
      {/* Membership */}
      <Link href="/" className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold '>Membership
      </Link>
      {/* Gallery */}
      <Link href="/" className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold '>Gallery
      </Link>
      {/* More */}
      <div className='hover:bg-[#212840] px-1 py-8 text-[#7c859a] uppercase text-base tracking-tighter font-semibold flex items-center gap-0.5 '>More
        <ChevronDown className='w-5'/>
      </div>
      {/* Button */}
      <button onClick={onContactClick}
              className='max-xl:hidden w-[150px] p-2 bg-[#b70000] font-bold text-white rounded-sm flex items-enter justify-center gap-0.5 uppercase tracking-tighter'>
        <Download className='w-7' />
         Contact Us
      </button>

      
      
    </div>
  )
}

export default DesktopNavbar

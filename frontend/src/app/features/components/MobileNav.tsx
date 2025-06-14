"use client"
import { Button } from '@/components/ui/button'
import { ChevronDown, Download } from 'lucide-react'
import React, { SetStateAction, useState } from 'react'
import DesktopEventCards from './DesktopEventCard'
import { Dispatch } from 'react'
import Link from 'next/link'

type MobileNavProps = {
 setIsOpen: Dispatch<SetStateAction<boolean>>;
 onContactClick: () => void;
}
const MobileNav = ({setIsOpen, onContactClick}: MobileNavProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleVisible = () => {
    setIsVisible(!isVisible);
  }
  return (
    <div className='px-2 flex flex-col lg:flex-row gap-y-4'>
        <Link href="/" className='hover:bg-[#212840] p-2 text-[#7c859a] hover:text-white border-b border-dotted uppercase text-base tracking-tighter font-semibold'>
            HOME
        </Link>
         <div 
            onClick={handleVisible}
            className='hover:bg-[#212840] p-2 text-[#7c859a] hover:text-white border-b border-dotted uppercase text-base tracking-tighter flex items-center gap-0.5 font-semibold'>
            Events 
            <ChevronDown className='w-5' />
        </div>
         {isVisible && (
          <div>
           <DesktopEventCards setIsOpen={setIsOpen}/>
        </div>
          )}
        
         <div className='hover:bg-[#212840] p-2 text-[#7c859a] hover:text-white border-b border-dotted uppercase text-base tracking-tighter flex items-center gap-0.5 font-semibold'>
            Community 
            <ChevronDown className='w-5' />
        </div>
         <Link href="/" className='hover:bg-[#212840] p-2 text-[#7c859a] hover:text-white border-b border-dotted uppercase text-base tracking-tighter flex items-center font-semibold'>
            Membership
        </Link>
         <Link href="/" className='hover:bg-[#212840] p-2 text-[#7c859a] hover:text-white border-b border-dotted uppercase text-base tracking-tighter flex items-center gap-1 font-semibold'>
            Gallery
        </Link>
          <div className='hover:bg-[#212840] p-2 text-[#7c859a] hover:text-white border-b border-dotted uppercase text-base tracking-tighter flex items-center gap-0.5 font-semibold'>
            More 
            <ChevronDown className='w-5'/>
        </div>
        <Button onClick={onContactClick}
                className='lg:hidden uppercase w-full h-10 bg-[#b70000] text-base tracking-tighter text-white font-bold rounded-sm flex items-center justify-center gap-2 p-2 py-2 hover:bg-[#b70000] '
          >
            <Download className='w-7' />
            Contact Us
          </Button>
      
    </div>
  )
}

export default MobileNav

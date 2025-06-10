/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import DesktopNavbar from './DesktopNavbar'
import { Menu, X } from 'lucide-react'
import MobileNav from './MobileNav'
import CountdownBanner from './CountdownBanner'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CountdownBanner />
      <header className='bg-white p-4  lg:px-24 shadow-md'>
        
        <div className='max-x-7xl flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <img 
               src="/assets/Technoxian-Logo.png"
               alt='logo'
               className='object-contain w-[280px] max-md:w-[200px] max-sm:w-[180px]'
            />
          </div>

          <div className='max-lg:hidden'>
            <DesktopNavbar/>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} className='lg:hidden text-gray-900 cursor-pointer'>
              {isOpen ? <X  className='w-14'/> :  <Menu className='w-14' /> }
           
          </button>
          </div>
        
        {isOpen && (
          <div className='lg:hidden inset-0 bg-white h-[500px]'>
            <MobileNav/>
          </div>
        )}

      </header>
      
    </div>
  )
}

export default Header

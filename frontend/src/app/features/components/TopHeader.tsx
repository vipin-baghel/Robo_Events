import React from 'react'
import { FaCaretDown, FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa6'
import CountdownBanner from './CountdownBanner'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

const TopHeader = () => {
  return (
  <section>
    <CountdownBanner />
   <div className='bg-[#20273f] px-4 lg:px-24 py-2 flex items-center justify-between'>
     {/* Social Icons */}
     <div className='max-sm:hidden flex items-center gap-1'>
      <div className="w-8 h-8 bg-[#2b3249] hover:bg-[#4267b2] rounded-sm text-[#687085] hover:text-white flex items-center justify-center">
        <FaFacebookF />
      </div>
      <div className="w-8 h-8 bg-[#2b3249] hover:bg-[#1cb7eb] rounded-sm text-[#687085] hover:text-white flex items-center justify-center">
        <FaTwitter />
      </div>
      <div className="w-8 h-8 bg-[#2b3249] hover:bg-[#a8a8a8] rounded-sm text-[#687085] hover:text-white flex items-center justify-center">
        <FaInstagram/>
      </div>
      <div className="w-8 h-8 bg-[#2b3249] hover:bg-[#1686b0] rounded-sm text-[#687085] hover:text-white flex items-center justify-center">
        <FaLinkedin />
      </div>
      <div className="w-8 h-8 bg-[#2b3249] hover:bg-[#dc472e] rounded-sm text-[#687085] hover:text-white flex items-center justify-center">
        <FaYoutube />
      </div>
     </div>

     {/* Right Container */}
     <div className='flex flex-col lg:flex-row items-center gap-4'>
      <div className='flex items-center gap-4'>
        <Button className='border p-1 bg-transparent flex items-center gap-2 rounded-none'>
          <FcGoogle size={15} className="bg-white" />
          <span className='uppercase text-sm text-gray-300'>Select Language</span>
          <FaCaretDown className='text-gray-400'/>
        </Button>
        <Link href="/" className='uppercase text-xs text-white hover:text-red-700'>TECHIELA </Link>
        </div>
      <div className='flex items-center gap-4'>
         <Link href="/" className='uppercase text-xs text-white hover:text-red-700'>Robo club login</Link>
          <Link href="/" className='uppercase text-xs text-white hover:text-red-700'>Roboclub Registration  </Link>
        </div>
        
     </div>
   </div>
   </section>
  )
}

export default TopHeader

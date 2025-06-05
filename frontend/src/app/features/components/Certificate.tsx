/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Certificate = () => {
  return (
    <div className="lg:max-w-[600px] w-full rounded-sm py-3" style={{boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`}}>
        <header className='flex items-center justify-between mb-2 px-6'>
            <img src="/assets/itm-logo.webp" alt='IT-logo' width={100} height={100} />
            <div className='flex flex-col items-center gap-4'>
              <h2 className='uppercase text-[#b70000] text-lg font-semibold'>Government</h2>
              <div className='bg-gray-300 px-4 rounded-sm h-[1px]'></div>
            </div>
            <img src="/assets/aicra-logo.gif"  alt='AICRA-logo' width={100} height={100} />
        </header>
        <div className='uppercase w-full bg-[#b70000] text-center text-white font-semibold text-md px-4 py-2 mb-3'>Partnership</div>
        <h2 className='uppercase text-lg text-[#b70000] font-semibold text-center mb-3'>Think Tanks</h2>
        <div className='flex items-center max-md:gap-12 justify-between px-8'>
          <img src="/assets/ifes-log.webp" alt="IFES-logo" width={150} height={150} className="w-30 object-contain" />
          <img src="/assets/cops.webp" alt='CAPS-logo' width={150} height={150} className="w-30 object-contain" />
          <img src="/assets/usi.webp" alt='USI-logo' width={150} height={150} className="w-30 object-contain" />
        </div>
      
    </div>
  )
}

export default Certificate

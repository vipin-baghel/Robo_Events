'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaChevronDown, FaDownload, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Events', icon: <FaChevronDown /> },
    { label: 'Community' },
    { label: 'Membership' },
    { label: 'Gallery' },
    { label: 'More' },
  ]

  return (
    <div className="bg-white">
      {/* Top Navbar */}
      <div className="max-md:hidden flex gap-4 items-center justify-between px-4 py-4">
        {/* Desktop Menu */}
        <div className="flex gap-6 items-center">
          {navItems.map((item, index) => (
            <div key={index} className="hover:bg-[#212840] px-2 py-2 group">
              <Link href={item.href || '#'}>
                <h2 className="uppercase text-[#7c859a] group-hover:text-white font-semibold text-md truncate flex items-center gap-2 cursor-pointer">
                  {item.label}
                  {item.icon && item.icon}
                </h2>
              </Link>
            </div>
          ))}
        </div>

        {/* Certificate Button */}
        <button className="bg-red-700 rounded-sm px-4 py-2 text-white font-bold uppercase flex items-center gap-2">
          <FaDownload />
          Certificate
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden px-4 py-3 flex justify-between items-center">
        <h2 className="text-white text-xl font-bold">TechnoXian</h2>

        <button onClick={toggleMobileMenu} className="text-white text-2xl">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-[#0f111a] px-6 pb-4 space-y-3">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href || '#'}>
              <h2 className="text-[#7c859a] hover:text-white uppercase font-semibold flex items-center gap-2">
                {item.label}
                {item.icon && item.icon}
              </h2>
            </Link>
          ))}

          <button className="bg-red-700 mt-2 rounded-sm px-4 py-2 text-white font-bold uppercase flex items-center gap-2">
            <FaDownload />
            Certificate
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar

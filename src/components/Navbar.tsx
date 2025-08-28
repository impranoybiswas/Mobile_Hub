import SiteTitle from '@/ui/SiteTitle'
import Link from 'next/link'
import React from 'react'
import { RiMenu3Fill } from 'react-icons/ri'

export default function Navbar() {
  return (
    <nav className='flex justify-center items-center w-full h-16 shadow'>

        {/* Desktop Section */}
        <section className='hidden md:flex justify-between items-center w-11/12'>
            <div className="flex-1 flex justify-start">
                <SiteTitle/>
            </div>
            <div className="flex-4 flex justify-center items-center gap-4">
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
            </div>
            <div className="flex-1 flex justify-end items-center">
                <Link className='btn' href="/auth/login">Login</Link>
            </div>
        </section>

        {/* Mobile Section */}
        <section className='flex md:hidden justify-between items-center w-full px-4'>
            <SiteTitle/>
            <RiMenu3Fill size={32} />

        </section>
      
    </nav>
  )
}

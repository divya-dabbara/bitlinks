import React from 'react'
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='h-16 bg-purple-700 flex items-center justify-between px-3 text-white'>
        <div className="logo font-bold text-lg">
            <Link href="/">Bitlinks</Link>
        </div>
        <ul className='flex items-center gap-4 justify-center'>
            <Link href="/"><li>Home</li></Link>
            <Link href="/about"><li>About</li></Link>
            <Link href="/shorten"><li>Shorten</li></Link>
            <Link href="/contact"><li>Contact Us</li></Link>
            <li className='flex gap-3'>
                <Link href="/shorten"><button className='bg-purple-500 shadow-lg rounded-lg p-3 py-1 font-bold'>Try Now</button></Link>
                <Link href="/github"><button className='bg-purple-500 shadow-lg rounded-lg p-3 py-1 font-bold'>GitHub</button></Link>
            </li>
        </ul>
        </nav>
  )
    
}

export default Navbar

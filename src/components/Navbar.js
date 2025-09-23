import React from 'react'
import Link from 'next/link'

function Navbar() {
  
  return (
    <div className='bg-cyan-800 flex justify-between h-16 py-2'>
      <div className='text-3xl font-bold text-white'>Aplikasi Web</div>
      <div>
        <Link href='/login'>
        <button className='text-2xl ml-2 font-bold text-white'>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
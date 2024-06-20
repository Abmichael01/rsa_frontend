import React from 'react'
import Navbar from "../components/Navbar"


const MainLayout = ({ children }) => {
  return (
    <div>
      <div className='relative z-5 font-roboto text-zinc-600'>
        <Navbar />
        {children}
      </div>

    </div>
  )
}

export default MainLayout
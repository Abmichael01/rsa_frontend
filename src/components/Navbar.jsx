import React from 'react'
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import useUserData from './useUserData'

const Navbar = () => {
  const token = localStorage.getItem(REFRESH_TOKEN)
  const user = useUserData()

  return (
    <div className='bg-white h-20 w-full flex justify-between items-center px-20 border-b border-zinc-300 sticky top-0 z-50 shadow-md sha'>
      <Link to="/">
        <div className='flex flex-col gap-0'>
          <h2 className='text-[23px] font-bold text-primary-800 font-anta tracking-wider'>RSA</h2>
          <h2 className='text-[14px] font-quicksand font-semibold text-zinc-700 tracking-wider mt-[-8px]'>RoomAllocationSystem</h2>
        </div>
      </Link>
      <nav className=''>
        {!token &&
          <Link to="/signup" className='text-[18px]'>Signup</Link>
        }
        {
          token &&
          <div>
            <div className='flex items-center gap-5' >
              <p className='text-[16px] text-zinc-700 tracking-wider'>{user.email}</p>
              <Link to='/logout'>
                <i className="fa-solid fa-right-from-bracket text-[20px] text-zinc-400 cursor-pointer hover:text-zinc-500 transition-all duration-300"></i>
              </Link>
            </div>
          </div>
        }
      </nav>
    </div>
  )
}

export default Navbar
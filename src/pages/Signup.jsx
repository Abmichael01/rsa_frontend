import React from 'react'
import MainLayout from '../layout/MainLayout'
import FixedBg from '../components/FixedBg'
import SignupForm from "../components/SignupForm"

const Signup = () => {
  return (
    
    <MainLayout>
        <FixedBg />
        <div className='flex justify-center'>
          <SignupForm />
        </div>
    </MainLayout>   
    
  )
}

export default Signup
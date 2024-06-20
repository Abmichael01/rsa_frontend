import React from 'react'
import MainLayout from '../layout/MainLayout'
import FixedBg from '../components/FixedBg'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    
    <MainLayout>
        <FixedBg />
        <div className='flex justify-center'>
          <LoginForm />
        </div>
    </MainLayout>   
    
  )
}

export default Login
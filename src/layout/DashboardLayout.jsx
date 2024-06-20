import React from 'react'
import { HOSTEL_SECRET_KEY } from '../constants'
import MainLayout from './MainLayout'
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const DashboardLayout = ({ children }) => {
  const secretKey = localStorage.getItem(HOSTEL_SECRET_KEY)
  const navigate = useNavigate()

  useEffect(() => {
    if (!secretKey) {
      toast.error("You are not authorized access the page")
      navigate("/")
    } 
  }, [])

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

export default DashboardLayout

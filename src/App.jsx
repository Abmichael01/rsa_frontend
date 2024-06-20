import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Hostels from "./pages/Hostels"
import HostelDashboard from './pages/HostelDashboard'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
import BlockDashboard from './pages/BlockDashboard'
import RoomDashboard from './pages/RoomDashboard'
import HostelData from './pages/HostelData'
import BlockData from './pages/BlockData'



function SignupAndLogout() {
  localStorage.clear()
  return <Signup />
}

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}

      />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <ProtectedRoute>
              <Hostels />
            </ProtectedRoute>
          } />

          <Route path='/hostel/:hostelId' element={
            <ProtectedRoute>
              <HostelDashboard />
            </ProtectedRoute>
          } />

          <Route path='/block/:blockId' element={
            <ProtectedRoute>
              <BlockDashboard />
            </ProtectedRoute>
          } />

          <Route path='/room/:roomId' element={
            <ProtectedRoute>
              <RoomDashboard />
            </ProtectedRoute>
          } />

          <Route path='/hostel-data/:hostelId' element={
            <ProtectedRoute>
              <HostelData />
            </ProtectedRoute>
          } />

          <Route path='/block-data/:blockId' element={
            <ProtectedRoute>
              <BlockData />
            </ProtectedRoute>
          } />


          <Route path="/login" element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path="/signup" element={<SignupAndLogout />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

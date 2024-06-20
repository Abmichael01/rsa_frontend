import { Navigate, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import useUserData from "./useUserData"
import NotApproved from "./NotApproved"

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const [isApproved, setIsApproved] = useState(true)
  const user = useUserData()
  const navigate = useNavigate()

  useEffect(()=>{
    auth().catch(()=>{setIsAuthorized(false)})
    setIsApproved(user.approved)
  })

  const refreshToken = async () =>{
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try{
      const response = await api.post("/api/token/refresh/", {refresh: refreshToken});
      if (response.status == 200){
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        setIsAuthorized(true)
      }else{
        setIsAuthorized(false)
      }
    }catch(error){
      console.log(error)
      setIsAuthorized(false)
      navigate("/login")
      toast.info("Please login to continue")
    }
  }

  const auth = async ()=>{
    const token = localStorage.getItem(ACCESS_TOKEN)
    if(!token){
      setIsAuthorized(false)
      return
    }

    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now()/1000

    if(tokenExpiration < now){
      await refreshToken()
    }else{
      setIsAuthorized(true)
    }
  }

  if(isAuthorized===null){
    return <div>Loading...</div>
  }

  // if(!isApproved){
  //   return <NotApproved />
  // } else{
  //   return isAuthorized ? children : <Navigate to="/login" {...toast.info("Please login to continue")} />
  // }

  if(isAuthorized){
    if(isApproved){
      return children
    }else{
      return <NotApproved />
    }
  }else{
    return <Navigate to="/login" {...toast.info("Please login to continue")} />
  }



  
}

export default ProtectedRoute
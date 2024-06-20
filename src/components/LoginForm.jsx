import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/images/bowen-logo.png"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import Loader from "./Loader"

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const email = data.email
    const password = data.password
    setLoading(true)
    console.log(data)

    try {
      const response = await api.post("/api/token/", { email, password })
      if (response.status === 200) {
        setLoading(false)
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
        navigate("/")
        toast.success("You have successfully logged in")
      }
    } catch (error) {
      setLoading(false)
      if (error.response.data.detail ) {
        toast.error(`${error.response.data.detail}`)
      } else if (error.response.status == 400){
        toast.error(`Please submit a valid form`)
      }
      else {
        console.log(error.response)
      }
      console.log(error)
    }


  }

  return (
    <div className="mt-14 mb-14">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <img srcSet={logo} alt="logo" className="logo w-[100px] text-center self-center" />
        <h2 className="text-xl text-zinc-600">Welcome back</h2>
        <input type="text" placeholder="Email" className="input" {...register("email")} />
        <input type="password" placeholder="Password" className="input" {...register("password")} />

        <button type="submit" className={`auth-btn  ${loading && "bg-primary-500 cursor-not-allowed"}`} disabled={loading}>
          {!loading && <p>Login</p>}
          {loading && <Loader/>}
        </button>
        <p className="text-[15px]">Are you new? <Link to="/signup" className="hover:underline"> Signup </Link></p>
      </form>
    </div>
  )
}

export default LoginForm

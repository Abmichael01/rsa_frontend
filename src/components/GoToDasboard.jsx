import DarkOverlay from "./DarkOverlay"
import { useForm } from "react-hook-form"
import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { HOSTEL_SECRET_KEY } from "../constants"
import Loader from "./Loader"


const GoToDasboard = (props) => {
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    const { goToDasboard, setGoToDasboard } = props
    const {hostelId} = props
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        setLoading(true)
        const secretKey = data.secretKey
        console.log(hostelId)
        api.post("/api/access-hostel/", {hostelId, secretKey })
            .then(res => {
                if (res.status === 200) {
                    navigate(`/hostel/${hostelId}`)
                    toast.success("Secret code confirmed")
                    localStorage.setItem(HOSTEL_SECRET_KEY, secretKey)
                    setLoading(false)
                    setGoToDasboard(false)
                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                if (error.response.status === 401){
                    toast.error("Invalid secret key")
                }
            })
    }

    return (
        <div className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-10 h-screen">
            <DarkOverlay />
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div onClick={() => { setGoToDasboard(false) }} className="absolute right-6 top-5 text-2xl text-red-400 hover:text-red-500 transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <h1 className="text-[20px] font-quicksand font-600">Enter secret key to gain access</h1>
                <div className="flex flex-col gap-1">
                    <input type="password"  placeholder="Secret Key" className="input" {...register("secretKey")} />
                </div>
                <button type="submit" className={`auth-btn  ${loading && "bg-primary-500 cursor-not-allowed"}`} disabled={loading} >
                    {!loading && <p>Submit</p>}
                    {loading && <Loader/>}
                </button>
            </form>
        </div>
    )
}

export default GoToDasboard

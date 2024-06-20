import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/images/bowen-logo.png"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from "react-toastify"
import api from "../api"
import Loader from "./Loader"

const SignupForm = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(20).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        console.log(data)
        setLoading(true)

        const email = data.email
        const password = data.password

        try{
            const response = await api.post("/api/user/register/", {email, password})
            if (response.status === 201){
                toast.success("Account created successfully")
                setLoading(false)
                navigate("/login")
            }
        } catch(error){
            setLoading(false)
            if (error.response.data.email){
                toast.error(`${error.response.data.email}`)
            } else{
                console.log(error.response)
            }
        }
        
    }

    return (
        <div className="mt-14 mb-14">
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <img srcSet={logo} alt="logo" className="logo w-[100px] text-center self-center" />
                <h2 className="text-xl text-zinc-600">Create a new account</h2>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Email" className={`input`} {...register("email")} />
                    {errors.email?.message && <span className="error">{errors.email?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="password" placeholder="Password" className="input" {...register("password")} />
                    {errors.password?.message && <span className="error">{errors.password?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="password" placeholder="Confirm Password" className="input" {...register("confirmPassword")} />
                    {errors.confirmPassword?.message && <span className="error">{errors.confirmPassword?.message}</span>}
                </div>

                <button type="submit" className={`auth-btn  ${loading && "bg-primary-500 cursor-not-allowed"}`} disabled={loading} >
                    {!loading && <p>Signup</p>}
                    {loading && <Loader/>}
                </button>
                <p className="text-[15px]">Are you a registered staff? <Link to="/login" className="hover:underline"> Login </Link></p>
            </form>
        </div>
    )
}

export default SignupForm

import DarkOverlay from "./DarkOverlay"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "./Loader"

const AddBlock = (props) => {
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    const { setIsOpen } = props
    const { setBlocks } = props 
    const { hostelId } = props
    

    const schema = yup.object().shape({
        blockName: yup.string().required("Hostel name is required").min(3, "Block name must be at least 3 characters"),
        roomNo: yup.number().typeError("Number of room must be a number type").required("Number of rooms is required").min(1, "Number of rooms must be equal or grater than 1"),
        capacity: yup.number().typeError("Room capacity must be a number type").required("Room capacity is required").min(1, "Room capacity must be equal or grater than 1")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        console.log(data)
        setLoading(true)
        console.log(hostelId)
        const blockName = data.blockName
        const roomNo = data.roomNo
        const capacity = data.capacity
        api.post("/api/add-block/", {hostelId, blockName, roomNo, capacity})
        .then(res=>{
            if(res.status === 201){
                // navigate("/")
                toast.success(`Block added successfully with ${roomNo} rooms `)
                setLoading(false)
                setIsOpen(false)
                setBlocks(res.data)
            }
        })
        .catch(error=>{
            console.log(error)
            setLoading(false)
        })
    }

    return (
        <div className="flex py-32 justify-center fixed top-0 right-0 bottom-0 left-0 z-10 h-screen">
            <DarkOverlay onClick={()=>{setIsOpen(false)}}  />
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div onClick={()=>{setIsOpen(false)}} className="absolute right-6 top-5 text-3xl text-red-400 hover:text-red-500 transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <h1 className="text-2xl font-quicksand font-600">Add a new block</h1>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Block Name" className="input" {...register("blockName")} />
                    {errors.blockName?.message && <span className="error">{errors.blockName?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="number" placeholder="Number of rooms" className="input" {...register("roomNo")} />
                    {errors.roomNo?.message && <span className="error">{errors.roomNo?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="number" placeholder="Number of students per room" className="input" {...register("capacity")} />
                    {errors.capacity?.message && <span className="error">{errors.capacity?.message}</span>}
                </div>
                <button type="submit" className={`auth-btn  ${loading && "bg-primary-500 cursor-not-allowed"}`} disabled={loading} >
                    {!loading && <p>Submit</p>}
                    {loading && <Loader />}
                </button>
            </form>
        </div>
    )
}

export default AddBlock

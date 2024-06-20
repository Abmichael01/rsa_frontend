import DarkOverlay from "./DarkOverlay"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "./Loader"

const AddStudent = (props) => {
    const [loading, setLoading] = useState(null)
    const { setIsOpen } = props
    const { roomId } = props
    const { roomName } = props
    const { getRooms } = props
    


    const schema = yup.object().shape({
        studentName: yup.string().required("Student's name is required").min(6, "Student's name must be at least 6 characters"),
        matricNo: yup.string().required("Matric number is required"),
        college: yup.string().required("College is required"),
        department: yup.string().required("Department is required"),
        studentNo: yup.string().required("Student's phone number is required"),
        parentNo: yup.string().required("Parent's phone number is required"),
        resumptionDate: yup.date().typeError("Invalid date format").required("Resumption date is required")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        
        setLoading(true)

        data.resumptionDate = new Date(data.resumptionDate).toISOString().slice(0, 10)

        const formData = {...data, roomId}

        console.log(roomId)
       
        api.post("/api/add-student/", formData)
            .then(res => {
                if (res.status === 201) {
                    toast.success(`${data.studentName} was successfully added to  ${roomName}`)
                    getRooms()
                    setLoading(false)
                    setIsOpen(false)
                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    return (
        <div className="flex justify-center fixed z-10 w-screen max-h-screen pt-10 pb-[150px] overflow-y-auto">
            <DarkOverlay onClick={()=>{setIsOpen(false)}} />
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div onClick={() => { setIsOpen(false) }} className="absolute right-6 top-5 text-3xl text-zinc-400 hover:text-red-400 transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <h1 className="text-xl font-quicksand font-600">Add a new student to {roomName}</h1>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Student's Name" className="input" {...register("studentName")} />
                    {errors.studentName?.message && <span className="error">{errors.studentName?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Matric Number" className="input" {...register("matricNo")} />
                    {errors.matricNo?.message && <span className="error">{errors.matricNo?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="College" className="input" {...register("college")} />
                    {errors.college?.message && <span className="error">{errors.college?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Department" className="input" {...register("department")} />
                    {errors.department?.message && <span className="error">{errors.department?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="tel" placeholder="Student's Phone Number" className="input" {...register("studentNo")} />
                    {errors.studentNo?.message && <span className="error">{errors.studentNo?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="tel" placeholder="Parent's Phone Number" className="input" {...register("parentNo")} />
                    {errors.parentNo?.message && <span className="error">{errors.parentNo?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="date" placeholder="Resumption Date" className="input" {...register("resumptionDate")} />
                    {errors.resumptionDate?.message && <span className="error">{errors.resumptionDate?.message}</span>}
                </div>
                <button type="submit" className={`auth-btn  ${loading && "bg-primary-500 cursor-not-allowed"}`} disabled={loading} >
                    {!loading && <p>Submit</p>}
                    {loading && <Loader/>}
                </button>
            </form>
        </div>
    )
}

export default AddStudent

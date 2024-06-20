import DarkOverlay from "./DarkOverlay"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState, useEffect } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "./Loader"
import HostelData from "../pages/HostelData"

const AddHostel = (props) => {
    const [loading, setLoading] = useState(null)
    const [loadingHostel, setLoadingHostel] = useState(null)
    const navigate = useNavigate()
    const { addHostel, setAddHostel, editHostel, setEditHostel, hostelId } = props
    const { setHostels } = props
    const [hostelData, setHostelData] = useState([])

    const schema = yup.object().shape({
        hostelName: yup.string().required("Hostel name is required").min(3, "Hostel name must be at least 3 characters"),
        secretKey: yup.string().required("Secret key is required").min(6, "Secret key must be at least 6 characters").max(20, "Secret key must be at most 20 characters")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    if (editHostel) {
        useEffect(() => {
            api.get(`/api/get-hostel/${hostelId}/`)
                .then(res => {
                    setHostelData(res.data)
                    console.log(res.data)
                    setLoadingHostel(false)
                })
        }, [])
    }

    const submitAddStudent = (data) => {
        setLoading(true)
        const name = data.hostelName
        const secretKey = data.secretKey
        api.post("/api/add-hostel/", { name, secretKey })
            .then(res => {
                if (res.status === 201) {
                    // navigate("/")
                    toast.success("Hostel added successfully")
                    setLoading(false)
                    setAddHostel(false)
                    setHostels(res.data)
                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    const submitEditStudent = (data) => {
        setLoading(true)
        const name = data.hostelName
        const secretKey = data.secretKey
        api.post(`/api/edit-hostel/${hostelId}/`, { name, secretKey })
           .then(res => {
                if (res.status === 200) {
                    // navigate("/")
                    toast.success("Hostel edited successfully")
                    setLoading(false)
                    setEditHostel(false)
                    setHostels(res.data)
                }
            })
           .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }


    const onSubmit = (data) => {
        if (addHostel) {
            submitAddStudent(data)
        } else {
            submitEditStudent(data)
        }
    }

    const close = () => {
        if (addHostel) {
            setAddHostel(false)
        } else {
            setEditHostel(false)
        }
    }

    return (
        <div className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-10 h-screen">
            <DarkOverlay onClick={close} />
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div onClick={close} className="absolute right-6 top-5 text-3xl text-red-400 hover:text-red-500 transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <h1 className="text-xl font-quicksand font-600">
                    {addHostel && <p>Add a new hostel</p>}
                    {editHostel && <p>Edit hostel</p>}
                </h1>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Hostel Name" defaultValue={hostelData.name} className="input" {...register("hostelName")} />
                    {errors.hostelName?.message && <span className="error">{errors.hostelName?.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Secret Key" defaultValue={hostelData.secret_key} className="input" {...register("secretKey")} />
                    {errors.secretKey?.message && <span className="error">{errors.secretKey?.message}</span>}
                </div>
                <button type="submit" className={`auth-btn  ${(loadingHostel || loading) && "bg-primary-500 cursor-not-allowed"}`} disabled={loadingHostel || loading} >
                    {!loading && <p>Submit</p>}
                    {loading && <Loader />}
                </button>
            </form>
        </div>
    )
}

export default AddHostel

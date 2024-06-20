import { useNavigate } from "react-router-dom"

const BackBtn = () => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>{navigate(-1)}} className="px-3 cursor-pointer py-1 text-primary-600 border border-primary-600 rounded-md text-[16px] font-quicksand">
            <i className="fa-solid fa-arrow-left"></i>
        </div>
    )
}

export default BackBtn

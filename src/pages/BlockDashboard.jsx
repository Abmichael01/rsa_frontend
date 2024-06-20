import { useParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import api from "../api"
import useUserData from "../components/useUserData"
import DashboardLayout from "../layout/DashboardLayout"
import BackBtn from "../components/BackBtn"
import AddStudent from "../components/AddStudent"
import Loader from "../components/Loader"

const BlockDashboard = () => {
    const { blockId } = useParams()
    const navigate = useNavigate()
    const [block, setBlock] = useState([])
    const user = useUserData()
    const [rooms, setRooms] = useState([])
    const [addStudent, setAddStudent] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState("")
    const [selectedRoomName, setSelectedRoomName] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getRooms()
            getBlock()
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (addStudent) {
            document.body.classList.add("noScroll")
        } else {
            document.body.classList.remove('noScroll');
        }
    }, [addStudent])

    const getRooms = () => {
        setLoading(true)
        api.get(`/api/get-rooms/${blockId}/`)
            .then(res => {
                setRooms(res.data)
                setLoading(false)
                // alert("workiing")
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
        
    }

    const getBlock = () => {
        api.get(`/api/get-block/${blockId}/`)
            .then(res => {
                setBlock(res.data)

                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        setLoading(false)
    }






    return (
        <DashboardLayout >
            <div className="">
                {addStudent && <AddStudent setIsOpen={setAddStudent} roomId={selectedRoomId} getRooms={getRooms} roomName={selectedRoomName} />}
                <div className="flex flex-col px-20 py-10 gap-5">
                    <div className="flex items-center justify-between  border-b border-zinc-300 pb-5">
                        <div className="flex items-center">
                            <BackBtn />
                            <h2 className="font-quicksand font-600 text-xl ml-5">
                                {block.hostel} - {block.name}
                            </h2>
                        </div>
                        <Link to={`/block-data/${block.id}`} className="flex items-center gap-2 px-4 py-2 border border-primary-700 text-primary-700 hover:bg-primary-100 hover:translate-x-3 transition-all duration-500 rounded-[5px]">
                            <span>View all data</span>
                            <i className="fa-solid fa-table-list"></i>
                        </Link>
                    </div>
                    <div className="flex items-center gap-10 justify-between">
                        <input type="text" name="query" className="input" placeholder="Search Room" />
                        {/* {user.is_superuser &&
                        <button onClick={() => { setAddBlock(true) }} className="flex flex-nowrap text-nowrap items-center gap-2 px-5 py-3 bg-primary-700 hover:bg-primary-600 rounded-md text-[18px] text-white ">
                            <i className="fa-solid fa-plus"></i>
                            <p>Add Room</p>
                        </button>
                    } */}
                    </div>
                    <p className="text-[18px] ">Number of Rooms: {rooms.length}</p>
                    <div>
                        {/* {loading && <Loader />} */}
                        {rooms.map(room => (
                            <div key={room.id} className="hostel flex items-start justify-between gap-5  py-6 px-3 even:bg-zinc-50 border-b border-zinc-300">
                                <p className="text-xl text-zinc-500">{room.name}</p>
                                <div className="flex gap-5 items-center text-[15px]">
                                    <div className="flex text-blue-600 border border-blue-600 rounded-md px-4 py-2 cursor-default text-[15px]">
                                        <p>Students: {room.student_count}</p>
                                    </div>
                                    <div className={`flex border ${room.filled_up ? "text-emerald-500 border-emerald-500" : "text-zinc-400 border-zinc-300"}  rounded-md px-4 py-2 cursor-default`}>
                                        <p>Filled up</p>
                                    </div>
                                    <div onClick={() => {
                                        if (!room.filled_up) { setAddStudent(true) }
                                        else { toast.info("Room is filled up") };
                                        setSelectedRoomId(room.id);
                                        setSelectedRoomName(room.name);
                                    }} className="flex text-pink-500 border border-pink-500 hover:bg-pink-100 transition-all duration-500 rounded-md px-4 py-2 cursor-pointer">
                                        <p>Add Student</p>
                                    </div>
                                    <Link to={`/room/${room.id}`} className="flex items-center gap-2 px-4 py-2 border border-primary-700 text-primary-700 hover:bg-primary-100 hover:translate-x-3 transition-all duration-500 rounded-[5px]">
                                        <span>Go to room</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default BlockDashboard

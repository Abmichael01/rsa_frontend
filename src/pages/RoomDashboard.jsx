import MainLayout from "../layout/MainLayout"
import { useParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import api from "../api"
import useUserData from "../components/useUserData"
import AddBlock from "../components/AddBlock"
import DashboardLayout from "../layout/DashboardLayout"
import BackBtn from "../components/BackBtn"
import AddStudent from "../components/AddStudent"

const RoomDashboard = () => {
    const user = useUserData()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const [room, setRoom] = useState([])
    const [students, setStudents] = useState([])
    const [addStudent, setAddStudent] = useState(false)

    useEffect(() => {
        getRoom()
        getStudents()
    }, [])

    const getRoom = () => {
        api.get(`/api/get-room/${roomId}/`)
            .then(res => {
                setRoom(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getStudents = () => {
        api.get(`/api/get-students/${roomId}/`)
            .then(res => {
                setStudents(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <DashboardLayout >
            <div className="">
                {addStudent && <AddStudent setIsOpen={setAddStudent} roomId={roomId} getStudents={getStudents} roomName={room.name} />}
                <div className="flex flex-col px-20 py-10 gap-5">
                    <div className="flex items-center  border-b border-zinc-300 pb-5">
                        <BackBtn />
                        <h2 className="font-quicksand font-600 text-xl ml-5">
                            {room.hostel} - {room.block} - {room.name}
                        </h2>
                    </div>
                    <div className="flex items-center gap-10 justify-between">
                        {/* <input type="text" name="query" className="input" placeholder="Search Room" /> */}
                        <p className="text-[18px] ">Number of Students: {students.length} / {room.capacity}</p>
                        {user.is_superuser &&
                            <button onClick={() => { setAddStudent(true) }} className="flex flex-nowrap text-nowrap items-center gap-2 px-5 py-2 bg-primary-700 hover:bg-primary-600 rounded-md text-[16px] text-white ">
                                <i className="fa-solid fa-plus"></i>
                                <p>Add Student</p>
                            </button>
                        }
                    </div>
                    
                    <div className=" overflow-x-auto max-w-full">
                        <table className=" table_ w-full">
                            <thead className=" text-left text-[18px] font-quicksand bg-primary-100">
                                <th>Name</th>
                                <th>Matric No</th>
                                <th>College</th>
                                <th>Department</th>
                                <th>Phone Number</th>
                                <th>Parent's Phone Number</th>
                                <th>Resumption Date</th>
                            </thead>

                            <tbody>
                                {students.map(student => (
                                    <tr>
                                        <td>{student.name}</td>
                                        <td>{student.matric_no}</td>
                                        <td>{student.college}</td>
                                        <td>{student.department}</td>
                                        <td>{student.student_no}</td>
                                        <td>{student.parent_no}</td>
                                        <td>{student.resumption_date}</td>
                                    </tr>
                                ))}
                                {room.student_count < room.capacity && (
                                    Array.from({ length: (room.capacity - room.student_count) }).map((_, index) => (
                                        <tr key={index} className="">
                                            <td className="py-5"> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default RoomDashboard

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

const BlockData = () => {
    const { blockId } = useParams()
    const [block, setBlock] = useState([])
    const [rooms, setRooms] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = () => {
        api.get(`/api/get-block-data/${blockId}/`)
            .then(res => {
                setBlock(res.data.block)
                console.log(block)
                setRooms(res.data.rooms)
                setStudents(res.data.students)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="flex flex-col gap-5 px-20 py-10 font-quicksand">
            <div className="flex items-center">
                <BackBtn />
                <h2 className="text-3xl text-primary-700 font-700 ml-5"> {block.hostel} -- {block.name} Room Allocation Data </h2>
            </div>
                <div key={block.id} className="mb-10">
                    {rooms.map(room => (
                        room.block_id === block.id && (
                            <div key={room.id} className="mb-5">
                                <h3 className="text-xl text-zinc-500 font-500 mb-2">{room.name}</h3>

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
                                                student.room_id === room.id && (
                                                    <tr>
                                                        <td>{student.name}</td>
                                                        <td>{student.matric_no}</td>
                                                        <td>{student.college}</td>
                                                        <td>{student.department}</td>
                                                        <td>{student.student_no}</td>
                                                        <td>{student.parent_no}</td>
                                                        <td>{student.resumption_date}</td>
                                                    </tr>
                                                )
                                            ))}
                                            {room.student_count < room.capacity && (
                                                Array.from({ length: (room.capacity  - room.student_count)}).map((_, index) => (
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
                        )
                    ))}
                </div>
            
        </div>
        // <h2>hey</h2>
    )
}

export default BlockData

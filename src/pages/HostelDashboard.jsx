import MainLayout from "../layout/MainLayout"
import { useParams, Link } from "react-router-dom"
import { HOSTEL_SECRET_KEY } from "../constants"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import api from "../api"
import useUserData from "../components/useUserData"
import AddBlock from "../components/AddBlock"
import DashboardLayout from "../layout/DashboardLayout"
import BackBtn from "../components/BackBtn"

const HostelDashboard = () => {
  const { hostelId } = useParams()
  const navigate = useNavigate()
  const [hostel, setHostel] = useState([])
  const [blocks, setBlocks] = useState([])
  const user = useUserData()
  const [addBlock, setAddBlock] = useState(false)
  const [roomsNo, setRoomsNo] = useState(0)

  useEffect(() => {
    getHostel()
    getBlocks()
  }, [])

  const getHostel = () => [
    api.get(`/api/get-hostel/${hostelId}/`)
      .then(res => {
        setHostel(res.data)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  ]

  const getBlocks = () => {
    api.get(`/api/get-blocks/${hostelId}/`)
      .then(res => {
        setBlocks(res.data)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <DashboardLayout>
      {addBlock && <AddBlock hostelId={hostelId} setIsOpen={setAddBlock} setBlocks={setBlocks} />}
      <div className="flex flex-col px-20 py-10 gap-5">
        <div className="flex items-center justify-between  border-b border-zinc-300 pb-5">
          <div className="flex items-center">
            <BackBtn />
            <h2 className="font-quicksand font-600 text-xl ml-5">
              {hostel.name}
            </h2>
          </div>
          <Link to={`/hostel-data/${hostel.id}`} className="flex items-center gap-2 px-4 py-2 border border-primary-700 text-primary-700 hover:bg-primary-100 hover:translate-x-3 transition-all duration-500 rounded-[5px]">
            <span>View all data</span>
            <i className="fa-solid fa-table-list"></i>
          </Link>
        </div>
        <div className="flex items-center gap-10 justify-between">
          <p className="text-[18px] ">Number of Blocks: {blocks.length}</p>
          {/* <input type="text" name="query" className="input" placeholder="Search Hostel" /> */}
          {user.is_superuser &&
            <button onClick={() => { setAddBlock(true) }} className="flex flex-nowrap text-nowrap items-center gap-2 px-5 py-2 bg-primary-700 hover:bg-primary-600 rounded-md text-[16px] text-white ">
              <i className="fa-solid fa-plus"></i>
              <p>Add Block</p>
            </button>
          }
        </div>
        <div>
          {blocks.map(block => (
            <div key={block.id} className="hostel flex items-center justify-between py-6 px-3 even:bg-zinc-50 border-b border-zinc-300">
              <p className="text-xl text-zinc-500">{block.name}</p>
              <div>
                <Link to={`/block/${block.id}`} className="flex items-center text-[15px] gap-2 px-4 py-2 border border-primary-700 text-primary-700 hover:bg-primary-100 hover:translate-x-3 transition-all duration-500 rounded-[5px]">
                  <p>Rooms ({block.room_count})</p>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default HostelDashboard

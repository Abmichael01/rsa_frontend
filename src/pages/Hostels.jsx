import MainLayout from "../layout/MainLayout"
import useUserData from "../components/useUserData"
import { useState } from "react"
import AddHostel from "../components/AddHostel"
import { useEffect } from "react"
import api from "../api"
import GoToDasboard from "../components/GoToDasboard"
import { HOSTEL_SECRET_KEY } from "../constants"

const Hostels = () => {
  const user = useUserData()
  const [addHostel, setAddHostel] = useState(false)
  const [editHostel, setEditHostel] = useState(false)
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(false)
  const [goToDasboard, setGoToDasboard] = useState(null)
  const [selectedHostelId, setSelectedHostelId] = useState("")

  localStorage.removeItem(HOSTEL_SECRET_KEY)

  useEffect(() => {
    api
      .get("/api/get-hostels/")
      .then((res) => {
        setHostels(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  const deleteHostel = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this hostel?")
    if (confirmDelete) {
      api
        .delete(`/api/delete-hostel/${id}/`)
        .then((res) => {
          setLoading(false)
          setHostels(hostels.filter((hostel) => hostel.id !== id))
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
  }


  return (
    <MainLayout>
      {editHostel && <AddHostel setEditHostel={setEditHostel} editHostel={editHostel} hostelId={selectedHostelId} setHostels={setHostels} />}
      {addHostel && <AddHostel setAddHostel={setAddHostel} addHostel={addHostel} setHostels={setHostels} />}
      {goToDasboard && <GoToDasboard goToDasboard={goToDasboard} setGoToDasboard={setGoToDasboard} hostelId={selectedHostelId} />}
      <div className="flex flex-col px-20 py-10 gap-5">
        <h2 className="font-quicksand font-600 text-[23px]">
          Welcome! Select the hostel you supervise to continue
        </h2>
        <div className="flex items-center gap-10 justify-between">
          <input type="text" name="query" className="input" placeholder="Search Hostel" />
          {user.is_superuser &&
            <button onClick={() => { setAddHostel(true) }} className="flex flex-nowrap text-nowrap items-center gap-2 px-5 py-2 bg-primary-700 hover:bg-primary-600 rounded-md text-[15px] text-white ">
              <i className="fa-solid fa-plus"></i>
              <p>Add Hostel</p>
            </button>
          }
        </div>
        <div>
          {loading && <div>Loading...</div>}
          {hostels.map(hostel => (
            <div key={hostel.id} className="hostel flex items-center justify-between py-6 px-3 even:bg-zinc-50 border-b border-zinc-300">
              <p className="text-xl text-zinc-500">{hostel.name}</p>
              <div className="flex gap-3">
                <button onClick={() => { setEditHostel(true); setSelectedHostelId(hostel.id) }} className="flex items-center gap-2 px-4 py-2 border text-[15px] border-primary-700 text-primary-700 hover:bg-primary-100 transition-all duration-500 rounded-[5px]">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => { deleteHostel(hostel.id) }} className="flex items-center gap-2 px-4 py-2 border text-[15px] border-red-500 text-red-500 hover:bg-red-100 transition-all duration-500 rounded-[5px]">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button onClick={() => { setGoToDasboard(true); setSelectedHostelId(hostel.id) }} className="flex items-center gap-2 px-4 py-2 border text-[15px] border-primary-700 text-primary-700 hover:bg-primary-100 hover:translate-x-3 transition-all duration-500 rounded-[5px]">
                  <p>Go to Dashboard</p>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default Hostels
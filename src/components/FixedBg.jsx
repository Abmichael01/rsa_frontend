import bg from "../assets/images/bg.jpg"

const FixedBg = ({}) => {
  return (
    <div>
      <div className='w-screen h-screen fixed top-0 bottom-0 right-0 left-0 z-[-111]'>
        <div className='bg-zinc-700 w-full fixed z-2 h-full opacity-70'>
        </div>
        <img src={bg} alt="" srcset="" className='w-full h-full object-cover object-center' />
      </div>
    </div>
  )
}

export default FixedBg

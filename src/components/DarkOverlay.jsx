import React from 'react'

const DarkOverlay = ({onClick}) => {
  return (
    <div onClick={onClick} className='fixed top-0 bottom-0 right-0 left-0 z-[-1] bg-zinc-800 opacity-60'>
      
    </div>
  )
}

export default DarkOverlay

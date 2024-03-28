import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-xl">&lt;SecureKey/&gt;</div>
      
        <button className='bg-purple-300 my-5 mx-2 rounded-full flex items-center border border-purple-400'>
        <img className='invert w-12 p-1' src="icons/github.png" alt="github" />
        <span className='font-bold px-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
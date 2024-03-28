import React from 'react'

const Footer = () => {
  return (
    <div className="pt-20 md:pt-5">
    <div className='bg-purple-200 flex flex-col justify-center items-center fixed bottom-0 w-full'>
        <div className="logo font-bold text-xl">&lt;SecureKey/&gt;</div>

        <div className='flex justify-center items-center'>Created with  
        <img className='w-5 mx-2' src="icons/heart.png" alt="heart" />by Nipun</div>
    </div>
    </div>
  )
}

export default Footer
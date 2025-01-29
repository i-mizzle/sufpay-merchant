import React from 'react'
import CloseIcon from '../elements/icons/CloseIcon'

const SlideOutModal = ({children, isOpen, closeFunction, title, subTitle}) => {
  return (
      <>
        {isOpen && <div className={`h-screen overflow-y-scroll w-full bg-black bg-opacity-20 fixed left-0 top-0 transform transition-all duration-200 border-black`} style={{zIndex: 995}}>

        </div>}
        <div className={`h-screen overflow-y-scroll w-full md:w-[400px] lg:w-[500px] bg-white fixed right-0 top-0 transform transition-all duration-200 p-4  border-black shadow-lg shadow-black/10 ${ isOpen ? 'translate-x-0' : 'translate-x-full' }`} style={{zIndex: '995'}}>
            <button className='absolute top-3 right-3 text-black p-[px] rounded hover:text-gray-600 transition duration-200' onClick={()=>{closeFunction()}} style={{zIndex: '997'}}>
                <CloseIcon className="w-7 h-7 text-black" />
            </button>

            <div className='p-1 w-full border-b pb-[15px]'>
                <h3 className='text-md font-[500]'>{title}</h3>
                <p className='text-[13px] text-gray-500'>{subTitle}</p>
            </div>
            <div className='w-full'>
              {children}
            </div>
        </div>
      </>
  )
}

export default SlideOutModal
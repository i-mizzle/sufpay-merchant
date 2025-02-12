import React from 'react'
import InlinePreloader from './InlinePreloader'

const Loader = ({preloadingText}) => {
  return (
    <div className='px-44 py-4 flex flex-col items-center justify-center gap-x-5 p-5 w-full text-xs text-center rounded-lg mt-8'>
        <div className="w-6">
            <InlinePreloader />
        </div>
        {preloadingText && preloadingText !== '' && <p className='text-gray-400 mt-[20px] text-xs'>
          {preloadingText}
        </p>}
    </div>
  )
}

export default Loader
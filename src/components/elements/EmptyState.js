import React from 'react'
import EmptyFolder from './icons/EmptyFolder'
// import OpenFolderIcon from './icons/OpenFolderIcon'

const EmptyState = ({emptyStateText}) => {
  return (
    <div className='h-[100px] flex flex-col items-center'>
        <EmptyFolder className={`w-10 h-10 text-gray-400 mb-4`}/>
        <p className='text-[13px] text-gray-500'>{emptyStateText}</p>
    </div>
  )
}

export default EmptyState
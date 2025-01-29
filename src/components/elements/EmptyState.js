import React from 'react'
import OpenFolderIcon from './icons/OpenFolderIcon'

const EmptyState = ({emptyStateText}) => {
  return (
    <div className='h-[100px] flex flex-col items-center'>
        <OpenFolderIcon className={`w-8 h-8 text-gray-400 mb-4`}/>
        <p className='text-sm text-gray-500'>{emptyStateText}</p>
    </div>
  )
}

export default EmptyState
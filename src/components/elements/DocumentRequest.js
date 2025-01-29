import React from 'react'
import DocumentIcon from './icons/DocumentIcon'
import ChevronIcon from './icons/ChevronIcon'
import ApplicationStatus from './ApplicationStatus'
import { Link } from 'react-router-dom'

const DocumentRequest = ({document}) => {

    return (
        <div className='w-full border border-dashed border-gray-300 rounded-[8px] p-3 flex items-center gap-x-2 transition duration-300 hover:shadow-lg'>
            <div className=' relative'>
                <DocumentIcon className={`w-12 h-12 text-gray-500`} />
            </div>
            <div className='w-full'>
                <p className='text-sm mb-1'>{document.name}</p>
                <p className='text-xs mb-1 text-gray-500'>Requested by: {document.requestedBy.name}</p>
                
                <div className='flex items-center justify-between'>
                    <ApplicationStatus status={document.status} />
                    {document.sampleDocumentUrl && <Link to={document.sampleDocumentUrl} target='_blank' className='text-gray-400 hover:text-vcm-purple transition duration-200 text-xs flex items-center gap-x-2'>Sample <ChevronIcon className={`w-4 h-4 rotate-180`} /></Link>}
                </div>
            </div>
        </div>
    )
}

export default DocumentRequest
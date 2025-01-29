import React from 'react'
import { unSlugify } from '../../utils'

const ApplicationStatus = ({status}) => {
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded 
    ${status === 'SCHEDULED_FOR_EXAM' && 'bg-blue-600 text-blue-500 bg-opacity-10 font-outfit capitalize'}
    ${status === 'PENDING' && 'bg-gray-600 text-gray-500 bg-opacity-10 font-outfit capitalize'}
    ${status === 'IN_REVIEW' && 'bg-amber-600 text-amber-800 bg-opacity-10 font-outfit capitalize'}
    ${status === 'ADMITTED' && 'bg-green-600 text-green-800 bg-opacity-10 font-outfit capitalize'}
    ${status === 'UPLOADED' && 'bg-green-600 text-green-800 bg-opacity-10 font-outfit capitalize'}
    ${status === 'PROVISIONAL_OFFER' && 'bg-vcm-light-purple text-vcm-purple bg-opacity-30 font-outfit capitalize'}
    ${status === 'CANCELLED' && 'bg-red-600 text-red-800 bg-opacity-10 font-outfit capitalize'}
    `}>{unSlugify(status.toLowerCase())}</span>
  )
}

export default ApplicationStatus
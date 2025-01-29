import React from 'react'
import { unSlugify } from '../../utils'

const StudentStatus = ({status}) => {
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded 
    ${status === 'EXPELLED' && 'bg-gray-600 text-gray-500 bg-opacity-10 font-outfit capitalize'}
    ${status === 'PROBATION' && 'bg-amber-600 text-amber-800 bg-opacity-10 font-outfit capitalize'}
    ${status === 'ACTIVE' && 'bg-green-600 text-green-800 bg-opacity-10 font-outfit capitalize'}
    ${status === 'SUSPENDED' && 'bg-red-600 text-red-800 bg-opacity-10 font-outfit capitalize'}
    `}>{unSlugify(status?.toLowerCase())}</span>
  )
}

export default StudentStatus
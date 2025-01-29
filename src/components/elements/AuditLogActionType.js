import React from 'react'
import { unSlugify } from '../../utils'

const AuditLogActionType = ({type}) => {
  return (
    <p className={`uppercase inline-block py-1 px-2 font-medium tracking-[0.1em] text-[12px] rounded 
    ${type === 'create' && 'bg-green-500 bg-opacity-10 text-green-800'} 
    ${type === 'approve' && 'bg-purple-500 bg-opacity-10 text-purple-800'} 
    ${type === 'update' && 'bg-blue-500 bg-opacity-10 text-blue-800' } 
    ${type === 'delete' && 'bg-red-500 bg-opacity-10 text-red-800' } 
    ${(type === 'cancel' || type === 'reject') && 'bg-gray-500 bg-opacity-10 text-gray-800' } 
    }`}>{unSlugify(type)}</p>
  )
}

export default AuditLogActionType
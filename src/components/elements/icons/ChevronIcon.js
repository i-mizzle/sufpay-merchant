import React from 'react'

const ChevronIcon = ({className, thickness=1.5}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={thickness} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>

  )
}

export default ChevronIcon
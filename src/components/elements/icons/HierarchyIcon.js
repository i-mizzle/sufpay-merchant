import React from 'react'

const HierarchyIcon = ({className, stroke="1.5"}) => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={stroke}
            d="M5 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M5 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
        ></path>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={stroke}
            d="M16 12H9c-2.2 0-4-1-4-4v8"
        ></path>
    </svg>
  )
}

export default HierarchyIcon
import React from 'react'
import HomeIcon from './icons/HomeIcon'
import ChevronIcon from './icons/ChevronIcon'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({breadcrumbsData}) => {
  return (
    <div>
        <div className="w-full flex items-center gap-x-3 mb-8">
            <Link to="/admin/dashboard">
                <HomeIcon className={'w-4 h-4 text-gray-400'} />
            </Link>
            <ChevronIcon className="w-4 h-4 text-gray-400 rotate-[180deg]" />
            {breadcrumbsData.map((item, i) => (
                <div key={i} className="flex items-center gap-x-3">
                    <Link to={item.path} className={`text-sm ${item.current ? 'font-medium' : ''}`}>{item.label}</Link>
                    {i < breadcrumbsData.length - 1 && (
                        <ChevronIcon className="w-4 h-4 text-gray-400 rotate-[180deg]" />
                    )}
                </div>
            ))}
        </div>

    </div>
  )
}

export default Breadcrumbs
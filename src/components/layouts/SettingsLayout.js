import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const SettingsLayout = ({children, pageTitle}) => {
    const location = useLocation();
    const currentRoute = location.pathname;
    return (
        <div>
            <div className='h-[50px] w-full flex items-center'>
                <NavLink to="/merchant/settings/user-profile"  className={`font-medium text-[13px] font-poppins px-3 py-3 ${currentRoute.includes('merchant/settings/user-profile') ? 'border-b-2 border-sufpay-black text-sufpay-black' : 'border-b border-gray-300 text-gray-500'}`}>User Profile</NavLink>

                <NavLink to="/merchant/settings/business-profile"  className={`font-medium text-[13px] font-poppins px-3 py-3 ${currentRoute.includes('merchant/settings/business-profile') ? 'border-b-2 border-sufpay-black text-sufpay-black' : 'border-b border-gray-300 text-gray-500'}`}>Business Profile</NavLink>
                
                <NavLink to="/merchant/settings/merchant-keys"  className={`font-medium text-[13px] font-poppins px-3 py-3 ${currentRoute.includes('merchant/settings/merchant-keys') ? 'border-b-2 border-sufpay-black text-sufpay-black' : 'border-b border-gray-300 text-gray-500'}`}>API Keys</NavLink>
                
                <NavLink to="/merchant/settings/team"  className={`font-medium text-[13px] font-poppins px-3 py-3 ${currentRoute.includes('merchant/settings/team') ? 'border-b-2 border-sufpay-black text-sufpay-black' : 'border-b border-gray-300 text-gray-500'}`}>Team</NavLink>
                
            </div>
            <div className={`mt-4 min-h-screen`}>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default SettingsLayout

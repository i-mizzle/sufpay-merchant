import React from 'react'
import CloseIcon from '../elements/icons/CloseIcon'
import LogoutIcon from '../elements/icons/LogoutIcon'
import UserIcon from '../elements/icons/UserIcon'
import { defaultSidebarState } from '../../utils'
import BarsIcon from '../elements/icons/BarsIcon'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import axios from 'axios'
import { ERROR } from '../../store/types'
import CogIcon from '../elements/icons/CogIcon'

const StaticSidebar = ({toggleSidebarState}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const currentRoute = location.pathname;
    const signOut = async (token) => {    
        try{
        // const headers = authHeader()
        // let requestUrl = `auth/sessions`

        // await axios.delete(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
        localStorage.removeItem("userDetails");
        localStorage.removeItem("authToken");
        localStorage.removeItem("activeBusiness");
        navigate('/')
        }
        catch(error){
        dispatch( {
            type: ERROR,
            error
        })
        }
    }


    return (
        <div className='w-[60px] h-screen fixed left-0 top-0 bg-sufpay-gray flex flex-col justify-between items-center py-[20px]'>
            <button onClick={()=>{toggleSidebarState()}} className='transition duration-200 hover:text-gray-100 text-white'>
                {defaultSidebarState() === 'open' ? 
                    <CloseIcon className={`w-7 h-7`} />
                    : 
                    <BarsIcon className={`w-7 h-7`} />
                }
            </button>

            <div className='flex flex-col items-center gap-y-[30px]'>
                {/* <button className='transition duration-200 hover:text-gray-100 text-white'>
                    <UserIcon className={`w-7 h-7`} />
                </button> */}

                <NavLink 
                    to={`/merchant/settings`} 
                    className={`${currentRoute.includes('merchant/settings') ? 'text-accent' : 'text-white' } transition duration-200 hover:text-gray-100 `}>
                    <CogIcon className={`w-7 h-7`} />
                </NavLink>

                <button onClick={()=>{signOut()}} className='transition duration-200 hover:text-gray-100 text-white -ml-[5px]'>
                    <LogoutIcon className={`w-7 h-7 rotate-180`} />
                </button>
            </div>
        </div>
    )
}

export default StaticSidebar
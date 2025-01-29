import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = ({links}) => {
    const location = useLocation();
    const currentRoute = location.pathname;
    return (
        <div className='w-[300px] bg-gray-100 h-screen fixed left-[60px] top-0'>
            <div className='mt-[100px]'>      
                {links.map((section, sectionIndex) => (
                    <div key={sectionIndex} className='mb-[8px] mt-[20px] ml-[20px]'>
                        {section.title && section.title !== '' && <h4 className='text-sufpay-gray  font-host-grotesk ml-[15px] mb-[10px] uppercase font-[400] tracking-[0.1em] text-xs'>{section.title}</h4>}
                        
                        {section.links.map((link, linkIndex)=>(
                            link.action ? 
                                <button 
                                    key={linkIndex} 
                                    onClick={()=>{link.action()}} 
                                    className={`${currentRoute.includes(link.activeCheck) ? 'text-secondary ' : 'text-sufpay-black'} flex px-[16px] py-[10px] rounded-[8px] text-[13px] font-[500] w-[90%] flex-row gap-x-[15px] items-center font-poppins`}
                                >
                                    <div className="w-[20px] flex items-center justify-center">
                                        {/* <img src={currentRoute.includes(link.activeCheck) ? link.activeIcon : link.icon} alt='' /> */}
                                        <link.Icon className={`w-5 h-5`} />
                                    </div>
                                    {link.title}
                                </button>
                            :
                            
                            <NavLink 
                                key={linkIndex} 
                                to={link.route} 
                                className={`${currentRoute.includes(link.activeCheck) ? 'text-secondary ' : 'text-sufpay-black'} flex px-[16px] py-[10px] rounded-[8px] text-[13px] font-[500] w-[90%] flex-row gap-x-[15px] items-center font-poppins`}
                            >
                                <div className="w-[20px] flex items-center justify-center">
                                    {/* <img src={currentRoute.includes(link.activeCheck) ? link.activeIcon : link.icon} alt='' /> */}
                                    <link.Icon className={`w-5 h-5`} />
                                </div>
                                {link.title}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
import React, { useEffect, useState } from 'react'
import Logo from '../elements/Logo'
import DropdownMenu from '../elements/DropdownMenu'
import PlusIcon from '../elements/icons/PlusIcon'
import RocketIcon from '../elements/icons/RocketIcon'
import { activeBusiness, userDetails } from '../../utils'
import CloseIcon from '../elements/icons/CloseIcon'
import BarsIcon from '../elements/icons/BarsIcon'
import { NavLink, useLocation } from 'react-router-dom'

const MerchantHeader = ({createBiller, links}) => {
    const location = useLocation();
    const currentRoute = location.pathname;
    const [dropDownOptions, setDropDownOptions] = useState([
        {
            icon: PlusIcon,
            label: "Create new business",
            action: ()=>{createBiller()}
        }
    ]);

    useEffect(() => {
        const parseDropdownOptions = () => {
            let temp =[...dropDownOptions]
            if(userDetails().merchantRoles.length > 1) {
                const merchants = userDetails().merchantRoles.filter(merchant => {
                    return merchant.id !== activeBusiness().id
                })
                setDropDownOptions([...merchants, ...temp])
            } else {
                temp.unshift({
                    icon: '',
                    label: "You do not have any other businesses on this platform right now. Click 'Create new business' below to add another business.",
                    action: ()=>{}
                })
                setDropDownOptions(temp)
            }
        }
        parseDropdownOptions()
        return () => {
            
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const [mobileSidebarActive, setMobileSidebarActive] = useState(false);
    const toggleMobileSidebar = () => {
        setMobileSidebarActive(!mobileSidebarActive)
    }

    return (
        <>
            <div className='w-full fixed xl:relative px-[20px] flex items-center justify-between z-50 bg-white pb-[15px] pt-[15px] -mt-[15px] xl:mt-0'>
                <div className='w-full flex items-center gap-x-[10px]'>
                    <button onClick={()=>{toggleMobileSidebar()}} className='xl:hidden transition duration-200 hover:text-gray-500 text-secondary'>
                        {mobileSidebarActive ? 
                            <CloseIcon className={`w-7 h-7`} />
                            : 
                            <BarsIcon className={`w-7 h-7`} />
                        }
                    </button>
                    <Logo color={`#1D7874`} size={`150px`}/>
                </div>

                <div className='flex flex-row-reverse items-center gap-x-[10px]'>
                    <div className='w-max xl:min-w-[200px] w-inherit'>
                        <DropdownMenu 
                            buttonType="text"
                            buttonText={activeBusiness().name}
                            menuItems={dropDownOptions}
                            buttonClasses="flex items-center gap-x-[8px]"
                            iconClasses="rounded-full w-[32px] h-[32px]"
                        />
                    </div>
                    <button className='bg-success text-white p-[10px] text-sm font-[500] hover:bg-green-700 flex items-center xl:min-w-[175px] justify-center gap-x-[3px] transition duration-200 rounded-[8px] w-min'>
                        <span className='hidden xl:inline-block text-white text-sm'>Request Go-live</span>
                        <RocketIcon className={`w-5 h-5`} />
                    </button>

                </div>
            </div>

            {mobileSidebarActive && <div className={`w-full duration-200 bg-gray-100 h-screen fixed left-0 top-0 z-40`}>
                <div className='mt-[120px]'>      
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
            </div>}
        </>
    )
}

export default MerchantHeader
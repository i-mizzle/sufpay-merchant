import React, { useEffect, useState } from 'react'
import Logo from '../elements/Logo'
import DropdownMenu from '../elements/DropdownMenu'
import PlusIcon from '../elements/icons/PlusIcon'
import RocketIcon from '../elements/icons/RocketIcon'
import { activeBusiness, userDetails } from '../../utils'

const MerchantHeader = ({createBiller}) => {
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

    return (
        <div className='w-full px-[20px] flex items-center justify-between'>
            <div className='w-full'>
                <Logo color={`#1D7874`} size={`150px`}/>
            </div>

            <div className='flex flex-row-reverse items-center gap-x-[10px]'>
                <div className='min-w-[200px] w-inherit'>
                    <DropdownMenu 
                        buttonType="text"
                        buttonText={activeBusiness().name}
                        menuItems={dropDownOptions}
                        buttonClasses="flex items-center gap-x-[8px]"
                        iconClasses="rounded-full w-[32px] h-[32px]"
                    />
                </div>
                <button className='bg-success text-white p-[10px] text-sm font-[500] hover:bg-green-700 flex items-center min-w-[175px] justify-center gap-x-[3px] transition duration-200 rounded-[8px] w-min'>
                    Request Go-live
                    <RocketIcon className={`w-5 h-5`} />
                </button>

            </div>
        </div>
    )
}

export default MerchantHeader
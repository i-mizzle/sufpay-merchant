import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'


const DropdownMenu = ({buttonType, buttonText, buttonIcon, menuItems, buttonClasses, iconClasses}) => {
  return (
    <div className="text-right relative">
      <Menu as="div" className="relative block text-right">
        <div className="flex flex-row items-center justify-center text-sm bg-gray-100 rounded-[8px] p-[10px] transition duration-200 hover:bg-gray-200 font-[500]">
          <MenuButton className={buttonClasses}>
            {/* Options */}
            { (buttonType === 'icon' || buttonType === 'combo') && 
              <img src={buttonIcon} alt="dropdown" className={iconClasses} />
            }

            {buttonType !== "icon" &&
              buttonText
            }

            {buttonType !== "icon" &&
              <ChevronDownIcon
                className="w-4 h-4 inline ml-2 -mr-1 text-sufpay-black hover:text-gray-500"
                aria-hidden="true"
              />
            }
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 min-w-56 w-inherit mt-2 z-20 origin-top-right bg-white border border-secondary border-opacity-20 divide-y divide-gray-100 rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
            {menuItems.map((item, itemIndex) => (<MenuItem key={itemIndex}>

                  <button
                    onClick={()=>{item.action()}}
                    className={`text-xs hover:bg-gray-100 hover:text-opacity-80 group flex rounded-md items-center text-left w-full px-2 py-2`}
                  >
                    {item.icon &&
                        <span className="mr-3">
                            <item.icon className={`w-4 h-4`}/> 
                        </span>
                    }
                    {item.label}
                  </button>

              </MenuItem>))}
            </div> 
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}


export default DropdownMenu


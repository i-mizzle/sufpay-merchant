import React, { useState } from 'react'

const RadioGroup = ({items, returnSelected, hasError, inputLabel, requiredField, inline, preSelectedIndex}) => {

    const [selectedOption, setSelectedOption] = useState(preSelectedIndex)

    const selectOption = (index, item) => {
        setSelectedOption(index)
        returnSelected(item)
    }

    return (
        <>
            <label 
                className={`text-sm lg:text-md cursor-text z-10 relative py-1 transition duration-200  
                ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            >
             {requiredField && requiredField === true && <span className='text-red-600'>*</span>}   {inputLabel}
            </label>
            <div className={`w-full ${inline && 'flex flex-wrap gap-x-8 gap-y-4 items-center'}`}>
                {items.map((item, itemIndex)=>(
                <div onClick={()=>{selectOption(itemIndex, item)}} key={itemIndex} className='w-max flex items-center gap-x-2 my-3 py-1 cursor-pointer'>
                    <button 
                            className={`flex items-center justify-center rounded-full w-5 h-5 border-2 transition duration-200 text-white bg-white 
                            ${hasError ? 'border-red-600' : 'border-vcm-purple'}`
                        } 
                        onClick={()=>{selectOption(itemIndex, item)}}
                    >
                        {selectedOption === itemIndex && <div className='w-2 h-2 transition duration-200 rounded-full bg-vcm-purple'></div>}
                    </button>
                    
                    <label className={`text-sm cursor-pointer ${hasError ? 'text-red-600' : 'text-black'}`}>
                        {item.label}
                    </label>
                </div>
                ))
                }
            </div>
        </>
    )
}

export default RadioGroup
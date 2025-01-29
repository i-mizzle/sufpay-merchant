import React, { useState } from 'react'

const TextField = ({
    requiredField,
    inputLabel, 
    inputPlaceholder,
    fieldId, 
    inputType, 
    hasError, 
    returnFieldValue, 
    preloadValue, 
    disabled, 
    includeButton, 
    buttonLabel, 
    buttonAction,
    bgClass,
    autoFocus,
    maxLength,
    hidePasswordToggler
}) => {
    const [ fieldValue, setFieldValue ] = useState(preloadValue)

    const setValue = (value) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    return (
        <div>
            <label 
                className={`text-xs lg:text-md cursor-text z-10 relative py-1 transition mb-1 block duration-200  
                ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            >
             {requiredField && requiredField === true && <span className='text-red-600'>*</span>}   {inputLabel}
            </label>

            <input 
                id={fieldId} 
                type="text"
                maxLength={maxLength}
                className={`placeholder:text-xs rounded py-3 px-3 text-sm block w-full focus:border-gray-800 focus:outline-none hover:border-gray-200 hover:bg-gray-50 border bg-white  transition duration-200 border-gray-500 focus:bg-white font-outfit placeholder:font-outfit  ${hasError ? 'border-red-600' : 'border-gray-500'}`} 
                onChange={(e)=>{setValue(e.target.value)}}
                value={fieldValue}
                disabled={disabled}
                placeholder={inputPlaceholder}
            />

        </div>
    )
}

export default TextField
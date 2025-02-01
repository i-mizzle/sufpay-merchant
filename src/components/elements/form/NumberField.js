import React, { useState } from 'react'
import {NumericFormat} from 'react-number-format';

const NumberField = ({
    inputLabel, 
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
    showPasswordMeter,
    autoFocus,
    maxLength,
    requiredField
}) => {

    const [ fieldValue, setFieldValue ] = useState(preloadValue)

    const setValue = (value) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    return (
        <div>
            {inputLabel && inputLabel !== '' && <label 
                className={`text-xs lg:text-md cursor-text z-10 relative py-1 transition mb-1 block duration-200  
                ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            >
             {requiredField && requiredField === true && <span className='text-red-600'>*</span>}   {inputLabel}
            </label>}

            <NumericFormat
                id={fieldId}
                thousandsGroupStyle="thousand"
                value={fieldValue}
                prefix=""
                decimalSeparator="."
                displayType="input"
                type="text"
                maxLength={maxLength}
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale={false}
                disabled={disabled}
                className={`placeholder:text-xs rounded py-3 px-3 text-sm block w-full focus:border-gray-800 focus:outline-none hover:border-gray-200 hover:bg-gray-50 border bg-white  transition duration-200 border-gray-500 focus:bg-white font-outfit placeholder:font-outfit  ${hasError ? 'border-red-600' : 'border-gray-500'}`} 
                onValueChange={(values, sourceInfo)=>{setValue(values.floatValue)}}
            />
        </div>
    )

}

export default NumberField
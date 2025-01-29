import React, { useState } from 'react'

const CheckboxGroup = ({options, returnSelections}) => {
    const [selections, setSelections] = useState([]);

    const inSelection = (optionValue) => {
        const exists = selections.includes(optionValue)
        return exists
    }

    const toggleSelection = (optionValue) => {
        let tempSelected = [...selections]
        
        if(inSelection(optionValue)) {
            // tempSelected.splice(tempSelected.indexOf(optionValue), 1)
            tempSelected = tempSelected.filter((item)=>{return item !== optionValue})
            returnSelections(tempSelected)
            setSelections(tempSelected)
            return
        }

        tempSelected.push(optionValue)
        returnSelections(tempSelected)
        setSelections(tempSelected)
    }

    return (
        <div className='w-full'>
            {options.map((option, optionIndex) => (
                <div className="mt-1" key={optionIndex}>
                    <input type="checkbox" onChange={()=>toggleSelection(option.value)} checked={inSelection(option.value)} className="mr-2 mt-3" />
                    <p className="text-xs inline-block mt-3">{option.name}</p>
                </div>
            ))}
        </div>
    )
}

export default CheckboxGroup
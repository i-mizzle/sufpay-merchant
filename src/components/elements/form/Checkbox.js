import React from 'react'
import CheckIcon from '../icons/CheckIcon'
import PropTypes from 'prop-types';

const Checkbox = ({CheckboxLabel, checkboxToggleFunction, isChecked, hasError}) => {
  return (
    <div className='w-full flex items-start gap-x-2'>
      <div className='w-[25px]'>

        <button 
            className={`flex items-center justify-center w-[20px] h-[20px] border rounded transition duration-200 text-white 
            ${isChecked ? 'bg-primary border-primary' : 'bg-transparent border-black'}
            ${hasError ? 'border-red-600' : 'border-black'}`
          } 
          onClick={checkboxToggleFunction}
        >
            {isChecked && <CheckIcon className="w-5 h-5 text-accent" />}
        </button>
      </div>
      <label className={`text-[13px] ${hasError ? 'text-red-600' : 'text-black'}`}>
        {CheckboxLabel}
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  CheckboxLabel: PropTypes.any.isRequired,
  hasError: PropTypes.bool,
  isChecked: PropTypes.bool,
  checkboxToggleFunction: PropTypes.func.isRequired
};

export default Checkbox
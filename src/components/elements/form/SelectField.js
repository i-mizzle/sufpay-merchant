import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TwoWayChevronIcon from '../icons/TwoWayChevronIcon';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref, closeFunction) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeFunction();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFunction, ref]);
}

const SelectField = ({
  disabled,
  placeholderText,
  selectOptions,
  inputLabel,
  displayImage,
  imageField,
  titleField,
  hasError,
  returnFieldValue,
  preSelectedIndex,
  preSelected,
  preSelectedLabel,
  requiredField
}) => {
  const [activeValue, setActiveValue] = useState('');
  const [visibleOptions] = useState(selectOptions);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false)

  useEffect(() => {
    const preSelect = () => {
      if (preSelected !== undefined) {
        const selectedOption = selectOptions.find(
          (option) => option[preSelectedLabel] === preSelected
        );
        if (selectedOption) {
          setActiveValue(selectedOption[titleField]);
        }
      } else if (preSelectedIndex !== undefined && selectOptions[preSelectedIndex]) {
        setActiveValue(selectOptions[preSelectedIndex][titleField]);
      }
    };
    preSelect();
  }, [preSelected, preSelectedLabel, selectOptions, titleField, preSelectedIndex]);

  const closeOptions = () => {
    setOptionsOpen(false);
  };

  const changeActiveValue = (valueIndex) => {
    if (valueIndex !== '') {
      setActiveValue(selectOptions[valueIndex][titleField] || selectOptions[valueIndex]);
      returnFieldValue(selectOptions[valueIndex]);
    }
    closeOptions();
  };

  const focusField = () => {
    setIsFocused(true)
    setOptionsOpen(true)
    // document.getElementById(fieldId).focus()
  }

  const unfocusField = () => {
    setIsFocused(false)
    closeOptions()
    // document.getElementById(fieldId).focus()
  }

  const openOptions = () => {
    setOptionsOpen(true)
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeOptions);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div>
        <label 
          className={`text-xs lg:text-md cursor-text z-10 relative py-1 transition mb-1 block duration-200  
          ${hasError ? 'text-red-600' : 'text-gray-500'}`}
        >
          {requiredField && requiredField === true && <span className='text-red-600'>*</span>}{inputLabel}
        </label>

          <div 
            className={`rounded py-3 px-3 text-sm block w-full focus:border-gray-800 focus:outline-none hover:border-gray-200 hover:bg-gray-50 border bg-white transition duration-200 border-gray-500 focus:bg-white font-poppins placeholder:font-outfit  ${hasError ? 'border-red-600' : 'border-gray-500'} relative flex items-center justify-between`}  
            onClick={()=>{focusField()}} 
            onBlur={()=>{unfocusField()}}
          > 
            {/* Text input */}
            <p className='w-full' onClick={()=>{openOptions()}}> 
              {activeValue || <span className='text-gray-400 text-xs'>{placeholderText}</span>} 
            </p>
            {/* <img alt="" src={ChevronDown} className='absolute w-5 top-3 right-3' /> */}
            <button disabled className='z-10 py-1'>
              <TwoWayChevronIcon className="w-4 h-4 text-black" />
            </button>
        </div>

        {optionsOpen &&
          <div className='shadow-lg absolute top-16 border rounded-[8px] min-w-[200px] w-full left-0 p-3 bg-white overflow-y-scroll h-inherit pt-2 z-50' style={{maxHeight: '300px'}}>
            {visibleOptions.map((option, optionIndex) => (
              <button key={optionIndex} className='w-full font-poppins font-[400] px-2 py-3 flex flex-row gap-x-3 text-[13px] text-gray-500 transition duration-200 hover:bg-gray-100' onClick={()=>{changeActiveValue(optionIndex)}}>
                {displayImage && 
                    <img alt="" src={option[imageField]} className='w-12' />
                }
                {option[titleField]}
              </button>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

SelectField.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  inputLabel: PropTypes.string.isRequired,
  titleField: PropTypes.string.isRequired,
  displayImage: PropTypes.bool.isRequired,
  imageField: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  returnFieldValue: PropTypes.func.isRequired,
  preSelectedIndex: PropTypes.any,
  preSelected: PropTypes.any,
  preSelectedLabel: PropTypes.string,
  requiredField: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SelectField;

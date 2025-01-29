import React, { useRef, useState } from 'react'
import PlusIcon from './icons/PlusIcon'
import ChevronIcon from './icons/ChevronIcon';
import { useOutsideAlerter } from './form/SelectField';
import CloseIcon from './icons/CloseIcon';
import CheckboxGroup from './CheckboxGroup';
import axios from 'axios';
import { debounce } from '../../utils';
import FilterSearchBox from './FilterSearchBox';
import FunnelIcon from './icons/FunnelIcon';

const FiltersV3 = ({filterOptions, returnSelected, resetFilters, checkConditions}) => {

  const [filters, setFilters] = useState(filterOptions);
  const [filterOptionsActive, setFilterOptionsActive] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilterOptions = () => {
    if(filterOptionsActive === true) {
      closeAll()
    }
    setFilterOptionsActive(!filterOptionsActive)
  }

  const toggleActiveFilter = (index) => {
    if(activeFilter === index) {
      setActiveFilter(null)
      setFiltersActive(false)
      return
    }
    setActiveFilter(index)
    setTimeout(() => {
      setFiltersActive(true)
    }, 50);
  }

  const closeAll = () => {
    setFiltersActive(false)
    setFilterOptionsActive(null)
  }

  const [activeFilters, setActiveFilters] = useState([])
  // const [selectedTerm, setSelectedTerm] = useState([]);

  const selectOperator = (filterIndex, operatorIndex) => {
    const tempFilters = [...filters]
    tempFilters[filterIndex].operators.forEach((operator)=>{
      operator.selected = false
    })
    tempFilters[filterIndex].operators[operatorIndex].selected = !tempFilters[filterIndex].operators[operatorIndex].selected 
    setFilters(tempFilters)
  }

  const addTerm = (value, display ) => {
    console.log('value -> ', value)
    console.log('display -> ', display)
    if(Array.isArray(value)){
      setFilterTerm({termDisplay: display || null, value: value})
    } else {
      setFilterTerm({termDisplay: display || null, value: [value.toString()]})
      // setFilterTerm([value.toString()])
    }
  }

  const addToActiveFilters = (filter) => {
    const tempActiveFilters = [...activeFilters]
    tempActiveFilters.push(filter)
    setActiveFilters(tempActiveFilters)

    let filterString = ''

    console.log('active filters => => ', filterString)
    tempActiveFilters.forEach((filter, filterIndex) => {
      console.log('filter => => ', filterString)
      filterString += `filter[${filter.field}]=${filter.term.join(',')}`
      if(filterIndex < tempActiveFilters.length - 1) {
        filterString += '&'
      }
    })

    return {filters: tempActiveFilters, filterString}

  }  

  const [filterTerm, setFilterTerm] = useState(null)

  const selectedOperator = (filter) => {
    const selected = filter.operators.find((operator) => {
      return operator.selected === true
    })
    return selected
  }

  const addFilter = (activeFilter) => {
    console.log('...,,, ', activeFilter)
    const selectedOp = selectedOperator(activeFilter)

    let filter = {
      field: activeFilter.value,
      operator: selectedOp.value,
      termDisplay: filterTerm.termDisplay,
      term: filterTerm.value
    }

    const resolvedFilters = addToActiveFilters({...filter, 
        ...{ operatorLabel: selectedOp.name}, 
        ...{ fieldLabel: activeFilter.field}
    })

    console.log('resolved filters -> ', resolvedFilters)

    setTimeout(() => {
        returnSelected(resolvedFilters)
    }, 100);

    closeAll()
  }

  const removeFilter = (index) => {
    const removed = activeFilters.filter((filter, filterIndex) => {
      return index !== filterIndex
    })

    console.log('after removed -> ', removed)

    setTimeout(() => {
      returnSelected(removed)
      }, 100);
    setActiveFilters(removed)
  }

  const [processingIndex, setProcessingIndex] = useState('');
  const [customers, setCustomers] = useState(null);

  const performSearch = debounce((term, optionIndex, option) => {
      console.log(option)
      if(option?.searchConfig?.searchReference === 'customers'){
          findCustomer(term, optionIndex)
      }
      if(option?.searchConfig?.searchReference === 'brands'){
          findBrand(term, optionIndex)
      }
      if(option?.searchConfig?.searchReference === 'categories'){
          findCategory(term, optionIndex)
      }
  })

  // updateFilter(filter)

  const findCustomer = async (term, index) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    try { 
        let response = null 
        setProcessingIndex(index)
        response = await axios.get(`/api/v1/admin/customers/?filter[%first_name%]=${term}`, { headers })            
        setCustomers(response.data.data)
        setProcessingIndex('')
    } catch (error) {
        setProcessingIndex('')
        console.error(error.response.data)
        // setError(error.response.data.msg)
        // setProcessing(false)
    }
}

const [brands, setBrands] = useState([]);

const findBrand = async (term, index) => {
    const headers = {
      'Content-Type': 'application/json',
    }

    try { 
        let response = null 
        setProcessingIndex(index)
        response = await axios.get(`/api/v1/admin/brands/?filter[%name%]=${term}`, { headers })            
        setBrands(response.data.data)
        setProcessingIndex('')
    } catch (error) {
        setProcessingIndex('')
        console.error(error.response.data)
        // setError(error.response.data.msg)
        // setProcessing(false)
    }
}

const [categories, setCategories] = useState([]);

const findCategory = async (term, index) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    try { 
        let response = null 
        setProcessingIndex(index)
        response = await axios.get(`/api/v1/categories/?filter[%slug%]=${term}`, { headers })            
        setCategories(response.data.data)
        setProcessingIndex('')
    } catch (error) {
        setProcessingIndex('')
        console.error(error.response.data)
        // setError(error.response.data.msg)
        // setProcessing(false)
    }
}

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeAll);

  return (
    <div ref={wrapperRef} className='relative z-50 flex items-center flex-wrap'>
      {activeFilters.map((filter, filterIndex)=>(
        <span key={filterIndex} className='mr-3 inline-block my-3'>
          <button onClick={()=>{removeFilter(filterIndex)}} className={`bg-gray-100 bg-opacity-50 rounded-md px-3 py-2 border border-transparent flex items-center gap-x-1 text-sm hover:bg-opacity-50 transition duration-200`}>
            <span className='font-medium text-black'>{filter.fieldLabel}</span> <span className='text-gray-500'>{filter.operatorLabel} {filter?.termDisplay ? filter.termDisplay : filter.term.join(", ")}</span>
            <CloseIcon classes={`w-4 h-4 mr-2 -mt-1`} />
          </button>
        </span>
      ))}
      <div className='relative'>
        <button onClick={()=>{toggleFilterOptions()}} className={`${filterOptionsActive ? 'bg-gray-200' : 'bg-gray-100'} rounded-md px-3 py-2 border border-transparent flex items-center gap-x-1 text-gray-600 text-sm hover:bg-opacity-50 transition duration-200 `}>
          <FunnelIcon className="w-5 h-5" /> Add Filter
        </button>

        {filterOptionsActive && <div className='absolute mt-3 top-[50px] left-0 shadow-xl bg-white border-gray-200 rounded-md'>
          {filters?.map((filterOption, optionIndex) => (
            <div key={optionIndex} className='relative'>
              <button onClick={()=>{toggleActiveFilter(optionIndex)}} className={`p-3 bg-transparent text-sm hover:bg-gray-100 text-gray-600 transition duration-200 flex justify-between items-center w-44 ${filtersActive && activeFilter === optionIndex && 'bg-gray-100'}`}>
                {filterOption.field}
                <ChevronIcon className={`w-3 h-3 transform -rotate-90`} />
              </button>

              {/* <div className='absolute shadow-lg bg-white border-gray-200 overflow-hidden rounded-md p-5'> */}
              {/* <div className='' style={{zIndex: 999}}> */}
              {filtersActive && activeFilter === optionIndex && 
                  <div className="bg-white shadow-lg rounded border-gray-300 absolute left-44 ml-2 w-52 top-0">
                      {filterOption.operators.map((operator, operatorIndex)=>(
                          <div key={operatorIndex} className="">
                                {/* onClick={()=>{selectOperator(operatorIndex)}} */}
                              <button className='flex gap-x-4 items-center w-full px-4 py-1 text-sm' onClick={()=>{selectOperator(optionIndex, operatorIndex)}}>
                                  <div className='w-3'>
                                      <div className={`rounded-full border border-black ${operator.selected === true ? 'bg-black' : ''}`} style={{width: '10px', height: '10px'}} />
                                  </div>
                                  <span>{operator.name}</span>
                              </button>
                          </div>
                      ))}

                      <div className='w-full p-4'>
                          {filterOptions[activeFilter].type === 'select' && 
                              <select className='w-full rounded border border-gray-400 px-3 py-2 text-sm' onChange={(e)=>{addTerm(e.target.value)}}>
                                  <option value="">Select option</option>
                                  {filterOptions[activeFilter].termOptions.map((term, termIndex)=>(
                                      <option key={termIndex} value={term}>{term}</option>
                                  ))}
                              </select> 
                          }

                          {filterOptions[activeFilter].type === 'multi-select' && 
                            <CheckboxGroup 
                                options={filterOptions[activeFilter].termOptions} 
                                returnSelections={(selections)=>{addTerm(selections)}} 
                              />
                          }

                          {filterOptions[activeFilter].type === 'search' && 
                            <>
                              {/* <input className='w-full rounded border border-gray-400 px-3 py-2 text-sm' placeholder={filterOptions[activeFilter].searchPlaceholder} type="text" onChange={(e)=>{performSearch(e.target.value)}} /> 

                              <div className='my-2'>
                                <p className='text-sm text-gray-500'>Search results</p>
                              </div> */}
                              <FilterSearchBox 
                                performSearch={(term)=>{performSearch(term, optionIndex, filterOption)}}
                                searchResults={
                                  filterOption?.searchConfig?.searchReference === 'customers' ? 
                                  customers : filterOption?.searchConfig?.searchReference === 'brands' ? 
                                  brands : categories}
                                resultDisplayField={
                                  filterOption?.searchConfig?.resultDisplayField}
                                returnSelectedResult={
                                  (selectedResult)=>{
                                    addTerm(selectedResult[filterOption.searchConfig.resultValueField], selectedResult[filterOption.searchConfig.resultDisplayField])}}
                                placeholderText={filterOption?.searchConfig?.searchPlaceholder}
                                searchInProgress={processingIndex === optionIndex}
                            />
                            </>
                          }

                          {(filterOptions[activeFilter].type === 'number' || filterOptions[activeFilter].type === 'currency') && 
                              <input className='w-full rounded border border-gray-400 px-3 py-2 text-sm' placeholder='Enter value' type="number" onChange={(e)=>{addTerm(e.target.value)}} />    
                          }

                          {filterOptions[activeFilter].type === 'date' && 
                              <input className='w-full rounded border border-gray-400 px-3 py-2 text-sm' placeholder='' type="date" onChange={(e)=>{addTerm(e.target.value)}} />    
                          }

                          <div className='w-full flex items-center gap-x-2'>
                            <button className='mt-3 p-3 rounded text-sm bg-gray-100 text-ink-navy flex items-center justify-center' onClick={()=>{toggleActiveFilter(optionIndex)}}>
                              <CloseIcon classes="w-4 h-4" />
                            </button>
                            <button className='mt-3 p-2 rounded text-sm bg-ink-navy text-white w-full' onClick={()=>{addFilter(filters[activeFilter])}}>
                              Apply filter
                            </button>
                          </div>

                      </div>
                  {/* </div> */}
              </div>
              }
              {/* </div> */}
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}

export default FiltersV3
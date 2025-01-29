import React, { useState } from 'react'
import Spinner from './icons/Spinner'
import DocSearchIcon from './icons/DocSearchIcon'

const FilterSearchBox = ({performSearch, searchResults, resultDisplayField, returnSelectedResult, placeholderText, searchInProgress}) => {
    const [resultsActive, setResultsActive] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const [inputValue, setInputValue] = useState('');

    const openSearchResults = (term) => {
        setSearchTerm(term)
        setInputValue(term)
        if(searchTerm.length < 2) {
            setResultsActive(false)
            return
        }
        setResultsActive(true)
        performSearch(term)
    }

    const selectResult = (selectedIndex, selected) => {
        setInputValue(selected[resultDisplayField])
        returnSelectedResult(selected)
        setResultsActive(false)
    }

    return (
        <div className='relative'>
            <div className="relative rounded shadow-sm border border-gray-200 py-2 px-4 bg-white w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm mt-1">
                        {/* <img src={SearchIcon} alt="search" className="w-4 -mt-2 opacity-30" /> */}
                        <DocSearchIcon className={`w-5 h-5`} />
                    </span>
                </div>
                <input type="text" className="block w-full text-sm focus:border-transparent focus:outline-none pl-5" placeholder={placeholderText} onChange={(e)=>(
                    openSearchResults(e.target.value)
                )} value={inputValue} />
            </div>
            
            {resultsActive && <div className='w-full bg-white py-6 rounded' style={{height:'inherit'}}>
                <button className='absolute top-3 right-3 text-gray-600 hover:text-gray-400 transition duration-200' onClick={()=>{setResultsActive(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {searchInProgress ? <div className='w-full p-3 flex items-center justify-center'>
                    <Spinner />
                </div>
                :
                <>
                    {searchResults && searchResults.length > 0 && <h3 className='text-sm font-medium text-ink-navy'>Search Results</h3>}
                    <div className='w-full py-2'>
                        {searchResults && searchResults.length > 0 ?
                        searchResults.map((result, resultIndex) => (
                            <button key={resultIndex} onClick={()=>{selectResult(resultIndex, result)}} className='w-full flex flex-row gap-x-4 items-center hover:bg-gray-100 p-3'>
                                <span className="font-sofia-pro text-xs font-medium text-ink-navy">{result[resultDisplayField]}</span>
                            </button>
                        )) : 
                            <div className='rounded bg-gray-100 w-4/5 p-4 items-center m-auto'>
                                <p className='text-xs text-gray-400'>No results found</p>
                            </div>
                        }
                    </div>
                </>}

            </div>}
        </div>
    )
}

export default FilterSearchBox
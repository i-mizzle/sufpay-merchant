import React from 'react'
import InlinePreloader from '../InlinePreloader'

const FormButton = ({buttonLabel, buttonAction, processing}) => {
  return (
    <button type='submit' disabled={processing} onClick={()=>{buttonAction()}} className='w-full p-3 rounded-[8px] bg-sufpay-black text-white border border-sufpay-black text-sm font-[500] transition duration-200 hover:bg-accent hover:text-sufpay-black flex items-center justify-center'>{processing ? <InlinePreloader /> : buttonLabel }</button>
  )
}

export default FormButton
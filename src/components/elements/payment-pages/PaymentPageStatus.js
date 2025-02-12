import React from 'react'

const PaymentPageStatus = ({active}) => {
  return (
    <>
        {active ? <span className='text-xs rounded uppercase tracking-[0.1em] font-[500] text-green-600 bg-green-50 px-[10px] py-[5px]'>
            active
        </span> : 
        <span className='text-xs rounded uppercase tracking-[0.1em] font-[550] text-red-600 bg-red-50 px-[10px] py-[5px]'>
            deactivated
        </span>
        }
    </>
  )
}

export default PaymentPageStatus
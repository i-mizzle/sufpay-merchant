import moment from 'moment'
import React from 'react'
import ArrowIcon from '../icons/ArrowIcon'

const PaymentItemCard = ({paymentItem}) => {
    return (
        <div className='w-full'>
            <div className='w-full h-[250px] bg-gray-100'>

            </div>
            <div className='p-[10px]'>
                <h3 className='mt-[10px]'>{paymentItem.name}</h3>
                <p className='text-sm mt-[5px] uppercase tracking-[0.1em]'>{paymentItem.itemCode}</p>
                <p className='text-xs mt-[5px]'>{paymentItem.description}</p>
                <p className='text-xs mt-[5px]'>{paymentItem?.category || ''}</p>

                <p className='font-host-grotesk'>₦{paymentItem.amount.toLocaleString()} {paymentItem.serviceFee && paymentItem.serviceFee > 0 && <span className='text-gray-500 text-xs font-poppins'>- Service Fee ₦{paymentItem.serviceFee.toLocaleString()}</span>}</p>
                
                <p className='text-gray-400 text-xs mt-[10px]'>Created {moment(paymentItem.createdAt).format('MMMM Do YYYY')}</p>

                <button className='text-secondary hover:text-primary transition duration-200 text-xs flex items-center gap-x-[5px] font-poppins mt-[20px]'>
                    See item details
                    <ArrowIcon className={`w-4 h-4`} />
                </button>
            </div>
        </div>
    )
}

export default PaymentItemCard
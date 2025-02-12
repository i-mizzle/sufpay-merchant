import moment from 'moment'
import React from 'react'
import ArrowIcon from '../icons/ArrowIcon'
import TrashIcon from '../icons/TrashIcon'
import { Link } from 'react-router-dom'

const PaymentItemCard = ({paymentItem, doDelete}) => {
    const deleteItem = () => {
        if(window.confirm(`The payment item ${paymentItem.name} will be deleted. Are you sure you want to proceed?`)) {
            doDelete(paymentItem.id)
        }
    }
    return (
        <div className='w-full'>
            <div className='w-full h-[250px] bg-gray-100'>

            </div>
            <div className='p-[10px]'>
                <h3 className='mt-[10px]'>{paymentItem.name}</h3>
                <div className='flex items-center justify-between'>
                    <p className='text-sm mt-[5px] uppercase tracking-[0.1em]'>{paymentItem.itemCode}</p>
                    <p className='text-gray-400 text-[10px]'>Created {moment(paymentItem.createdAt).format('MMMM Do YYYY')}</p>
                </div>
                <p className='text-xs mt-[5px]'>{paymentItem.description}</p>
                <p className='text-xs mt-[5px]'>{paymentItem?.category || ''}</p>

                <p className='font-host-grotesk'>₦{paymentItem.amount.toLocaleString()} {paymentItem.serviceFee && paymentItem.serviceFee > 0 && <span className='text-gray-500 text-xs font-poppins'>- Service Fee ₦{paymentItem.serviceFee.toLocaleString()}</span>}</p>
                
                <div className='flex items-center justify-between mt-[20px]'>
                    <Link to={`/merchant/payment-items/${paymentItem.id}`} className='text-secondary hover:text-primary transition duration-200 text-xs flex items-center gap-x-[5px] font-poppins'>
                        See item details
                        <ArrowIcon className={`w-4 h-4`} />
                    </Link>
                    <button onClick={()=>deleteItem()} className='text-gray-400 hover:text-red-500 bg-transparent hover:bg-red-100 p-[5px] rounded transition duration-200 text-xs flex items-center gap-x-[5px] font-poppins'>
                        <TrashIcon className={`w-5 h-5`} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentItemCard
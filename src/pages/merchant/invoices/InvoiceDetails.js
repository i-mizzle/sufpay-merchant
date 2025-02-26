import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authHeader } from '../../../utils'
import axios from 'axios'
import { ERROR } from '../../../store/types'
import Loader from '../../../components/elements/Loader'
import ClipboardCopyIcon from '../../../components/elements/icons/ClipboardCopyIcon'
import TrashIcon from '../../../components/elements/icons/TrashIcon'
import PencilSquareIcon from '../../../components/elements/icons/PencilSquareIcon'

const InvoiceDetails = () => {
  const dispatch = useDispatch()
  const { invoiceId } = useParams()
  const [loading, setLoading] = useState(true);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    const fetchInvoice = async  () => {
      const headers = authHeader()
      setLoading(true)
      try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/billers/invoices/get/one/${invoiceId}`, { headers })      
          setInvoiceDetails(response.data)
          setLoading(false)  
  
      } catch (error) {
          console.log('invoices error: ', error)
          dispatch({
              type: ERROR,
              error
          })
      }
    }
    fetchInvoice()
    return () => {
      
    };
  }, [dispatch, invoiceId]);

  const invoiceTotal = () => {
    return invoiceDetails?.billerItems?.reduce((a, b) => a + (b.item.amount * b.quantity || 0), 0)
  }

  return (
    <MerchantLayout>
      {loading ? 
        <Loader preloadingText={`Fetching invoice details, please wait...`} />
      :
      <div className='w-full bg-gray-50 min-h-screen h-inherit p-[20px]'>
        <div className='w-full flex flex-row-reverse mb-[50px] items-center gap-x-[10px]'>

          <button className='bg-gray-200 rounded-[8px] flex items-center gap-x-[5px] px-[18px] py-[12px] text-gray-500 text-xs'>
            <PencilSquareIcon className={`w-4 h-4`} />
            Edit Invoice
          </button>
          <button className='bg-white rounded-[8px] flex items-center gap-x-[5px] px-[18px] py-[12px] text-red-500 text-xs'>
            <TrashIcon className={`w-4 h-4`} />
            Delete/Cancel Invoice
          </button>
        </div>
        <div className='w-8/12 mx-auto p-[40px] bg-white min-h-[700px] h-inherit'>
          <div className='w-full flex items-start justify-between'>
            <div className='w-full mb-[20px]'>
              <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Customer</label>
              <div className=''>
                <h3 className='text-xl font-[550] tracking-tight'>{invoiceDetails.customer.name}</h3>
                <p className='text-[13px] mb-[5px] font-[500]'>{invoiceDetails.customer.address}</p>
                <p className='text-[13px] mb-[5px] font-[500]'>{invoiceDetails.customer.emailAddress}</p>
                <p className='text-[13px] mb-[5px] font-[500]'>{invoiceDetails.customer.phoneNumber}</p>
              </div>
            </div>
            <span className='p-[10px] bg-gray-100 text-gray-500 rounded-[8px] font-[500] text-[13px]'>
              Unpaid
            </span>
          </div>

          <div className='w-full mb-[20px]'>
            <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Invoice URL</label>
            <div className='flex items-start w-full gap-x-[15px]'>
              <p className='text-xs text-secondary text-wrap w-max inline-block'>https://sufpay-invoicing-payments.vercel.app/invoices/{invoiceDetails.id}</p>
              <button className='text-gray-500 transition duration-200 hover:text-gray-600'><ClipboardCopyIcon className={'w-4 h-4'} /></button>
            </div>
          </div>
          <div className='w-full mb-[20px]'>
            <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Invoice items</label>
            {invoiceDetails.billerItems.map((item, itemIndex)=>(
              <div key={itemIndex} className='w-full mb-[10px] flex items-start justify-between gap-x-[10px]'>
                <div className='w-6/12'>
                  <p className='text-[13px] mb-[5px] font-[500]'>{item.item.name}</p>
                  <p className='text-[11px] mb-[5px]'>{item.item.description}</p>
                  <p className='text-xs mt-[5px]'>{item.item?.category || ''}</p>
                </div>
                <div className='w-3/12 text-right'>
                  <p className='text-[13px] mb-[5px] font-[500]'>{item.quantity}</p>
                </div>
                <div className='w-3/12 text-right'>
                  <p className='font-host-grotesk'>₦{item.item.amount.toLocaleString()}</p> {item.item.serviceFee && item.item.serviceFee > 0 && 
                    <span className='text-gray-500 text-xs font-poppins'>Service Fee ₦{item.item.serviceFee.toLocaleString()}
                  </span>}
                </div>
                
              </div>
            ))}
            <div className='mt-[60px]'>
              <label className='text-[10px] text-right tracking-[0.1em] uppercase block mb-[7px]'>Invoice total</label>
              <div className='flex flex-row-reverse items-center justify-between'>
                <h3 className='text-xl font-[550] tracking-tight'>₦{invoiceTotal().toLocaleString()}</h3>
                {/* {invoiceDetails.acceptsUserAmount && <span className='text-xs uppercase tracking-[0.1em] font-[500] rounded text-gray-600 bg-gray-100 px-[10px] py-[5px]'>
                  accepts user amount
                </span>} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </MerchantLayout>
  )
}

export default InvoiceDetails
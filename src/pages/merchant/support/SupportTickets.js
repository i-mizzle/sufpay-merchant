import React, { useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import EmptyState from '../../../components/elements/EmptyState';

const SupportTickets = () => {
  const [creatingTicket, setCreatingTicket] = useState(false);
  return (
    <MerchantLayout>
      <>
        <div className='w-full'>
          <div className='w-full flex items-start justify-between'>
            <div className='w-1/2'>
              <h3 className='text-sufpay-black font-[550] tracking-tight text-2xl'>Sufpay Support</h3>
              <p className='text-[13px] text-sufpay-gray mt-[10px]'>
                Here are a list of support tickets you have created on sufpay. You can contact support by creating a support ticket (click on "Contact support to create one")
              </p>
            </div> 
            <button onClick={()=>{setCreatingTicket(true)}} className='rounded-[8px] px-4 py-3 mt-4 text-sm text-gray-100 bg-sufpay-black transition duration-200 border border-sufpay-black hover:bg-accent hover:text-sufpay-black flex items-center justify-center gap-x-2'>
              Contact Support
            </button>
          </div>

          <div className='w-full grid grid-cols-3 gap-[20px] mt-[50px]'>
            <div className='w-full bg-gray-50 p-[50px] rounded-[10px]'>
              <h3 className='text-sufpay-black font-[550] tracking-tight text-lg'>FAQ</h3>
            </div>
            <div className='w-full bg-gray-50 p-[50px] rounded-[10px]'>
              <h3 className='text-sufpay-black font-[550] tracking-tight text-lg'>Knowledgebase</h3>
            </div>
            <div className='w-full bg-gray-50 p-[50px] rounded-[10px]'>
              <h3 className='text-sufpay-black font-[550] tracking-tight text-lg'>Documentation</h3>
            </div>
          </div>

          <div className='mt-[20px] pt-[20px] border-t'>
            <EmptyState emptyStateText={`You have not created any support tickets yet`} />
          </div>
        </div>
      </>
    </MerchantLayout>
  )
}

export default SupportTickets
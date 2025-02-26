import React from 'react'
import MerchantLayout from '../../components/layouts/MerchantLayout'

const MerchantErrorPage = () => {
  return (
    <MerchantLayout>
      <div className='w-full min-h-[500px] flex items-center'>
        <div className='w-1/2'>
          <h3 className='text-sufpay-black font-[550] tracking-tight text-2xl'>An Error Occurred!</h3>
          <hr className='my-[15px]' />
          <p className='text-[13px] text-sufpay-gray mt-[10px]'>
            <span className='font-[500] text-sm'>Sorry this page either does not exist or something went wrong.</span> <br/>
            This is on us, not you - We are working on fixing this.
          </p>

          <p className='text-[13px] text-gray-400 mt-[10px]'>Please use the sidebar to navigate to a different page or check back later</p>
        </div>
      </div>
    </MerchantLayout>
  )
}

export default MerchantErrorPage
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeBusiness } from '../../../utils';
import { fetchApiKeys } from '../../../store/actions/paymentsActions';
import Loader from '../../../components/elements/Loader';
import TextField from '../../../components/elements/form/TextField';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SET_SUCCESS } from '../../../store/types';
import ClipboardCopyIcon from '../../../components/elements/icons/ClipboardCopyIcon';

const MerchantKeys = () => {
  const paymentsSelector = useSelector(state => state.payments)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchApiKeys(activeBusiness().id))
    return () => {
      
    };
  }, [dispatch]);
  return (
    <div className="w-full">
      <div className='w-1/2'>
        <h3 className='text-sufpay-black font-[550] tracking-tight text-2xl'>Merchant API Keys</h3>
        <p className='text-[13px] text-sufpay-gray mt-[10px]'>
        Your API keys are needed to integrate payments on our platform. Use them in your website/platform according to our <a href='https://google.com' className='text-success'>Documentation</a> to get started.
        </p>

        {paymentsSelector.loadingApiKeys ? 
          <Loader />
        
        : 
          <>
            <div className='w-full flex items-end justify-between gap-x-[5px] mt-4'>
              <div className='w-full'>
                <TextField
                  inputLabel="Development API Key" 
                  fieldId={`dev-api-key`}
                  inputType="text" 
                  preloadValue={paymentsSelector?.apiKeys?.test}
                  inputPlaceholder={''}
                  hasError={false} 
                  disabled={true}
                  returnFieldValue={(value)=>{}}
                />
              </div>
              <div className='w-[51px]'>
                <CopyToClipboard text={paymentsSelector?.apiKeys?.test}
                  onCopy={() =>  dispatch({
                      type: SET_SUCCESS,
                      payload: `Development API Key copied to clipboard`
                  })}>
                  <button className='bg-gray-100 transition duration-200 hover:bg-gray-200 rounded-full w-[50px] h-[50px] flex items-center justify-center'>
                    <ClipboardCopyIcon className={`w-5 h-5`} />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <div className='w-full flex items-end justify-between gap-x-[5px] mt-4'>
              <div className='w-full'>
                <TextField
                  inputLabel="Live API Key" 
                  fieldId={`dev-api-key`}
                  inputType="text" 
                  preloadValue={paymentsSelector?.apiKeys?.production}
                  inputPlaceholder={''}
                  hasError={false} 
                  disabled={true}
                  returnFieldValue={(value)=>{}}
                />
              </div>
              <div className='w-[51px]'>
                <CopyToClipboard text={paymentsSelector?.apiKeys?.production}
                  onCopy={() =>  dispatch({
                      type: SET_SUCCESS,
                      payload: `Live API Key copied to clipboard`
                  })}>
                  <button className='bg-gray-100 transition duration-200 hover:bg-gray-200 rounded-full w-[50px] h-[50px] flex items-center justify-center'>
                    <ClipboardCopyIcon className={`w-5 h-5`} />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <label className='text-sufpay-gray text-xs block mt-[5px] w-[80%]'>You can only use this when your merchant account has passed our KYC requirements and gone live.</label>
          </>
        }
      </div> 
    </div>
  )
}

export default MerchantKeys
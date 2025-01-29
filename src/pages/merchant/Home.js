import React from 'react'
import MerchantLayout from '../../components/layouts/MerchantLayout'
import TextField from '../../components/elements/form/TextField'
import ClipboardCopyIcon from '../../components/elements/icons/ClipboardCopyIcon'
import ChartIcon from '../../assets/img/icons/chart-2.svg'
import { SET_SUCCESS } from '../../store/types'
import { useDispatch } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'

const Home = () => {
  const dispatch = useDispatch()
  return (
    <MerchantLayout>
        <div className='w-full h-screen flex justify-center'>
          <div className='w-2/3 mt-[100px]'>
            <img src={ChartIcon} alt='' className='mx-auto w-[100px] mb-[20px]' />
            <h3 className='text-lg font-[500] text-sufpay-black text-center mb-[10px]'>Welcome to Sufpay</h3>
            <p className='text-[13px] mb-[10px]'>
              You have arrived at your dashboard, once there is some activity on your account, you will be able to see summaries on this page.
            </p>
            <p className='text-[13px] mb-[15px]'>
              To help you get started quickly, here are the keys you will need to integrate payments on our platform. You can click <a className='font-[500] text-success' href='https://google.com'>here</a> to see our documentation
            </p>

            <div className='w-10/12 mx-auto'>
              <div className='w-full flex items-end justify-between gap-x-[5px] mb-[20px]'>
                <div className='w-full'>
                  <TextField
                    inputLabel="Development Client Id" 
                    fieldId={`dev-client-id`}
                    inputType="text" 
                    preloadValue={``}
                    inputPlaceholder={''}
                    hasError={false} 
                    disabled={true}
                    returnFieldValue={(value)=>{}}
                  />
                </div>
                <div className='w-[51px]'>
                  <CopyToClipboard text={`dev client id`}
                    onCopy={() =>  dispatch({
                        type: SET_SUCCESS,
                        payload: `Development client id copied to clipboard`
                    })}>
                    <button className='bg-gray-100 transition duration-200 hover:bg-gray-200 rounded-full w-[50px] h-[50px] flex items-center justify-center'>
                      <ClipboardCopyIcon className={`w-5 h-5`} />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
              <div className='w-full flex items-end justify-between gap-x-[5px]'>
                <div className='w-full'>
                  <TextField
                    inputLabel="Development API Key" 
                    fieldId={`dev-client-id`}
                    inputType="text" 
                    preloadValue={``}
                    inputPlaceholder={''}
                    hasError={false} 
                    disabled={true}
                    returnFieldValue={(value)=>{}}
                  />
                </div>
                <div className='w-[51px]'>
                  <CopyToClipboard text={`dev api key`}
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
            </div>
          </div>
        </div>
    </MerchantLayout>
  )
}

export default Home
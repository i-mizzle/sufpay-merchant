import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import { useDispatch } from 'react-redux';
import { authHeader, tableHeadersFields } from '../../../utils';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ERROR } from '../../../store/types';
import Loader from '../../../components/elements/Loader';
import PaymentPageStatus from '../../../components/elements/payment-pages/PaymentPageStatus';
import ClipboardCopyIcon from '../../../components/elements/icons/ClipboardCopyIcon';
import DataTable from '../../../components/elements/DataTable';

const PaymentPageDetails = () => {
  const dispatch = useDispatch()
  const { paymentPageId } = useParams()
  const [loading, setLoading] = useState(true);
  const [paymentPageDetails, setPaymentPageDetails] = useState(null);

  useEffect(() => {
    const fetchPaymentPage = async  () => {
      const headers = authHeader()
      setLoading(true)
      try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/billers/payment-pages/get/one/${paymentPageId}`, { headers })      
          setPaymentPageDetails(response.data)
          setLoading(false)  
  
      } catch (error) {
          console.log('payment page error: ', error)
          dispatch({
              type: ERROR,
              error
          })
      }
    }
    fetchPaymentPage()
    return () => {
      
    };
  }, [dispatch, paymentPageId]);
  return (
    <MerchantLayout>
      {loading ? 
        <Loader preloadingText={`Fetching payment page details, please wait...`} />
      :
        <div className='w-full flex items-start justify-between gap-x-[20px]'>
          <div className='w-4/12 p-[20px]'>
            <div className='w-full mb-[20px]'>
              <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Page title</label>
              <div className='flex items-center justify-between'>
                <h3>{paymentPageDetails.title}</h3>
                <PaymentPageStatus active={paymentPageDetails.active} />
              </div>
            </div>

            <div className='w-full mb-[20px]'>
              <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Page description</label>
              <p>{paymentPageDetails.description}</p>
            </div>

            <div className='w-full mb-[20px]'>
              <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Page URL</label>
              <div className='flex items-center w-full justify-between gap-x-[5px]'>
                <p className='text-xs text-secondary truncate w-[90%]'>{paymentPageDetails.url}</p>
                <button className='text-gray-500 transition duration-200 hover:text-gray-600'><ClipboardCopyIcon className={'w-4 h-4'} /></button>
              </div>
            </div>
            <div className='w-full mb-[20px]'>
              <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Page items</label>
              {paymentPageDetails.billerItems.map((item, itemIndex)=>(
                <div key={itemIndex} className='w-full mb-[20px]'>
                  <p className='text-[13px] mb-[5px] font-[500]'>{item.item.name}</p>
                  <p className='text-[11px] mb-[5px]'>{item.item.description}</p>
                  <p className='text-xs mt-[5px]'>{item.item?.category || ''}</p>
                  <p className='font-host-grotesk'>₦{item.item.amount.toLocaleString()} {item.item.serviceFee && item.item.serviceFee > 0 && <span className='text-gray-500 text-xs font-poppins'>- Service Fee ₦{item.item.serviceFee.toLocaleString()}</span>}</p>
                </div>
              ))}
              <label className='text-[10px] tracking-[0.1em] uppercase block mb-[7px]'>Page total amount</label>
              <div className='flex items-center justify-between'>
                <h3>₦{paymentPageDetails.totalAmount.toLocaleString()}</h3>
                {paymentPageDetails.acceptsUserAmount && <span className='text-xs uppercase tracking-[0.1em] font-[500] rounded text-gray-600 bg-gray-100 px-[10px] py-[5px]'>
                  accepts user amount
                </span>}
              </div>
            </div>
          </div>
          <div className='w-8/12 min-h-[90vh] h-inherit bg-gray-100 p-[30px] rounded'>
            <h3>Payment page purchases/transactions</h3>
            <p className='text-xs mt-[10px]'>A list of purchases on this payment page. you can click on a transaction to see more details</p>

            <div className='mt-[20px]'>
              <DataTable
                  tableHeaders={tableHeadersFields([])?.headers} 
                  tableData={[]} 
                  columnWidths={{}}
                  columnDataStyles={{}}
                  allFields={tableHeadersFields([]).fields}
                  onSelectItems={()=>{}}
                  tableOptions={{}}
                  pagination={{
                      perPage: 20, 
                      currentPage: 1,
                      totalItems:1,
                  }}
                  changePage={()=>{}}
                  updatePerPage={()=>{}}
              />
            </div>
          </div>
        </div>
      }
    </MerchantLayout>
  )
}

export default PaymentPageDetails
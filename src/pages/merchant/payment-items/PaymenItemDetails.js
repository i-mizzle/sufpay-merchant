import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout';
import Loader from '../../../components/elements/Loader';
import { ERROR } from '../../../store/types';
import { authHeader, tableHeadersFields } from '../../../utils';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataTable from '../../../components/elements/DataTable';
import PaymentItemCard from '../../../components/elements/payment-items/PaymentItemCard';

const PaymentItemDetails = () => {
    const dispatch = useDispatch()
    const { paymentItemId } = useParams()
    const [loading, setLoading] = useState(true);
    const [paymentItemDetails, setPaymentItemDetails] = useState(null);
  
    useEffect(() => {
      const fetchPaymentPage = async  () => {
        const headers = authHeader()
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/billers/biller-items/get/one/${paymentItemId}`, { headers })      
            setPaymentItemDetails(response.data)
            setLoading(false)  
    
        } catch (error) {
            console.log('payment item error: ', error)
            dispatch({
                type: ERROR,
                error
            })
        }
      }
      fetchPaymentPage()
      return () => {
        
      };
    }, [dispatch, paymentItemId]);
    return (
        <MerchantLayout>
          {loading ? 
            <Loader preloadingText={`Fetching payment item details, please wait...`} />
          :
            <div className='w-full flex items-start justify-between gap-x-[20px]'>
              <div className='w-4/12 p-[20px]'>
                <PaymentItemCard paymentItem={paymentItemDetails} hideLink={true} hideEdit={false}/>
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

export default PaymentItemDetails
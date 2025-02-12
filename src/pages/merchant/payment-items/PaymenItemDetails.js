import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout';
import Loader from '../../../components/elements/Loader';
import { ERROR } from '../../../store/types';
import { authHeader } from '../../../utils';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/billers/payment-items/get/one/${paymentItemId}`, { headers })      
            setPaymentItemDetails(response.data)
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
    }, [dispatch, paymentItemId]);
    return (
      <MerchantLayout>
        {loading ? 
          <Loader preloadingText={`Fetching payment item details, please wait...`} />
        :
          <div className='w-full flex items-start justify-between'>
  
          </div>
        }
      </MerchantLayout>
    )
}

export default PaymentItemDetails
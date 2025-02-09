import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../form/TextField';
import InlinePreloader from '../InlinePreloader';
import AutocompleteSelect from '../form/AutocompleteSelect';
import { authHeader } from '../../../utils';
import { ERROR } from '../../../store/types';
import axios from 'axios';
import { fetchBanks } from '../../../store/actions/paymentsActions';
import FormButton from '../form/FormButton';

const NewSubAccount = () => {
    const dispatch = useDispatch()
    const paymentsSelector = useSelector(state => state.payments)
    // {
    //     billerCode: this.activeBiller.billerCode,
    //     bankName: billerBankName,
    //     bankCode: this.bankCode,
    //     accountNumber: this.accountNumber,
    //     accountName: this.validation.accountName,
    //     primary: false,
    //     currencyCode: 'NGN',
    //     description: this.description
    //   }

    useEffect(() => {
        dispatch(fetchBanks())
        return () => {
            
        };
    }, [dispatch]);
    const [accountPayload, setAccountPayload] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [validatingAccount, setValidatingAccount] = useState(false);
    const [validatedAccount, setValidatedAccount] = useState({});

    const validateForm = () => {
        let errors = {}
    
        setValidationErrors(errors)
    
        return errors
      }

    const validateBankAccount = async () => {
        const headers = authHeader()
        
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
            type: ERROR,
            error: {response: {data: {
                message: 'Please check the highlighted fields'
                }}}
            })
            return
        }
        
        try {
            const requestPayload = {

            }

            setValidatingAccount(true)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_AUTH_PORT}/sign-up`, requestPayload, { headers })    
            
            setValidatedAccount(response.data)
        } catch (error) {
            console.log('error validating account: ', error)
            dispatch({
                type: ERROR,
                error
            })
            setValidatingAccount(false)
        }
    }

    const pushSubAccount = () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
            type: ERROR,
            error: {response: {data: {
                message: 'Please check the highlighted fields'
                }}}
            })
            return
        }

    }
    
    return (
        <div className='w-full'>
            <p className='text-[13px] text-gray-500'>Please provide business information and bank account details to proceed</p>
            {/* <div className='mt-4'>
                <TextField
                    inputLabel="Business Name" 
                    fieldId="business-name" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={'Active email address'}
                    hasError={validationErrors && validationErrors.name} 
                    returnFieldValue={(value)=>{setAccountPayload({...accountPayload, ...{name: value}})}}
                />
                <label className='block mt-2 text-xs text-gray-400'>Should correspond with the name on the business bank account</label>
            </div> */}
            <div className='mt-4'>
                {paymentsSelector?.loadingBanks ? 
                    <div className='w-max mx-auto'>
                        <InlinePreloader /> 
                    </div>
                    :
                    <>
                        {paymentsSelector?.banks?.length > 0 && <div className='w-full mt-2'>
                            <AutocompleteSelect
                                selectOptions={paymentsSelector?.banks}
                                inputLabel="Bank"
                                titleField="name"
                                displayImage={false}
                                imageField=""
                                placeholderText={`Select bank`}
                                // preSelectedIndex={complexions.findIndex(item => item.value === applicationPayload.complexion)}
                                preSelectedIndex={null}
                                fieldId="account-bank"
                                hasError={validationErrors && validationErrors.billerCategory}
                                returnFieldValue={(value) => {setAccountPayload({...accountPayload, ...{bankCode: value.id}})}}
                            />
                        </div>}
                    </>
                }
            </div>
            <div className='mt-4'>
                <TextField
                    inputLabel="Account Number" 
                    fieldId="account-number" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={'Account number'}
                    hasError={validationErrors && validationErrors.accountNumber} 
                    returnFieldValue={(value)=>{setAccountPayload({...accountPayload, ...{name: value}})}}
                />
                {/* <label className='block mt-2 text-xs text-gray-400'>Should correspond with the name on the business bank account</label> */}
            </div>
            
            <div className='mt-5'>
                <FormButton buttonLabel={`Create Sub-account`} buttonAction={()=>{pushSubAccount()}} processing={paymentsSelector.creatingSubAccount} />
            </div>
        </div>
    )
}

export default NewSubAccount
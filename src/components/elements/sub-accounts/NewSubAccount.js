import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../form/TextField';
import InlinePreloader from '../InlinePreloader';
import AutocompleteSelect from '../form/AutocompleteSelect';
import { activeBusiness, authHeader } from '../../../utils';
import { ERROR } from '../../../store/types';
import axios from 'axios';
import { fetchBanks } from '../../../store/actions/paymentsActions';
import FormButton from '../form/FormButton';
import { createSubAccount } from '../../../store/actions/subaccountActions';

const NewSubAccount = () => {
    const dispatch = useDispatch()
    const paymentsSelector = useSelector(state => state.payments)
    const subAccountsSelector = useSelector(state => state.subAccounts)
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
    const [accountPayload, setAccountPayload] = useState({});

    useEffect(() => {
        dispatch(fetchBanks())
        
        return () => {
            
        };
    }, [dispatch]);
    const [validationErrors, setValidationErrors] = useState({});
    const [validatingAccount, setValidatingAccount] = useState(false);
    const [validatedAccount, setValidatedAccount] = useState(null);

    const validateForm = () => {
        let errors = {}
    
        setValidationErrors(errors)
    
        return errors
    }
    
    const validateBankAccount = useCallback(async () => {
        const headers = authHeader();
    
        try {
            const requestPayload = {
                accountNumber: accountPayload.accountNumber,
                bankCode: accountPayload.bankCode
            };
    
            setValidatingAccount(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/payments/settlement-accounts/validate`,
                requestPayload,
                { headers }
            );
            if(response.data.success){
                setValidatedAccount(response.data);
                setValidatingAccount(false);
            }
        } catch (error) {
            console.log("error validating account: ", error);
            dispatch({
                type: ERROR,
                error,
            });
            setValidatingAccount(false);
        }
    }, [accountPayload.accountNumber, accountPayload.bankCode, dispatch]);
    
    

    useEffect(() => {
        if(accountPayload.accountNumber?.length === 10 && accountPayload?.bankCode && accountPayload.bankCode !== ''){
            validateBankAccount()
        }
        return () => {
            
        };
    }, [accountPayload.accountNumber, accountPayload.bankCode, validateBankAccount]);

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

        const payload = {
            billerId: activeBusiness().id,
            accountName: validatedAccount.accountName,
            accountNumber: validatedAccount.accountNumber,
            currency: 'NGN',
            bankId: accountPayload.bankId
        }

        dispatch(createSubAccount(payload))

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
                                returnFieldValue={(value) => {
                                    setAccountPayload({
                                        ...accountPayload, ...{
                                            bankCode: value.code,
                                            bankId: value.id
                                        }}
                                    )
                                }}
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
                    returnFieldValue={(value)=>{setAccountPayload({...accountPayload, ...{accountNumber: value}})}}
                />
                {/* <label className='block mt-2 text-xs text-gray-400'>Should correspond with the name on the business bank account</label> */}
            </div>

            {validatingAccount && 
                <div className='w-full flex items-center justify-center py-[10px]'>
                    <InlinePreloader />
                </div>
            }

            {validatedAccount && <div className='w-full mt-4'>
                <label className='block text-xs lg:text-md cursor-text z-10 relative py-1 transition mb-1'>Account name</label>
                <p className='capitalize font-[500] font-host-grotesk'>{validatedAccount?.accountName?.toLowerCase()}</p>
            </div>}
            
            <div className='mt-5'>
                <FormButton buttonLabel={`Create Sub-account`} buttonAction={()=>{pushSubAccount()}} processing={subAccountsSelector.creatingSubAccount} />
            </div>
        </div>
    )
}

export default NewSubAccount
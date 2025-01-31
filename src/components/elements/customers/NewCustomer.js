import React, { useState } from 'react'
import TextField from '../form/TextField'
import FormButton from '../form/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../store/types';
import { createCustomer } from '../../../store/actions/customersActions';
import { activeBusiness } from '../../../utils';

const NewCustomer = () => {
    const dispatch = useDispatch()
    const customersSelector = useSelector(state => state.customers)
    const [customerPayload, setCustomerPayload] = useState();
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        let errors = {}
        
        if(!customerPayload.emailAddress || customerPayload.emailAddress === '') {
            errors.emailAddress = true
        }
        
        if(!customerPayload.name || customerPayload.name === '') {
            errors.name = true
        }
        
        if(!customerPayload.phoneNumber || customerPayload.phoneNumber === '') {
            errors.phoneNumber = true
        }

        setValidationErrors(errors)

        return errors
    }


    const pushCustomer = () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            })
            return
        }

        const payload = {...customerPayload, ...{
            billerId: activeBusiness().id
        }}

        dispatch(createCustomer(payload))
    }
    return (
        <div className='w-full'>
            <p className='text-[13px] text-gray-500'>Fill in the following information to create a customer for your business.</p>
            <div className='mt-4'>
                <TextField
                    inputLabel="Customer name" 
                    fieldId="customer-name" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={`Customer's full name`}
                    hasError={validationErrors && validationErrors.name} 
                    returnFieldValue={(value)=>{setCustomerPayload({...customerPayload, ...{name: value}})}}
                />
            </div>
            <div className='mt-4'>
                <TextField
                    inputLabel="Customer email address" 
                    fieldId="customer-email" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={`Valid Email address`}
                    hasError={validationErrors && validationErrors.emailAddress} 
                    returnFieldValue={(value)=>{setCustomerPayload({...customerPayload, ...{emailAddress: value}})}}
                />
            </div>
            <div className='mt-4'>
                <TextField
                    inputLabel="Customer phone number" 
                    fieldId="customer-phone" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={`Active phone number`}
                    hasError={validationErrors && validationErrors.phoneNumber} 
                    returnFieldValue={(value)=>{setCustomerPayload({...customerPayload, ...{phoneNumber: value}})}}
                />
            </div>
            <div className='mt-5'>
                <FormButton buttonLabel={`Create Customer`} buttonAction={()=>{pushCustomer()}} processing={customersSelector.creatingCustomer} />
            </div>
        </div>
    )
}

export default NewCustomer
import React, { useEffect, useState } from 'react'
import { createBiller, fetchBillerCategories } from '../../../store/actions/billerActions';
import { useDispatch, useSelector } from 'react-redux';
import InlinePreloader from '../InlinePreloader';
import SelectField from '../form/SelectField';
import TextField from '../form/TextField';
import { ERROR } from '../../../store/types';
import FormButton from '../form/FormButton';

const NewBiller = () => {
    const dispatch = useDispatch()
    const billersSelector = useSelector(state => state.billers)
    const [validationErrors, setValidationErrors] = useState({});
    
    const [billerPayload, setBillerPayload] = useState({});
    useEffect(() => {
        dispatch(fetchBillerCategories())
        return () => {
            
        };
    }, [dispatch]);


    const validateForm = () => {
        let errors = {}
        
        if(!billerPayload.billerName || billerPayload.billerName === '') {
            errors.billerName = true
        }
        
        if(!billerPayload.billerCategory || billerPayload.billerCategory === '') {
            errors.billerCategory = true
        }

        setValidationErrors(errors)

        return errors
    }

    const pushBiller = () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            })
            return
        }

        dispatch(createBiller(billerPayload))
    }

    return (
        <div>
            <p className="text-xs text-gray-600">You can manage multiple businesses on this platform and it gives you an easy way to switch between businesses at any time. Please provide details of a business.</p>

            {billersSelector?.loadingCategories ? 
                <div className='w-max mx-auto'>
                <InlinePreloader /> 
                </div>
                :
                <>
                    {billersSelector?.categories?.length > 0 && <div className='w-full mt-2'>
                    <SelectField
                        selectOptions={billersSelector?.categories}
                        inputLabel="Business Category"
                        titleField="name"
                        displayImage={false}
                        imageField=""
                        placeholderText={`Select business category`}
                        // preSelectedIndex={complexions.findIndex(item => item.value === applicationPayload.complexion)}
                        preSelectedIndex={null}
                        fieldId="applicant-complexion"
                        hasError={validationErrors && validationErrors.billerCategory}
                        returnFieldValue={(value) => {setBillerPayload({...billerPayload, ...{billerCategory: value.id}})}}
                    />
                    {/* <label className='block mt-2 text-sm text-gray-400'>How many staff do you currently have in your facility?</label> */}
                    </div>}
                </>
            }
            
            <div className='mt-2'>
                <TextField
                    inputLabel="Business Name" 
                    fieldId="business-name" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={'Your registered/operating business name'}
                    hasError={validationErrors && validationErrors.billerName} 
                    returnFieldValue={(value)=>{setBillerPayload({...billerPayload, ...{billerName: value}})}}
                />
                <label className='block mt-2 text-xs text-gray-400'>Your business needs not be registered with CAC. But an unregistered business will have limits on the amounts they can process on sufpay</label>
            </div>

            <div className='mt-5'>
                  <FormButton buttonLabel={`Create Business`} buttonAction={()=>{pushBiller()}} processing={billersSelector.creatingBiller} />
              </div>
        </div>
    )
}

export default NewBiller
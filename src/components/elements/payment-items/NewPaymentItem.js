import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentItem, fetchPaymentItemCategories } from '../../../store/actions/paymentItemsActions';
import TextField from '../form/TextField';
import TextareaField from '../form/TextareaField';
import AutocompleteSelect from '../form/AutocompleteSelect';
import InlinePreloader from '../InlinePreloader';
import FormButton from '../form/FormButton';
import NumberField from '../form/NumberField';
import FileUpload from '../form/FileUpload';
import { ERROR } from '../../../store/types';
import { activeBusiness } from '../../../utils';

const NewPaymentItem = () => {
    const paymentItemsSelector = useSelector(state => state.paymentItems)
    const dispatch = useDispatch()
    // {
    //     "billerId": "550e8400-e29b-41d4-a716-446655440000",
    //     "itemCategoryId": "550e8400-e29b-41d4-a716-446655440000",
    //     "itemCode": "ICO05678",
    //     "amount": 100,
    //     "name": "Utility Bill",
    //     "source": "Utility Bill",
    //     "sourceIdentifier": "SI8w74q8923020",
    //     "images": "SI8w74q8923020",
    //     "customerIdentifierName": "Customer ID",
    //     "serviceFee": 10,
    //     "currency": "NGN",
    //     "description": "Electricity Bill Payment",
    //     "external": false
    // }

    const [itemPayload, setItemPayload] = useState({
        currency: 'NGN',
        external: false,
        serviceFee: 0,
        amount: 0
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        dispatch(fetchPaymentItemCategories())
        return () => {
            
        };
    }, [dispatch]);

    const [file, setFile] = useState(null);

    const validateForm = () => {
        let errors = {}

        if(!itemPayload.itemCategoryId || itemPayload.itemCategoryId === ''){
            errors.category = true
        }

        if(!itemPayload.name || itemPayload.name === ''){
            errors.name = true
        }

        if(!itemPayload.description || itemPayload.description === '' || itemPayload.description.length > 200){
            errors.description = true
        }
        
        setValidationErrors(errors)
        return errors
    }

    const pushItem = () => {
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
            ...itemPayload,
            ...{
                billerId: activeBusiness().id
            }
        }

        if(file) {}

        dispatch(createPaymentItem(payload))

    }

    return (
        <div className='w-full'>
            <p className='text-[13px] text-gray-500'>Please provide details of your payment item/revenue head below.</p>
            <div className='w-full'>
                <div className='mt-4'>
                    {paymentItemsSelector?.loadingCategories ? 
                        <div className='w-max mx-auto'>
                            <InlinePreloader/> 
                        </div>
                        :
                        <>
                            {paymentItemsSelector?.categories?.length > 0 && <div className='w-full mt-2'>
                                <AutocompleteSelect
                                    selectOptions={paymentItemsSelector?.categories}
                                    inputLabel="Item Category"
                                    titleField="name"
                                    displayImage={false}
                                    imageField=""
                                    placeholderText={`Select item category`}
                                    // preSelectedIndex={complexions.findIndex(item => item.value === applicationPayload.complexion)}
                                    preSelectedIndex={null}
                                    fieldId="account-bank"
                                    hasError={validationErrors && validationErrors.category}
                                    returnFieldValue={(value) => {
                                        setItemPayload({
                                            ...itemPayload, ...{
                                                itemCategoryId: value.id
                                            }}
                                        )
                                    }}
                                    requiredField={true}
                                />
                            </div>}
                        </>
                    }
                </div>
                <div className='mt-2 w-full'>
                    <TextField
                        inputLabel="Name" 
                        fieldId="item-name" 
                        inputType="text" 
                        preloadValue={itemPayload.name || ''}
                        inputPlaceholder={'The name of the item'}
                        hasError={validationErrors && validationErrors.title} 
                        returnFieldValue={(value)=>{setItemPayload({...itemPayload, ...{name: value}})}}
                        requiredField={true}
                    />
                </div>
                <div className='mt-2 w-full'>
                    <TextareaField
                        inputLabel="Description (200 characters max)" 
                        fieldId="page-description" 
                        inputType="text" 
                        preloadValue={itemPayload.description || ''}
                        inputPlaceholder={'Payment item description (200 characters max)'}
                        hasError={(validationErrors && validationErrors.description) || itemPayload?.description?.length > 200} 
                        returnFieldValue={(value)=>{setItemPayload({...itemPayload, ...{description: value}})}}
                        requiredField={true}
                    />
                    {itemPayload?.description?.length > 200 && <p className='text-xs text-red-500 mt-1'>Please keep description less than 200 characters</p>}
                </div>

                <div className='mt-2 w-full'>
                    <FileUpload
                        hasError={validationErrors.file}
                        fieldLabel={`Item Image`}
                        returnFileDetails={(details)=>{
                            setFile(details)
                        }}
                        acceptedFormats={['png', 'jpeg', 'jpg']}
                    />
                    <label className='block mt-2 text-xs text-gray-400'>{`Please add an image of the item if available`}</label>
                </div>

                <div className={`mt-2 w-full`}>
                    <NumberField
                        inputLabel={`Item Price`}
                        fieldId={`item-price`} 
                        inputType="text" 
                        preloadValue={itemPayload.amount || ''}
                        inputPlaceholder={'Item price'}
                        hasError={validationErrors && validationErrors[`price`]} 
                        returnFieldValue={(value)=>{setItemPayload({...itemPayload, ...{amount: value}})}}
                        requiredField={true}
                    />
                </div>

                <div className={`mt-2 w-full`}>
                    <NumberField
                        inputLabel={`Service Fee (if available)`}
                        fieldId={`service-fee`} 
                        inputType="text" 
                        preloadValue={itemPayload.serviceFee || ''}
                        inputPlaceholder={'Service foee'}
                        hasError={validationErrors && validationErrors[`price`]} 
                        returnFieldValue={(value)=>{setItemPayload({...itemPayload, ...{serviceFee: value}})}}
                    />
                </div>


                <div className='mt-5'>
                    <FormButton buttonLabel={`Create Payment Item`} buttonAction={()=>{pushItem()}} processing={paymentItemsSelector.creatingPaymentItem} />
                </div>
            </div>
        </div>
    )
}

export default NewPaymentItem
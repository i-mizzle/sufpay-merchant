import React, { useEffect, useState } from 'react'
import FormButton from '../form/FormButton'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR } from '../../../store/types'
import { activeBusiness, sanitizePayload } from '../../../utils'
import PlusIcon from '../icons/PlusIcon'
import TextField from '../form/TextField'
import NumberField from '../form/NumberField'
import TrashIcon from '../icons/TrashIcon'
import TextareaField from '../form/TextareaField'
import { createPaymentPage } from '../../../store/actions/paymentPagesActions'
import { fetchPaymentItems } from '../../../store/actions/paymentItemsActions'
import AutocompleteSelect from '../form/AutocompleteSelect'
import InlinePreloader from '../InlinePreloader'
import Checkbox from '../form/Checkbox'

const EditPaymentPage = ({pageDetails}) => {
    const paymentPagesSelector = useSelector(state => state.paymentPages)
    const paymentItemsSelector = useSelector(state => state.paymentItems)

    const dispatch = useDispatch()
    const pageItem = {
        id: '',
        quantity: 0,
        unitPrice: 0
    }

    const [pageItems, setPageItems] = useState(pageDetails.billerItems.map(item =>{return item.item}));
    const [paymentPagePayload, setPaymentPagePayload] = useState(pageDetails);

    useEffect(() => {
        dispatch(fetchPaymentItems())
        return () => {
            
        };
    }, [dispatch]);

    const invoiceTotal = () => {
        return pageItems.reduce((a, b) => a + (b.unitPrice * b.quantity || 0), 0)
    }

    const invoiceServiceFeeTotal = () => {
        return pageItems.reduce((a, b) => a + (b.serviceFee * b.quantity || 0), 0)
    }

    const updateItem = (index, field, value) => {
        const newItems = [...pageItems];
        newItems[index][field] = value

        console.log('new items: ', newItems)
        setPageItems(newItems)
    }

    const addInvoiceItem = () => {
        const newItems = [...pageItems];
        newItems.push(pageItem);
        setPageItems(newItems);
    }

    const removeInvoiceItem = (index) => {
        const newItems = [...pageItems];
        newItems.splice(index, 1);
        setPageItems(newItems);
    }

    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        let errors = {}

        if(!paymentPagePayload.title || paymentPagePayload.title === ''){
            errors.title = true
        }

        if(!paymentPagePayload.description || paymentPagePayload.description === ''){
            errors.description = true
        }

        pageItems.forEach((item, itemIndex) => {
            if(!item.id || item.id === ''){
                errors[`item-${itemIndex}-item`] = true
            }

            if(!item.quantity || item.quantity === '' || item.quantity < 1){
                errors[`item-${itemIndex}-quantity`] = true
            }

            // if(!item.unitPrice || item.unitPrice === ''){
            //     errors[`item-${itemIndex}-price`] = true
            // }
        })
        console.log('validation errors: ', errors)

        setValidationErrors(errors)
        return errors
    }

    const pushInvoice = () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            })
            return
        }

        // {
        //     "billerId": "string",
        //     "description": "string",
        //     "title": "string",
        //     "totalAmount": 0,
        //     "currencyCode": "NGN",
        //     "active": true,
        //     "url": "string",
        //     "acceptsUserAmount": true,
        //     "items": "[{id:'550e8400-e29b-41d4-a716-446655440001', quantity:2},{id:'550e8400-e29b-41d4-a716-446655440001', quantity:3}]"
        //   }
        
        const payload = {
            billerId: activeBusiness().id,
            items: pageItems.map(item => {return {id: item.id, quantity: item.quantity}}),
            currencyCode: 'NGN',
            totalAmount: invoiceTotal(),
            serviceFeeTotal: invoiceServiceFeeTotal(),
            url: 'https://payments.sufpay.com/page/',
            title: paymentPagePayload.title,
            description: paymentPagePayload.description,
            acceptsUserAmount: paymentPagePayload.acceptsUserAmount,
            discountValue: 0,
            active: true
        }
        
        dispatch(createPaymentPage(sanitizePayload(payload)))
    }

    return (
        <div className='w-full'>
            <div className='mt-2 w-full'>
                <TextField
                    inputLabel="Title" 
                    fieldId="page-title" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={'Title of payment page'}
                    hasError={validationErrors && validationErrors.title} 
                    returnFieldValue={(value)=>{setPaymentPagePayload({...paymentPagePayload, ...{title: value}})}}
                />
            </div>
            <div className='mt-2 w-full'>
                <TextareaField
                    inputLabel="Description" 
                    fieldId="page-description" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={'Page description (200 characters max)'}
                    hasError={validationErrors && validationErrors.emailAddress} 
                    returnFieldValue={(value)=>{setPaymentPagePayload({...paymentPagePayload, ...{description: value}})}}
                />
            </div>

            <div className='w-full mt-4'>
                <Checkbox
                    CheckboxLabel="Check this box if this payment page should allow the user enter the amount they want to pay."
                    checkboxToggleFunction={()=>{
                        setPaymentPagePayload({...paymentPagePayload, ...{acceptsUserAmount: !paymentPagePayload.acceptsUserAmount}})
                    }} 
                    isChecked={paymentPagePayload.acceptsUserAmount} 
                    hasError={false} 
                />
            </div>
            
            <h3 className='font-[500] text-sufpay-black mt-[15px]'>Payment Page Items</h3>
            <p className='text-[13px] text-gray-500'>You can add more items to this invoice by clicking on "add another item" button below.</p>

            {paymentItemsSelector?.paymentItems?.length === 0 && <div className='w-full'>
                <p className='text-center text-red-600 font-[500] my-[10px] text-xs bg-red-50 p-[10px] rounded'>
                    No payment items/revenue heads created yet, please create some first before you can add them on a payment page
                </p>
            </div>}

            {paymentItemsSelector?.loadingPaymentItems && 
                <div className='w-max mx-auto mt-[10px]'>
                    <InlinePreloader /> 
                </div>
            }

            <div className='w-full flex items-start justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    <p className='text-gray-500 text-xs'>Item </p>
                </div>
                <div className='mt-2 w-[150px]'>
                    <p className='text-gray-500 text-xs'>Quantity </p>
                </div>
                <div className='mt-2 w-[200px] text-right'>
                    <p className='text-gray-500 text-xs'>Unit price (₦)</p>
                </div>
                <div className='w-[50px]' />
            </div>
            

            {paymentItemsSelector?.paymentItems?.length > 0 && pageItems.map((item, itemIndex)=>(<div key={itemIndex} className='w-full flex items-center justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    {/* <TextField
                        fieldId={`item-${itemIndex}-item`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Item name/description'}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-item`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'item', value)}}
                    /> */}
                    {paymentItemsSelector?.loadingPaymentItems ? 
                        <div className='w-max mx-auto'>
                            <InlinePreloader /> 
                        </div>
                        :
                        <>
                            {paymentItemsSelector?.paymentItems?.length > 0 && <div className='w-full'>
                                <AutocompleteSelect
                                    selectOptions={paymentItemsSelector?.paymentItems}
                                    titleField="name"
                                    displayImage={false}
                                    imageField=""
                                    placeholderText={`Select item`}
                                    // preSelectedIndex={complexions.findIndex(item => item.value === applicationPayload.complexion)}
                                    preSelectedIndex={null}
                                    fieldId="account-bank"
                                    hasError={validationErrors && validationErrors[`item-${itemIndex}-item`]}
                                    returnFieldValue={(value) => {
                                        updateItem(itemIndex, 'id', value.id)
                                        updateItem(itemIndex, 'unitPrice', value.amount + value.serviceFee)
                                        updateItem(itemIndex, 'serviceFee', value.serviceFee)
                                    }}
                                    requiredField={true}
                                />
                            </div>}
                        </>
                    }
                </div>
                <div className='mt-2 w-[150px]'>
                    <NumberField
                        fieldId={`item-${itemIndex}-quantity`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={''}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-quantity`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'quantity', value)}}
                    />
                </div>
                <div className={`mt-2 w-[200px]`}>
                    {/* <NumberField
                        fieldId={`item-${itemIndex}-price`} 
                        inputType="text" 
                        preloadValue={item.unitPrice || ''}
                        disabled={true}
                        inputPlaceholder={'Item price per unit'}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-price`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'unitPrice', value)}}
                    /> */}
                    <div className='w-full text-right'>
                        <p className='text-sm font-host-grotesk'>
                            ₦{item.unitPrice.toLocaleString() || 0}
                        </p>
                    </div>
                </div>
                <div className='w-[50px]'>
                    {itemIndex > 0 && <button onClick={()=>{removeInvoiceItem(itemIndex)}} className='text-gray-400 hover:text-gray-600 p-[7px] rounded bg-transparent hover:bg-gray-100 transition duration-200'>
                        <TrashIcon className={`w-5 h-5`} />
                    </button>}
                </div>
            </div>))}
            <div className='w-full flex items-center justify-between gap-x-[10px] mt-2'>
                <div className='mt-2 w-full'>
                    <button onClick={()=>{addInvoiceItem(true)}} className='rounded-[8px] px-2 py-2 text-sm text-white bg-sufpay-gray transition duration-200 border border-sufpay-black hover:bg-gray-600 flex items-center justify-center gap-x-1'>
                    <PlusIcon className={`w-5 h-5`} />
                    Add another item
                    </button>
                </div>
                <div className='mt-2 w-[150px] text-right'>
                    <p className='text-gray-500 text-xs'>Total Due: </p>
                </div>
                <div className='mt-2 w-[200px] text-right -mr-3'>
                    <span className='p-3 block bg-secondary font-host-grotesk font-[500] text-sm rounded w-full bg-opacity-10'>₦{invoiceTotal().toLocaleString() || ''}</span>
                </div>
                <div className='w-[50px]' />
            </div>

            <div className='mt-5 flex flex-row-reverse pt-5 border-t'>
                <div className='w-[200px]'>
                    <FormButton buttonLabel={`Create payment page`} buttonAction={()=>{pushInvoice()}} processing={paymentPagesSelector.creatingPaymentPage} />
                </div>
            </div>
        </div>
    )
}

export default EditPaymentPage
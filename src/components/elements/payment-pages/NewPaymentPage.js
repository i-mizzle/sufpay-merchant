import React, { useState } from 'react'
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

const NewPaymentPage = () => {
    const paymentPagesSelector = useSelector(state => state.paymentPages)
    const dispatch = useDispatch()
    const pageItem = {
        itemQuantity: '',
        itemName: '',
        unitPrice: ''
    }
    const [pageItems, setPageItems] = useState([pageItem]);
    const [paymentPagePayload, setPaymentPagePayload] = useState({});

    const invoiceTotal = () => {
        return pageItems.reduce((a, b) => a + (b.unitPrice * b.itemQuantity || 0), 0)
    }

    const updateItem = (index, field, value) => {
        const newItems = [...pageItem];
        newItems[index][field] = value
        setPageItems(newItems)
    }

    const addInvoiceItem = () => {
        const newItems = [...pageItem];
        newItems.push(pageItem);
        setPageItems(newItems);
    }

    const removeInvoiceItem = (index) => {
        const newItems = [...pageItem];
        newItems.splice(index, 1);
        setPageItems(newItems);
    }

    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        let errors = {}

        if(!paymentPagePayload.name || paymentPagePayload.name === ''){
            errors.name = true
        }

        if(!paymentPagePayload.description || paymentPagePayload.description === ''){
            errors.description = true
        }

        pageItems.forEach((item, itemIndex) => {
            if(!item.item || item.item === ''){
                errors[`item-${itemIndex}-item`] = true
            }

            if(!item.itemQuantity || item.itemQuantity === ''){
                errors[`item-${itemIndex}-quantity`] = true
            }

            if(!item.unitPrice || item.unitPrice === ''){
                errors[`item-${itemIndex}-price`] = true
            }
        })
        

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
        
        const payload = {
            billerId: activeBusiness().id,
            items: pageItems,
            totalAmount: invoiceTotal(),
            currencyCode: 'NGN',
            url: '',
            title: paymentPagePayload.title,
            description: paymentPagePayload.description,
            acceptsUserAmount: paymentPagePayload.description
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
            
            <h3 className='font-[500] text-sufpay-black mt-[15px]'>Payment Page Items</h3>
            <p className='text-[13px] text-gray-500'>You can add more items to this invoice by clicking on "add another item" button below.</p>

            <div className='w-full flex items-start justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    <p className='text-gray-500 text-xs'>Item </p>
                </div>
                <div className='mt-2 w-[150px]'>
                    <p className='text-gray-500 text-xs'>Quantity </p>
                </div>
                <div className='mt-2 w-[250px]'>
                    <p className='text-gray-500 text-xs'>Unit price (₦)</p>
                </div>
            </div>
            {pageItems.map((item, itemIndex)=>(<div key={itemIndex} className='w-full flex items-center justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    <TextField
                        fieldId={`item-${itemIndex}-item`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Item name/description'}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-item`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'item', value)}}
                    />
                </div>
                <div className='mt-2 w-[150px]'>
                    <NumberField
                        fieldId={`item-${itemIndex}-quantity`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Valid Customer/Business Email Address'}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-quantity`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'itemQuantity', value)}}
                    />
                </div>
                <div className={`mt-2 w-[200px]`}>
                    <NumberField
                        fieldId={`item-${itemIndex}-price`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Item price per unit'}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-price`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'unitPrice', value)}}
                    />
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
                <div className='mt-2 w-[200px]'>
                    <span className='p-3 block bg-gray-100 font-host-grotesk font-[500] text-sm rounded w-full'>₦{invoiceTotal().toLocaleString() || ''}</span>
                </div>
                <div className='w-[50px]' />
            </div>

            <div className='mt-5 flex flex-row-reverse pt-5 border-t'>
                <div className='w-[200px]'>
                    <FormButton buttonLabel={`Create Invoice`} buttonAction={()=>{pushInvoice()}} processing={paymentPagesSelector.creatingPaymentPage} />
                </div>
            </div>
        </div>
    )
}

export default NewPaymentPage
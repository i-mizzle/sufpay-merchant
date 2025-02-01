import React, { useEffect, useState } from 'react'
import TextField from '../form/TextField';
import FormButton from '../form/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import NumberField from '../form/NumberField';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';
import DateField from '../form/DateField';
import { ERROR } from '../../../store/types';
import { createInvoice } from '../../../store/actions/invoicesActions';
import { activeBusiness } from '../../../utils';

const NewInvoice = () => {
    const dispatch = useDispatch()
    const invoicesSelector = useSelector(state => state.invoices)
    const [invoiceRecipient, setInvoiceRecipient] = useState({});

    const invoiceItem = {
        itemQuantity: '',
        itemName: '',
        unitPrice: ''
    }

    const [invoiceItems, setInvoiceItems] = useState([invoiceItem]);

    useEffect(() => {
        return () => {
            
        };
    }, [invoiceItems]);


    const invoiceTotal = () => {
        return invoiceItems.reduce((a, b) => a + (b.unitPrice * b.itemQuantity || 0), 0)
    }

    const updateItem = (index, field, value) => {
        const newItems = [...invoiceItems];
        newItems[index][field] = value
        setInvoiceItems(newItems)
    }

    const addInvoiceItem = () => {
        const newItems = [...invoiceItems];
        newItems.push(invoiceItem);
        setInvoiceItems(newItems);
    }

    const removeInvoiceItem = (index) => {
        const newItems = [...invoiceItems];
        newItems.splice(index, 1);
        setInvoiceItems(newItems);
    }

    const [validationErrors, setValidationErrors] = useState({});
    const [invoiceDueDate, setInvoiceDueDate] = useState('');

    const validateForm = () => {
        let errors = {}

        if(!invoiceRecipient.name || invoiceRecipient.name === ''){
            errors.name = true
        }
        
        if(!invoiceRecipient.emailAddress || invoiceRecipient.emailAddress === ''){
            errors.emailAddress = true
        }
        
        if(!invoiceRecipient.phoneNumber || invoiceRecipient.phoneNumber === ''){
            errors.phoneNumber = true
        }
        
        if(!invoiceRecipient.address || invoiceRecipient.address === ''){
            errors.address = true
        }

        invoiceItems.forEach((item, itemIndex) => {
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
            items: invoiceItems,
            invoiceRecipient: invoiceRecipient,
            totalAmount: invoiceTotal(),
            hasDueDate: invoiceDueDate && invoiceDueDate !== '',
            dueDate: invoiceDueDate
        }

        dispatch(createInvoice(payload))
    }

    return (
        <div className='w-full'>
            <div className='w-full flex items-start justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    <TextField
                        inputLabel="Name" 
                        fieldId="customer-business-name" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Customer or business name'}
                        hasError={validationErrors && validationErrors.name} 
                        returnFieldValue={(value)=>{setInvoiceRecipient({...invoiceRecipient, ...{fullName: value}})}}
                    />
                </div>
                <div className='mt-2 w-full'>
                    <TextField
                        inputLabel="Email Address" 
                        fieldId="email-address" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Valid Customer/Business Email Address'}
                        hasError={validationErrors && validationErrors.emailAddress} 
                        returnFieldValue={(value)=>{setInvoiceRecipient({...invoiceRecipient, ...{emailAddress: value}})}}
                    />
                </div>
                <div className='mt-2 w-full'>
                    <TextField
                        inputLabel="Phone number" 
                        fieldId="phone-number" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Valid Customer/Business Phone number'}
                        hasError={validationErrors && validationErrors.phoneNumber} 
                        returnFieldValue={(value)=>{setInvoiceRecipient({...invoiceRecipient, ...{phoneNumber: value}})}}
                    />
                </div>
            </div>
            <div className='w-full flex items-start justify-between gap-x-[10px]'>
                <div className='mt-4 w-full'>
                    <TextField
                        inputLabel="Address" 
                        fieldId="customer-business-address" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Customer or business physical address'}
                        hasError={validationErrors && validationErrors.address} 
                        returnFieldValue={(value)=>{setInvoiceRecipient({...invoiceRecipient, ...{address: value}})}}
                    />
                </div>
                <div className='mt-4 w-4/12'>
                    <DateField
                        inputLabel="Due date" 
                        fieldId="invoice-due-date" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Select due date'}
                        hasError={validationErrors && validationErrors.name} 
                        returnFieldValue={(value)=>{setInvoiceDueDate(new Date(value))}}
                    />
                </div>
            </div>
            
            <h3 className='font-[500] text-sufpay-black mt-[15px]'>Invoice Items</h3>
            <p className='text-[13px] text-gray-500'>You can add more items to this invoice by clicking on "add another item" button below.</p>

            <div className='w-full flex items-start justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    <p className='text-gray-500 text-xs'>Item </p>
                </div>
                <div className='mt-2 w-[150px]'>
                    <p className='text-gray-500 text-xs'>Quantity </p>
                </div>
                <div className='mt-2 w-[250px]'>
                    <p className='text-gray-500 text-xs'>Unit price ()</p>
                </div>
            </div>
            {invoiceItems.map((item, itemIndex)=>(<div key={itemIndex} className='w-full flex items-center justify-between gap-x-[10px]'>
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
                    <FormButton buttonLabel={`Create Invoice`} buttonAction={()=>{pushInvoice()}} processing={invoicesSelector.creatingInvoice} />
                </div>
            </div>
        </div>
    )
}

export default NewInvoice
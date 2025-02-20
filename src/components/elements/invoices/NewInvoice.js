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
import { activeBusiness, sanitizePayload } from '../../../utils';
import { Switch } from '@headlessui/react';
import RadioGroup from '../form/RadioGroup';
import InlinePreloader from '../InlinePreloader';
import AutocompleteSelect from '../form/AutocompleteSelect';
import { fetchPaymentItems } from '../../../store/actions/paymentItemsActions';

const NewInvoice = () => {
    const dispatch = useDispatch()
    const paymentItemsSelector = useSelector(state => state.paymentItems)
    const invoicesSelector = useSelector(state => state.invoices)
    const [invoiceRecipient, setInvoiceRecipient] = useState({});

    const invoiceItem = {
        quantity: '',
        id: ''
    }

    const [invoiceItems, setInvoiceItems] = useState([invoiceItem]);

    useEffect(() => {
        dispatch(fetchPaymentItems())
        return () => {
            
        };
    }, [dispatch]);


    const invoiceTotal = () => {
        return invoiceItems.reduce((a, b) => a + (b.unitPrice * b.quantity || 0), 0)
    }

    const updateItem = (index, field, value) => {
        console.log(index, field, value)
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
            if(!item.id || item.id === ''){
                errors[`item-${itemIndex}-item`] = true
            }

            if(!item.quantity || item.quantity === ''){
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
            items: sanitizePayload(invoiceItems),
            customer: invoiceRecipient,
            total: invoiceTotal(),
            totalService: 0,
            hasDueDate: invoiceDueDate && invoiceDueDate !== '',
            dueDate: invoiceDueDate,
            discountType: discountType || undefined,
            discountValue: discount || undefined
        }
        

        dispatch(createInvoice(sanitizePayload(payload)))
    }

    const [addDiscount, setAddDiscount] = useState(false);

    const discountTypes = [
        {label: 'Percentage', value: 'PERCENTAGE'},
        {label: 'Fixed Amount', value: 'FIXED'},
    ]

    const [discount, setDiscount] = useState(null);
    const [discountType, setDiscountType] = useState('');

    return (
        <div className='w-full'>
            <div className='w-full lg:flex items-start justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    <TextField
                        inputLabel="Name" 
                        fieldId="customer-business-name" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Customer or business name'}
                        hasError={validationErrors && validationErrors.name} 
                        returnFieldValue={(value)=>{setInvoiceRecipient({...invoiceRecipient, ...{name: value}})}}
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
            <div className='w-full lg:flex items-start justify-between gap-x-[10px]'>
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
                <div className='mt-4 w-full lg:w-4/12'>
                    <DateField
                        inputLabel="Due date" 
                        fieldId="invoice-due-date" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Select due date'}
                        hasError={validationErrors && validationErrors.date} 
                        returnFieldValue={(value)=>{setInvoiceDueDate(new Date(value))}}
                    />
                </div>
            </div>
            
            <h3 className='font-[500] text-sufpay-black mt-[15px]'>Invoice Items</h3>
            <p className='text-[13px] text-gray-500'>You can add more items to this invoice by clicking on "add another item" button below.</p>

            <div className='hidden w-full lg:flex items-start justify-between gap-x-[10px]'>
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
            {invoiceItems.map((item, itemIndex)=>(<div key={itemIndex} className='w-full lg:flex py-[20px] xl:py-0 border-t items-center justify-between gap-x-[10px]'>
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
                <div className='mt-2 w-full xl:w-[150px]'>
                    <NumberField
                        fieldId={`item-${itemIndex}-quantity`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Valid Customer/Business Email Address'}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-quantity`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'quantity', value)}}
                    />
                </div>
                {/* <div className={`mt-2 w-full xl:w-[200px]`}>
                    <NumberField
                        fieldId={`item-${itemIndex}-price`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Item price per unit'}
                        hasError={validationErrors && validationErrors[`item-${itemIndex}-price`]} 
                        returnFieldValue={(value)=>{updateItem(itemIndex, 'unitPrice', value)}}
                    />
                </div> */}
                <div className={`mt-2 w-[200px]`}>
                    <div className='w-full text-right'>
                        <p className='text-sm font-host-grotesk'>
                            ₦{item.unitPrice?.toLocaleString() || 0}
                        </p>
                    </div>
                </div>
                <div className='lg:w-[50px] mt-[20px] lg:mt-0'>
                    {itemIndex > 0 && <button onClick={()=>{removeInvoiceItem(itemIndex)}} className='text-gray-400 hover:text-gray-600 p-[7px] rounded bg-transparent hover:bg-gray-100 transition duration-200 flex items-center justify-center gap-x-[5px]'>
                        <TrashIcon className={`w-5 h-5`} />
                        <span className='lg:hidden text-xs text-gray-400'>Delete item</span>
                    </button>}
                </div>
            </div>))}
            <div className='w-full flex items-center justify-between gap-x-[10px] mt-2'>
                <div className='mt-2 w-full'>
                    <button onClick={()=>{addInvoiceItem(true)}} className='rounded-[8px] px-2 py-2 text-sm text-white bg-sufpay-gray transition duration-200 border border-sufpay-black hover:bg-gray-600 flex items-center justify-center gap-x-1'>
                    <PlusIcon className={`w-5 h-5`} />
                    Add <span className='hidden text-white font-host-grotesk lg:inline-block'>another item</span>
                    </button>
                </div>
                <div className='mt-2 w-[150px] text-right'>
                    <p className='text-gray-500 text-xs'>Total Due: </p>
                </div>
                <div className='mt-2 w-[200px]'>
                    <span className='p-3 block bg-gray-100 font-host-grotesk font-[500] text-sm rounded w-full'>₦{invoiceTotal()?.toLocaleString() || ''}</span>
                </div>
                <div className='w-[50px]' />
            </div>

            <div className='border-t w-full my-[15px]' />
            <h3 className='text-[15px] mb-[10px]'>Invoice Discount</h3>
            <div className="w-[95%] flex justify-between gap-x-4 mt-4 border-secondary border-opacity-50">
                <div className='w-10/12'>
                    <label className="block text-sm font-medium text-gray-700 font-sofia-pro">Add discount</label>
                    <label className="text-xs text-gray-500 font-sofia-pro">Flip this switch if you would like to add a discount to this invoice.</label>
                </div>
                <div className='w-2/12 flex flex-row-reverse'>
                    <Switch
                        checked={addDiscount}
                        onChange={()=>{setAddDiscount(!addDiscount)}}
                        className={`${
                            addDiscount ? 'bg-accent' : 'bg-gray-400'
                        } relative inline-flex items-center h-5 rounded-full w-10`}
                        >
                        <span className="sr-only">Requires fee</span>
                        <span
                            className={`transform transition ease-in-out duration-200 ${
                                addDiscount ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-gray-600'
                            } inline-block w-3 h-3 transform rounded-full`}
                        />
                    </Switch>
                </div>
            </div>

            {addDiscount && <div className='w-full'>
            <div className='flex items-start justify-between gap-x-[10px]'>
                <div className='mt-2 w-full'>
                    <RadioGroup 
                        items={discountTypes} 
                        inline={true}
                        preSelectedIndex={discountTypes.findIndex(item => item.value === discountType)}
                        inputLabel={'Discount Type'}
                        requiredField={true}
                        returnSelected={(value) => {setDiscountType(value.value)}} 
                        hasError={validationErrors && validationErrors.type}  
                        titleField='label'
                    />
                </div>
                <div className={`mt-2 w-full`}>
                    <NumberField
                        inputLabel={'Discount Amount'}
                        fieldId={`discount-amount`} 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={'Discount for this invoice'}
                        hasError={validationErrors && validationErrors.discount} 
                        returnFieldValue={(value)=>{setDiscount(value)}}
                    />
                </div>
            </div>

            </div>}

            <div className='mt-5 flex flex-row-reverse pt-5 border-t'>
                <div className='w-[200px]'>
                    <FormButton buttonLabel={`Create Invoice`} buttonAction={()=>{pushInvoice()}} processing={invoicesSelector.creatingInvoice} />
                </div>
            </div>
        </div>
    )
}

export default NewInvoice
import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import Filters from '../../../components/elements/Filters';
import ArrowUpTrayIcon from '../../../components/elements/icons/ArrowUpTrayIcon';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/elements/Loader';
// import DataTable from '../../../components/elements/DataTable';
import { clearCreatedPaymentItem, fetchPaymentItemCategories, fetchPaymentItems } from '../../../store/actions/paymentItemsActions';
// import { tableHeadersFields } from '../../../utils';
import { SET_SUCCESS } from '../../../store/types';
import EmptyState from '../../../components/elements/EmptyState';
import ModalDialog from '../../../components/layouts/ModalDialog';
import NewPaymentItem from '../../../components/elements/payment-items/NewPaymentItem';
import PaymentItemCard from '../../../components/elements/payment-items/PaymentItemCard';
import Pagination from '../../../components/elements/Pagination';

const PaymentItems = () => {
    const dispatch = useDispatch()
    const paymentItemsSelector = useSelector(state => state.paymentItems)
    const filters = [
        {
            name: 'marketplace',
            linkType: 'text',
            link: 'is',
            type: 'binary',
            options: ['Primary', 'Secondary'],
            value: "",
            displayValue: ""
        },
        {
            name: 'marketplace',
            linkType: 'text',
            link: 'is',
            type: 'binary',
            options: ['Primary', 'Secondary'],
            value: "",
            displayValue: ""
        },
        {
            name: 'offering type',
            linkType: 'text',
            link: 'is',
            type: 'binary',
            options: ['SAFE', 'Token', 'Both'],
            value: "",
            displayValue: ""
        },
        {
            name: 'target raised',
            linkType: 'option',
            link: ['is greater than', 'is less than'],
            type: 'number',
            value: "",
            displayValue: ""
        },
        {
            name: 'price',
            linkType: 'option',
            link: ['is greater than', 'is less than'],
            type: 'number',
            value: "",
            displayValue: ""
        }
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [activeFilters, setActiveFilters] = useState('');
    useEffect(() => {
        dispatch(fetchPaymentItems(activeFilters, currentPage, perPage))

        if(paymentItemsSelector.createdPaymentItem && paymentItemsSelector.createdPaymentItem !== null){
            dispatch(clearCreatedPaymentItem())
            dispatch({
                type: SET_SUCCESS,
                payload: 'New payment item created successfully'
            })
            setCreatingPaymentItem(false)
        }
        return () => {
            
        };
    }, [activeFilters, currentPage, dispatch, paymentItemsSelector.createdPaymentItem, perPage]);

    // const columnWidths = {
    //     name: 'w-3/12',
    //     emailAddress: 'w-3/12',
    //     phoneNumber: 'w-3/12',
    //     transactions: 'w-2/12',
    //     dateCreated: 'w-2/12'
    //   }
    
    //   const tableOptions = {
    //     selectable: false,
    //     clickableRows: true,
    //     rowAction: (index)=>{}
    //   }
    
    
    //   const cleanupData = (dataSet) => {
    //     if(!dataSet) return
    //       const data = []
      
    //       dataSet.forEach((item, itemIndex) => {
    //         data.push(
    //           {
    //             name: item.name,
    //             emailAddress:item.emailAddress,
    //             phoneNumber: item.phoneNumber,
    //             transactions: <p className='text-[13px] font-host-grotesk font-[500]'>₦0 <span className='font-poppins font-[400] text-xs'>(0 transactions)</span></p>,
    //             dateCreated: `${new Date(item.createdAt).toDateString()} - ${new Date(item.createdAt).toLocaleTimeString()}`,
    //           },
    //         )
    //       })
    //     return data
    //   }
    
    const [creatingPaymentItem, setCreatingPaymentItem] = useState(false);
    // const itemCategory = (id) => {
    //     console.log('ID: ', id)
    //     console.log('ID: ', paymentItemsSelector?.categories)

    //     return paymentItemsSelector?.categories?.find(cat => {return cat.id === id})
    // }
    return (
        <>
            <MerchantLayout>
                <div className="w-full">
                    <div className='py-3 mb-1'>
                        <div className="w-full mx-auto">
                            <div className='w-full flex items-center justify-between'>
                                <div className='w-2/3'>
                                <h4 className='font-medium text-lg mb-1 text-gray-400'>Payment Items (Revenue heads)</h4>
                                <div className=''>
                                    <p className='text-gray-500 mt-1 text-[13px]'>
                                        Here's a list of your payment items on Sufpay. Payment items can be seen as revenue heads for your organization and these can be added to your invoices, payment pages or enrolled on our VAS platform. You can create a new payment item by clicking on "Create payment item" and you can click into a payment item to see details and purchase history.
                                    </p>
                                </div>
                                </div>
                                <button onClick={()=>{setCreatingPaymentItem(true)}} className='rounded-[8px] px-4 py-3 mt-4 text-sm text-gray-100 bg-sufpay-black transition duration-200 border border-sufpay-black hover:bg-accent hover:text-sufpay-black flex items-center justify-center gap-x-2'>
                                    Create payment item
                                </button>
                            </div>

                            <div className='w-full flex items-center justify-between mt-5 mb-2 p-2 rounded-md border'>
                                <div className='w-full'>
                                    <Filters filterOptions={filters} />
                                </div>
                                <div className='w-full flex flex-row-reverse gap-x-2'>
                                    <button onClick={()=>{}} className={`text-gray-700 px-3 py-2 hover:bg-gray-100 transition duration-200 text-sm flex items-center justify-center gap-x-2 bg-gray-200 rounded border`}>
                                    <ArrowUpTrayIcon className={`w-5 h-5`} />
                                        Export Payment Items
                                    </button>
                                    
                                    {/* <button onClick={()=>{setView('grid')}} className={`${view === 'grid' ? 'text-gray-700' : 'text-gray-300'} p-1 rounded hover:bg-gray-100 transition duration-200`}>
                                        <SquaresIcon className={`w-7 h-7`} />
                                    </button>

                                    <button onClick={()=>{setView('list')}} className={`${view === 'list' ? 'text-gray-700' : 'text-gray-300'} p-1 rounded hover:bg-gray-100 transition duration-200`}>
                                        <ViewListIcon className={`w-7 h-7`} />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        {paymentItemsSelector.loadingPaymentItems
                        ? 
                            <div className='w-full'>
                                <Loader />
                            </div>
                        : 
                        <>
                            {/* <DataTable
                                tableHeaders={tableHeadersFields(cleanupData(paymentItemsSelector?.paymentItems)[0])?.headers} 
                                tableData={cleanupData(paymentItemsSelector?.paymentItems)} 
                                columnWidths={columnWidths}
                                columnDataStyles={{}}
                                allFields={tableHeadersFields(cleanupData(paymentItemsSelector?.paymentItems)[0]).fields}
                                onSelectItems={()=>{}}
                                tableOptions={tableOptions}
                                pagination={{
                                    perPage, 
                                    currentPage,
                                    totalPages: paymentItemsSelector?.paymentItems.total,
                                }}
                                changeItem={(page)=>{setCurrentPage(page)}}
                                updatePerItem={(perItem)=>{setPerPage(perItem)}}
                            />  */}
                            {paymentItemsSelector?.paymentItems?.length > 0 ? 
                                <div className="w-full">
                                    <div className='w-full grid grid-cols-3 gap-[10px]'>
                                        {paymentItemsSelector?.paymentItems.map((item, itemIndex)=>(<div key={itemIndex} className='w-full'>
                                            <PaymentItemCard paymentItem={item}/>
                                        </div>))}
                                    </div>

                                    <div className='w-full pt-[20px] border-t mt-[20px]'>
                                        <Pagination 
                                            pagination={{
                                            perPage, 
                                            currentPage: currentPage,
                                            totalItems: paymentItemsSelector?.paymentItems?.length,
                                            }} 
                                            changePage={setCurrentPage} 
                                            updatePerPage={setPerPage}
                                        />
                                    </div>
                                </div>
                            :
                                <EmptyState emptyStateText={`No payment items on your account yet`} />
                            }
                        </>
                        }
                    </div>
                </div>
            </MerchantLayout>
            <ModalDialog
                shown={creatingPaymentItem} 
                closeFunction={()=>{setCreatingPaymentItem(false)}} 
                actionFunction={()=>{}} 
                actionFunctionLabel={``}
                dialogTitle='Create a new payment item/revenue head'
                maxWidthClass='max-w-xl'
                hideActions={true}
            >
                <NewPaymentItem />
            </ModalDialog>
        </>
    )
}

export default PaymentItems
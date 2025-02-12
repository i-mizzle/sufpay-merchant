import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import ModalDialog from '../../../components/layouts/ModalDialog'
import NewPaymentPage from '../../../components/elements/payment-pages/NewPaymentPage'
import EmptyState from '../../../components/elements/EmptyState'
import Loader from '../../../components/elements/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Filters from '../../../components/elements/Filters'
import ArrowUpTrayIcon from '../../../components/elements/icons/ArrowUpTrayIcon'
import DataTable from '../../../components/elements/DataTable'
import { clearCreatedPaymentPage, fetchPaymentPages } from '../../../store/actions/paymentPagesActions'
import { SET_SUCCESS } from '../../../store/types'
import { tableHeadersFields } from '../../../utils'
import ClipboardCopyIcon from '../../../components/elements/icons/ClipboardCopyIcon'
import { Link } from 'react-router-dom'

const PaymentPages = () => {
  const paymentPagesSelector = useSelector(state => state.paymentPages)
  const dispatch = useDispatch()

  const [creatingPaymentPage, setCreatingPaymentPage] = useState(false);
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
  const [activeFilters, setActiveFilters] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    dispatch(fetchPaymentPages(activeFilters, currentPage, perPage))
    if(paymentPagesSelector.createdPaymentPage && paymentPagesSelector.createdPaymentPage !== null){
      dispatch(clearCreatedPaymentPage())
      dispatch({
        type: SET_SUCCESS,
        payload: 'New payment page created successfully'
      })
      setCreatingPaymentPage(false)
    }
  }, [perPage, currentPage, dispatch, activeFilters, paymentPagesSelector.createdPaymentPage])

  const columnWidths = {
    title: 'w-3/12',
    url: 'w-3/12',
    // items: `w-1/12`,
    totalAmount: 'w-2/12',
    transactions: 'w-2/12',
    dateCreated: 'w-2/12'
  }

  const tableOptions = {
    selectable: false,
    clickableRows: true,
    rowAction: (index)=>{}
  }


  const cleanupData = (dataSet) => {
    if(!dataSet) return
      const data = []
  
      dataSet.forEach((item, itemIndex) => {
        data.push(
          {
            title: <Link to={`/merchant/payment-pages/${item.id}`}>{item.title}</Link>,
            url:<div className='flex items-center justify-between gap-x-[5px]'>
              <p className='text-xs text-secondary truncate w-[90%]'>{item.url}</p>
              <button className='text-gray-500 transition duration-200 hover:text-gray-600'><ClipboardCopyIcon className={'w-4 h-4'} /></button>
            </div>,
            // items: item.items.length,
            totalAmount: <p className='font-host-grotesk font-[500] text-sc'>₦{item.totalAmount.toLocaleString()}</p>,
            transactions: <p className='text-[13px] font-host-grotesk font-[500]'>₦0 <span className='font-poppins font-[400] text-xs'>(0 transactions)</span></p>,
            dateCreated: `${new Date(item.createdAt).toDateString()} - ${new Date(item.createdAt).toLocaleTimeString()}`,
          },
        )
      })
    return data
  }
  
  return (
    <>
    <MerchantLayout>
        <div className="w-full">
          <div className='py-3 mb-1'>
            <div className="w-full mx-auto">
              <div className='w-full flex items-center justify-between'>
                <div className='w-2/3'>
                  <h4 className='font-medium text-lg mb-1 text-gray-400'>Payment pages</h4>
                  <div className=''>
                    <p className='text-gray-500 mt-1 text-[13px]'>
                      Here's a list of your payment pages on Sufpay. You can create a new payment page by clicking on "Create payment page". You can send the payment page links to your customers and then they can click and pay through it for the items in it. Click on a payment page below to see more details and payment histories.
                    </p>
                  </div>
                </div>
                <button onClick={()=>{setCreatingPaymentPage(true)}} className='rounded-[8px] px-4 py-3 mt-4 text-sm text-gray-100 bg-sufpay-black transition duration-200 border border-sufpay-black hover:bg-accent hover:text-sufpay-black flex items-center justify-center gap-x-2'>
                  Create new payment page
                </button>
              </div>

                <div className='w-full flex items-center justify-between mt-5 mb-2 p-2 rounded-md border'>
                  <div className='w-full'>
                    <Filters filterOptions={filters} />
                  </div>
                  <div className='w-full flex flex-row-reverse gap-x-2'>
                    <button onClick={()=>{}} className={`text-gray-700 px-3 py-2 hover:bg-gray-100 transition duration-200 text-sm flex items-center justify-center gap-x-2 bg-gray-200 rounded border`}>
                      <ArrowUpTrayIcon className={`w-5 h-5`} />
                      Export Payment Pages
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
            {paymentPagesSelector.loadingPaymentPages
              ? 
                  <div className='w-full'>
                      <Loader />
                  </div>
              : 
              <>
                  {paymentPagesSelector?.paymentPages?.paymentPages?.length > 0 ? <DataTable
                      tableHeaders={tableHeadersFields(cleanupData(paymentPagesSelector?.paymentPages?.paymentPages)[0])?.headers} 
                      tableData={cleanupData(paymentPagesSelector?.paymentPages?.paymentPages)} 
                      columnWidths={columnWidths}
                      columnDataStyles={{}}
                      allFields={tableHeadersFields(cleanupData(paymentPagesSelector?.paymentPages?.paymentPages)[0]).fields}
                      onSelectItems={()=>{}}
                      tableOptions={tableOptions}
                      pagination={{
                          perPage, 
                          currentPage,
                          totalItems: paymentPagesSelector?.paymentPages.total,
                      }}
                      changePage={(page)=>{setCurrentPage(page)}}
                      updatePerPage={(perPage)=>{setPerPage(perPage)}}
                  /> :
                    <EmptyState emptyStateText={`No payment pages on your account yet`} />
                  }
              </>
            }
          </div>
        </div>
      </MerchantLayout>

      <ModalDialog
        shown={creatingPaymentPage} 
        closeFunction={()=>{setCreatingPaymentPage(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel={``}
        dialogTitle='Create a new payment page'
        maxWidthClass='max-w-4xl'
        hideActions={true}
      >
        <NewPaymentPage />
      </ModalDialog>
    </>
  )
}

export default PaymentPages
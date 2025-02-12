import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatedInvoice, fetchInvoices } from '../../../store/actions/invoicesActions'
import { SET_SUCCESS } from '../../../store/types'
import Filters from '../../../components/elements/Filters'
import ArrowUpTrayIcon from '../../../components/elements/icons/ArrowUpTrayIcon'
import Loader from '../../../components/elements/Loader'
import DataTable from '../../../components/elements/DataTable'
import { tableHeadersFields } from '../../../utils'
import EmptyState from '../../../components/elements/EmptyState'
import ModalDialog from '../../../components/layouts/ModalDialog'
import NewInvoice from '../../../components/elements/invoices/NewInvoice'

const Invoices = () => {
  const dispatch = useDispatch()
  const invoicesSelector = useSelector(state => state.invoices)
  const [perPage, setPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)

  const updatePerPage = (count) => {
      setPerPage(count)
  }

  const updateCurrentPage = (count) => {
      setCurrentPage(count)
  }

  // eslint-disable-next-line no-unused-vars
  const [activeFilters, setActiveFilters] = useState('');

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

  useEffect(() => {
    dispatch(fetchInvoices(activeFilters, currentPage, perPage))
    if(invoicesSelector.createdInvoice && invoicesSelector.createdInvoice !== null){
      dispatch(clearCreatedInvoice())
      dispatch({
        type: SET_SUCCESS,
        payload: 'New invoice created successfully'
      })
      setCreatingInvoice(false)
    }
  }, [perPage, currentPage, dispatch, activeFilters, invoicesSelector.createdInvoice])

  const columnWidths = {
    name: 'w-3/12',
    emailAddress: 'w-3/12',
    phoneNumber: 'w-3/12',
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
            name: item.name,
            emailAddress:item.emailAddress,
            phoneNumber: item.phoneNumber,
            transactions: <p className='text-[13px] font-host-grotesk font-[500]'>₦0 <span className='font-poppins font-[400] text-xs'>(0 transactions)</span></p>,
            dateCreated: `${new Date(item.createdAt).toDateString()} - ${new Date(item.createdAt).toLocaleTimeString()}`,
          },
        )
      })
    return data
  }

  const [creatingInvoice, setCreatingInvoice] = useState(false);


  return (
    <>
      <MerchantLayout>
        <div className="w-full">
          <div className='py-3 mb-1'>
            <div className="w-full mx-auto">
              <div className='w-full lg:flex items-center justify-between'>
                <div className='w-full xl:w-2/3'>
                  <h4 className='font-medium text-lg mb-1 text-gray-400'>Invoices</h4>
                  <div className=''>
                    <p className='text-gray-500 mt-1 text-[13px]'>
                      Here's a list of invoices you've created on Sufpay. You can create a new invoice by clicking on "Create Invoice" and the invoice will be sent to your customer, and then they can click and pay through it. Click on an invoice listed below to see more details.
                    </p>
                  </div>
                </div>
                <button onClick={()=>{setCreatingInvoice(true)}} className='rounded-[8px] px-4 py-3 mt-4 text-sm text-gray-100 bg-sufpay-black transition duration-200 border border-sufpay-black hover:bg-accent hover:text-sufpay-black flex items-center justify-center gap-x-2'>
                  Create new invoice
                </button>
              </div>

                <div className='w-full flex items-center justify-between mt-5 mb-2 p-2 rounded-md border'>
                  <div className='w-full'>
                    <Filters filterOptions={filters} />
                  </div>
                  <div className='w-full flex flex-row-reverse gap-x-2'>
                    <button onClick={()=>{}} className={`text-gray-700 px-3 py-2 hover:bg-gray-100 transition duration-200 text-sm flex items-center justify-center gap-x-2 bg-gray-200 rounded border`}>
                      <ArrowUpTrayIcon className={`w-5 h-5`} />
                      Export <span className='hidden xl:inline-block'>Invoices</span>
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
            {invoicesSelector.loadingInvoices
              ? 
                  <div className='w-full'>
                      <Loader />
                  </div>
              : 
              <>
                  {invoicesSelector?.invoices?.length > 0 ? <DataTable
                      tableHeaders={tableHeadersFields(cleanupData(invoicesSelector?.invoices)[0])?.headers} 
                      tableData={cleanupData(invoicesSelector?.invoices)} 
                      columnWidths={columnWidths}
                      columnDataStyles={{}}
                      allFields={tableHeadersFields(cleanupData(invoicesSelector?.invoices)[0]).fields}
                      onSelectItems={()=>{}}
                      tableOptions={tableOptions}
                      pagination={{
                          perPage, 
                          currentPage,
                          totalItems: invoicesSelector?.invoices.total,
                      }}
                      changePage={updateCurrentPage}
                      updatePerPage={updatePerPage}
                  /> :
                    <EmptyState emptyStateText={`No invoices on your account yet`} />
                  }
              </>
            }
          </div>
        </div>
      </MerchantLayout>

      <ModalDialog
        shown={creatingInvoice} 
        closeFunction={()=>{setCreatingInvoice(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel={``}
        dialogTitle='Create a new invoice'
        maxWidthClass='max-w-4xl'
        hideActions={true}
      >
        <NewInvoice />
      </ModalDialog>
    </>
  )
}

export default Invoices
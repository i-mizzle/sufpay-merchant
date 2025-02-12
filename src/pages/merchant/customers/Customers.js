import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatedCustomer, fetchCustomers } from '../../../store/actions/customersActions'
import Filters from '../../../components/elements/Filters'
import ArrowUpTrayIcon from '../../../components/elements/icons/ArrowUpTrayIcon'
import Loader from '../../../components/elements/Loader'
import DataTable from '../../../components/elements/DataTable'
import { tableHeadersFields } from '../../../utils'
import EmptyState from '../../../components/elements/EmptyState'
import ModalDialog from '../../../components/layouts/ModalDialog'
import NewCustomer from '../../../components/elements/customers/NewCustomer'
import { SET_SUCCESS } from '../../../store/types'

const Customers = () => {
  const dispatch = useDispatch()
  const customersSelector = useSelector(state => state.customers)
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
    dispatch(fetchCustomers(activeFilters, currentPage, perPage))
    if(customersSelector.createdCustomer && customersSelector.createdCustomer !== null){
      dispatch(clearCreatedCustomer())
      dispatch({
        type: SET_SUCCESS,
        payload: 'New customer created successfully'
      })
      setCreatingCustomer(false)
    }
  }, [perPage, currentPage, dispatch, activeFilters, customersSelector.createdCustomer])

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

  const [creatingCustomer, setCreatingCustomer] = useState(false);


  return (
    <>
      <MerchantLayout>
        <div className="w-full">
          <div className='py-3 mb-1'>
            <div className="w-full mx-auto">
              <div className='w-full lg:flex items-center justify-between'>
                <div className='w-full xl:w-2/3'>
                  <h4 className='font-medium text-lg mb-1 text-gray-400'>Customers</h4>
                  <div className=''>
                    <p className='text-gray-500 mt-1 text-[13px]'>
                      Your customers on Sufpay. You can create a new customer by clicking on "Create Customer" or click on a customer listed below to see more details.
                    </p>
                  </div>
                </div>
                <button onClick={()=>{setCreatingCustomer(true)}} className='rounded-[8px] px-4 py-3 mt-4 text-sm text-gray-100 bg-sufpay-black transition duration-200 border border-sufpay-black hover:bg-accent hover:text-sufpay-black flex items-center justify-center gap-x-2'>
                  Create a customer
                </button>
              </div>

                <div className='w-full flex items-center justify-between mt-5 mb-2 p-2 rounded-md border'>
                  <div className='w-full'>
                    <Filters filterOptions={filters} />
                  </div>
                  <div className='w-full flex flex-row-reverse gap-x-2'>
                    <button onClick={()=>{}} className={`text-gray-700 px-3 py-2 hover:bg-gray-100 transition duration-200 text-sm flex items-center justify-center gap-x-2 bg-gray-200 rounded border`}>
                      <ArrowUpTrayIcon className={`w-5 h-5`} />
                      Export customers
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
            {customersSelector.loadingCustomers
              ? 
                  <div className='w-full'>
                      <Loader />
                  </div>
              : 
              <>
                  {customersSelector?.customers?.length > 0 ? 
                    <>
                      <div className='hidden lg:block'>
                        <DataTable
                            tableHeaders={tableHeadersFields(cleanupData(customersSelector?.customers)[0])?.headers} 
                            tableData={cleanupData(customersSelector?.customers)} 
                            columnWidths={columnWidths}
                            columnDataStyles={{}}
                            allFields={tableHeadersFields(cleanupData(customersSelector?.customers)[0]).fields}
                            onSelectItems={()=>{}}
                            tableOptions={tableOptions}
                            pagination={{
                                perPage, 
                                currentPage,
                                totalItems: customersSelector.customers.total,
                            }}
                            changePage={updateCurrentPage}
                            updatePerPage={updatePerPage}
                        /> 
                      </div>

                      <div className='lg:hidden'>
                          {customersSelector?.customers?.map((customer, customerIndex)=>(
                            <div key={customerIndex} className='mb-[15px] w-full p-[15px] border rounded shadow-xl shadow-black/5'>
                              <h3 className='mb-[5px] '>{customer.name}</h3>
                              <p className='text-xs text-gray-500'>{customer.emailAddress}, {customer.phoneNumber}</p>
                              <p className='text-[13px] font-host-grotesk mt-[10px] font-[500]'>₦0 <span className='font-poppins font-[400] text-xs'>(0 transactions)</span></p>
                              <p className='text-[10px] text-gray-400 mt-[5px]'>Created {new Date(customer.createdAt).toDateString()} - {new Date(customer.createdAt).toLocaleTimeString()}</p>
                            </div>
                          ))}
                      </div>
                    </>
                  :
                    <EmptyState emptyStateText={`No customers on your account yet`} />
                  }
              </>
            }
          </div>
        </div>
      </MerchantLayout>

      <ModalDialog
        shown={creatingCustomer} 
        closeFunction={()=>{setCreatingCustomer(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel={``}
        dialogTitle='Create a new customer for your business'
        maxWidthClass='max-w-lg'
        hideActions={true}
      >
        <NewCustomer />
      </ModalDialog>
    </>
  )
}

export default Customers
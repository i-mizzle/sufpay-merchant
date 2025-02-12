import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import ModalDialog from '../../../components/layouts/ModalDialog'
import EmptyState from '../../../components/elements/EmptyState'
import { tableHeadersFields } from '../../../utils'
import DataTable from '../../../components/elements/DataTable'
import Loader from '../../../components/elements/Loader'
import ArrowUpTrayIcon from '../../../components/elements/icons/ArrowUpTrayIcon'
import Filters from '../../../components/elements/Filters'
import { SET_SUCCESS } from '../../../store/types'
import { useDispatch, useSelector } from 'react-redux'
import NewSubAccount from '../../../components/elements/sub-accounts/NewSubAccount'
import { clearCreatedSubAccount } from '../../../store/actions/subaccountActions'

const SubAccounts = () => {
  const dispatch = useDispatch()
  const subAccountsSelector = useSelector(state => state.subAccounts)
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
    // dispatch(fetchCustomers(activeFilters, currentPage, perPage))
    if(subAccountsSelector.createdSubAccount && subAccountsSelector.createdSubAccount !== null){
      dispatch(clearCreatedSubAccount())
      dispatch({
        type: SET_SUCCESS,
        payload: 'New sub-account created successfully'
      })
      setCreatingCustomer(false)
    }
  }, [perPage, currentPage, dispatch, activeFilters, subAccountsSelector.createdSubAccount])

  const columnWidths = {
    reference: 'w-2/12',
    paymentFor: 'w-3/12',
    status: 'w-1/12',
    paidBy: 'w-2/12',
    amount: 'w-1/12',
    timeStamp: 'w-2/12',
    '': 'w-1/12'
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
            // reference: <TransactionLink reference={item.transaction.transactionReference} index={itemIndex} />,
            // paymentFor: <p>{item.fee?.name}: {item.application?.applicationCode}</p>,
            // status: <Status status={item.transaction.status} />,
            // paidBy: <div><p>{item.createdBy.name}</p><p className='text-sm text-gray-500 number'>
            //     {item.createdBy.email}
            // </p></div>,
            // amount: <TransactionAmount amount={item.fee.amount ?  item.fee.amount : 0} />,
            // timeStamp: `${new Date(item.createdAt).toDateString()} - ${new Date(item.createdAt).toLocaleTimeString()}`,
            // '': item.applied ? 
            // <> 
            //     <span className={`inline-block text-xs px-2 py-1 rounded bg-gray-600 text-gray-500 bg-opacity-10 font-outfit capitalize`}>Used</span>
            // </> 
            // : 
          // <>
            //     <span className={`inline-block text-xs px-2 py-1 rounded bg-green-500 text-green-800 bg-opacity-10 font-outfit capitalize`}>Unused</span>
            // </>
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
          <div className='py-3 mb-5'>
            <div className="w-full mx-auto">
              <div className='w-full flex items-center justify-between'>
                <div className='w-2/3'>
                  <h4 className='font-medium text-lg mb-1 text-gray-400'>Sub-accounts</h4>
                  <div className=''>
                    <p className='text-gray-500 mt-1 text-[13px]'>
                      Your Sufpay Sub-accounts.<br/> 
                      Sub-accounts are a great way to manage payment slips on sufpay as needed. You can create a new sub-account by clicking on "Create Sub-account" or click on a sub-account listed below to see more details and payouts.
                    </p>
                  </div>
                </div>
                <button onClick={()=>{setCreatingCustomer(true)}} className='rounded-[8px] px-4 py-3 mt-4 text-sm text-gray-100 bg-sufpay-black transition duration-200 border border-sufpay-black hover:bg-accent hover:text-sufpay-black flex items-center justify-center gap-x-2'>
                  Create new sub-account
                </button>
              </div>

                <div className='w-full flex items-center justify-between my-5 p-2 rounded-md border'>
                  <div className='w-full'>
                    <Filters filterOptions={filters} />
                  </div>
                  <div className='w-full flex flex-row-reverse gap-x-2'>
                    <button onClick={()=>{}} className={`text-gray-700 px-3 py-2 hover:bg-gray-100 transition duration-200 text-sm flex items-center justify-center gap-x-2 bg-gray-200 rounded border`}>
                      <ArrowUpTrayIcon className={`w-5 h-5`} />
                      Export Sub-accounts
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

          {/* <div className=''>
            {subAccountsSelector.loadingCustomers
              ? 
                  <div className='w-full'>
                      <Loader />
                  </div>
              : 
              <>
                  {subAccountsSelector?.subAccounts?.length > 0 ? <DataTable
                      tableHeaders={tableHeadersFields(cleanupData(subAccountsSelector?.subAccounts)[0])?.headers} 
                      tableData={cleanupData(subAccountsSelector?.subAccounts)} 
                      columnWidths={columnWidths}
                      columnDataStyles={{}}
                      allFields={tableHeadersFields(cleanupData(subAccountsSelector?.subAccounts)[0]).fields}
                      onSelectItems={()=>{}}
                      tableOptions={tableOptions}
                      pagination={{
                          perPage, 
                          currentPage,
                          totalItems: subAccountsSelector.subAccounts.total,
                      }}
                      changePage={updateCurrentPage}
                      updatePerPage={updatePerPage}
                  /> :
                    <EmptyState emptyStateText={`No sub-accounts on your account yet`} />
                  }
              </>
            }
          </div> */}
          <EmptyState emptyStateText={`No sub-accounts on your account yet`} />
        </div>
      </MerchantLayout>

      <ModalDialog
        shown={creatingCustomer} 
        closeFunction={()=>{setCreatingCustomer(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel={``}
        dialogTitle='Create a new sub-account for your business'
        maxWidthClass='max-w-lg'
        hideActions={true}
      >
        <NewSubAccount />
      </ModalDialog>
    </>
  )
}

export default SubAccounts
import React, { useEffect, useState } from 'react'
import MerchantLayout from '../../../components/layouts/MerchantLayout'
import Status from '../../../components/elements/Status'
import ModalDialog from '../../../components/layouts/ModalDialog'
import { useDispatch, useSelector } from 'react-redux'
import { tableHeadersFields, transactionTimeStamp } from '../../../utils'
import UserIcon from '../../../components/elements/icons/UserIcon'
import ArrowIcon from '../../../components/elements/icons/ArrowIcon'
import { Link } from 'react-router-dom'
import Loader from '../../../components/elements/Loader'
import DataTable from '../../../components/elements/DataTable'
import ArrowUpTrayIcon from '../../../components/elements/icons/ArrowUpTrayIcon'
import Filters from '../../../components/elements/Filters'
import { fetchTransactions } from '../../../store/actions/transactionsActions'
import EmptyState from '../../../components/elements/EmptyState'

const Transactions = () => {
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false)
  const [activeDialogTransaction, setActiveDialogTransaction] = useState(null)
  const transactionsSelector = useSelector((state => state.transactions))
  const dispatch = useDispatch()

  const [perPage, setPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)

  const updatePerPage = (count) => {
      setPerPage(count)
  }

  const updateCurrentPage = (count) => {
      setCurrentPage(count)
  }


  useEffect(() => {
    dispatch(fetchTransactions('', currentPage, perPage))
  }, [perPage, currentPage, dispatch])

  const TransactionLink = ({reference, index}) => {
      return (
          <button className='text-gray-500 font-medium text-[13px] truncate text-left w-[160px]' onClick={() => {openTransaction(index)}}>{reference}</button>
      )
  }
  
  const TransactionAmount = ({amount}) => {
      return (<p className="font-medium">N {(amount/100).toLocaleString() || 0}</p>)
  }

  const transactionColumnWidths = {
      reference: 'w-2/12',
      paymentFor: 'w-2/12',
      status: 'w-1/12',
      paidBy: 'w-2/12',
      amount: 'w-2/12',
      type: 'w-1/12',
      timeStamp: 'w-2/12',
  }

  const cleanupData = (dataSet) => {
        if(!dataSet) return
        const data = []
        console.log('data to clean --> ', dataSet)
        const rawData = dataSet.data || dataSet
        rawData.forEach((item, itemIndex) => {
            data.push(
                {
                    reference: <TransactionLink reference={item.uniqueTransactionRef} index={itemIndex} />,
                    paymentFor: <p>{item.invoiceId ? 'Invoice' : item.paymentPageId ? 'Payment page' : ''}</p>,
                    status: <Status status={item.status} />,
                    paidBy: item.customerEmailAddress,
                    type: item.paymentType,
                    amount: <TransactionAmount amount={item.totalAmount} />,
                    timeStamp: `${new Date(item.createdAt).toDateString()} - ${new Date(item.createdAt).toLocaleTimeString()}`,
                },
            )
        })
    
        return data
  }

  const openTransaction = (transactionIndex) => {
      setTransactionDialogOpen(true)
      setActiveDialogTransaction(transactionIndex)
      console.log(transactionDialogOpen)
      console.log(activeDialogTransaction)
  }

  // const closeTransaction = () => {
  //     setTransactionDialogOpen(false)
  //     setActiveDialogTransaction(null)
  // }
  
  const tableOptions = {
      selectable: false,
      clickableRows: true,
      rowAction: (index)=>{openTransaction(index)}
  }

  const columnDataStyles = {}

  // eslint-disable-next-line no-unused-vars
  const [selectedUsersCount, setSelectedUsersCount] = useState(0)

  const getSelectionCount = (count) => {
      return setSelectedUsersCount(count)
  }

  // const [filtersActive, setFiltersActive] = useState(false)

  // const toggleFilters = () => {
  //     setFiltersActive(!filtersActive)
  // }

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

  // const initialFilters = [
  //     {
  //       field: 'description',
  //       operator: 'like',
  //       term: ''
  //     },
  //     {
  //       field: 'name',
  //       operator: 'like',
  //       term: ''
  //     },
  // ]

  // const [searchFilter, setSearchFilter] = useState(initialFilters)

  // const captureFilter = (filter) => {
  //   let tempFilters = [...searchFilter] 
  //   tempFilters.push(filter)     
  //   setSearchFilter(tempFilters)
  // } 

  // const [validatingPayment, setValidatingPayment] = useState(false);

  return (
      <>
        <MerchantLayout>
          <div className="w-full">
              <div className='py-3 mb-5'>
                  <div className="w-full mx-auto">
                      <div className='w-full flex items-center justify-between'>
                          <div className='w-full xl:w-2/3'>
                              <h4 className='font-medium text-lg mb-1 text-gray-400'>Transactions</h4>
                              <div className=''>
                                  <p className='text-gray-500 mt-1 text-[13px]'>
                                      Below is a list of transactions on your account
                                  </p>
                              </div>
                          </div>
                          {/* <button onClick={()=>{setValidatingPayment(true)}} className='rounded px-4 py-3 mt-4 text-sm text-purple-100 bg-vcm-purple transition duration-200 border border-vcm-purple hover:bg-vcm-light-purple hover:text-vcm-purple flex items-center justify-center gap-x-2'>
                              Record/Validate a payment
                          </button> */}
                      </div>

                      <div className='w-full flex items-center justify-between my-5 p-2 rounded-md border'>
                          <div className='w-full'>
                              <Filters filterOptions={filters} />
                          </div>
                          <div className='w-full flex flex-row-reverse gap-x-2'>
                              <button onClick={()=>{}} className={`text-gray-700 px-3 py-2 hover:bg-gray-100 transition duration-200 text-sm flex items-center justify-center gap-x-2 bg-gray-200 rounded border`}>
                                  <ArrowUpTrayIcon className={`w-5 h-5`} />
                                  Export transactions
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
                  {transactionsSelector.loadingTransactions 
                      ? 
                          <div className='w-full'>
                              <Loader />
                          </div>
                      : 
                        <>
                            {transactionsSelector?.transactions?.data?.length > 0 ? <DataTable
                                tableHeaders={tableHeadersFields(cleanupData(transactionsSelector.transactions.data)[0])?.headers} 
                                tableData={cleanupData(transactionsSelector?.transactions?.data)} 
                                columnWidths={transactionColumnWidths}
                                columnDataStyles={columnDataStyles}
                                allFields={tableHeadersFields(cleanupData(transactionsSelector.transactions)[0]).fields}
                                onSelectItems={getSelectionCount}
                                tableOptions={tableOptions}
                                pagination={{
                                    perPage, 
                                    currentPage,
                                    totalItems: transactionsSelector?.transactions?.total || 0,
                                }}
                                changePage={updateCurrentPage}
                                updatePerPage={updatePerPage}
                            />
                            :
                                <EmptyState emptyStateText={`No transactions on your account yet`} />

                            }
                        </>
                  }
              </div>
          </div>
        </MerchantLayout>

          {/* <Transition appear show={transactionDialogOpen} as={Fragment}> */}
          {activeDialogTransaction && <ModalDialog
              shown={transactionDialogOpen} 
              closeFunction={()=>{setTransactionDialogOpen(false)}} 
              actionFunction={()=>{}} 
              dialogTitle='Transaction Details'
              maxWidthClass='max-w-md'
          >
              <div className="mt-2">
                  <div className='w-full flex flex-row justify-between py-3 border-b border-secondary'>
                      <div className="w-1/2">
                          <label className='text-xs block mb-3 text-opacity-40'>Reference</label>
                          <p className="text-xs font-medium">
                              {transactionsSelector?.payments?.payments[activeDialogTransaction]?.transaction?.transactionReference}
                          </p>
                      </div>
                      <div className="w-1/2"> 
                          <label className='text-xs block mb-2 text-opacity-40'>Status</label>
                          <div className='flex flex-row items-center gap-x-2'>
                              <Status status={transactionsSelector?.payments?.payments[activeDialogTransaction]?.transaction?.status} />
                          </div>
                      </div>
                  </div>

                  <div className='w-full flex flex-row py-3 border-b border-secondary'>
                      <div className="w-1/2">
                          <label className='text-xs block mb-3 text-opacity-40'>Time stamp</label>
                          <p className="text-xs font-medium">
                          {transactionTimeStamp(transactionsSelector?.payments?.payments[activeDialogTransaction]?.createdAt)?.date} - {transactionTimeStamp(transactionsSelector.payments.payments[activeDialogTransaction]?.createdAt).time}
                          </p>
                      </div>
                      <div className="w-1/2">
                          <label className='text-xs block mb-2 text-opacity-40'>Amount</label>
                          <p className="font-medium text-xl text-gray-700">N {transactionsSelector?.payments?.payments[activeDialogTransaction]?.fee?.amount ? (transactionsSelector?.payments?.payments[activeDialogTransaction]?.fee?.amount/100)?.toLocaleString() : 0 }</p>
                      </div>
                  </div>

                  <div className='w-full flex flex-row py-3 border-b border-secondary'>
                      <div className="w-1/2">
                          <label className='text-xs block mb-3 text-opacity-40'>Payment for</label>
                          <p className="text-xs font-medium">
                           {transactionsSelector?.payments?.payments[activeDialogTransaction]?.fee.name}
                          </p>
                      </div>
                      <div className="w-1/2">
                          <label className='text-xs block mb-2 text-opacity-40'>Item</label>
                          <p className="font-medium text-sm">{transactionsSelector?.payments?.payments[activeDialogTransaction]?.application?.applicationCode }</p>
                          <Link to={`/admin/applications/${transactionsSelector?.payments?.payments[activeDialogTransaction]?.application?._id}`}>
                              <button className='text-xs flex flex-row items-center gap-x-3 mt-1 text-vcm-purple hover:text-gray-400 transition duration-200'>See application details <ArrowIcon className={`w-5 h-5`} /></button> 
                          </Link>
                      </div>
                  </div>

                  <div className='w-full border-b border-secondary py-3'>
                      <label className='text-xs block mb-3 text-opacity-40'>Transaction initiated by</label>
                      <div className="w-full flex flex-row items-center gap-3">
                          <div className="p-2 rounded-md text-gray-500 inline-block">
                              <UserIcon  className="w-10 h-10"/>
                          </div>
                          <div>
                              <p className="text-sm mb-2 font-bold">{transactionsSelector?.payments?.payments[activeDialogTransaction]?.createdBy?.name}</p>
                              <p className="text-xs font-medium">{transactionsSelector?.payments?.payments[activeDialogTransaction]?.createdBy?.email}</p>
                          </div>
                      </div>
                  </div>
              </div>

          </ModalDialog>}

          {/* <ModalDialog
              shown={validatingPayment} 
              closeFunction={()=>{setValidatingPayment(false)}} 
              actionFunction={()=>{}} 
              actionFunctionLabel={``}
              dialogTitle='Manually Validate a Payment'
              maxWidthClass='max-w-lg'
              hideActions={true}
          >
              <ValidatePayment 
                  closeFunction={()=>(setValidatingPayment(false))}
                  reload={()=>{setReload(reload+1)}}
              />
          </ModalDialog> */}
      </>
  )
}

export default Transactions
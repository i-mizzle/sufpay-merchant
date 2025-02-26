import React, { useEffect, useState } from 'react'
import EmptyState from '../../../components/elements/EmptyState'
import ModalDialog from '../../../components/layouts/ModalDialog';
import NewTeammate from '../../../components/elements/settings/NewTeammate';
import { useDispatch, useSelector } from 'react-redux';
import { clearCreatedTeammate, fetchTeammates } from '../../../store/actions/teamActions';
import { SET_SUCCESS, TEAMMATES_ERROR } from '../../../store/types';
import Loader from '../../../components/elements/Loader';
import DataTable from '../../../components/elements/DataTable';
import { authHeader, tableHeadersFields, activeBusiness } from '../../../utils';
import axios from 'axios';
import TrashIcon from '../../../components/elements/icons/TrashIcon';
import ArrowPathIcon from '../../../components/elements/icons/ArrowPathIcon';

const Team = () => {
  const [invitingTeamMate, setInvitingTeamMate] = useState(false);
  const dispatch = useDispatch()
  const teamSelector = useSelector(state => state.team)
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [pendingInvites, setPendingInvites] = useState([]);

  useEffect(() => {
    // dispatch(fetchPendingInvites())
    dispatch(fetchTeammates(page, perPage))

    const fetchPendingInvites = async () => {    
      try{
        const headers = authHeader()

        let url = `${process.env.REACT_APP_BASE_URL}/authentication/invites/get/biller/${activeBusiness().id}?status=PENDING`
        const response = await axios.get(url, { headers })
        console.log('pending fetched')
        setPendingInvites(response.data.data)
      }
      catch(error){
        dispatch( {
            type: TEAMMATES_ERROR,
            error
        })
      }
    }

    fetchPendingInvites()

    if(teamSelector.invitedTeammate) {
      dispatch({
        type: SET_SUCCESS,
        payload: teamSelector.invitedTeammate.message
      })
      dispatch(clearCreatedTeammate())
      setInvitingTeamMate(false)
    }

    return () => {
      
    };

  }, [dispatch, page, perPage, teamSelector.invitedTeammate]);

  const tableOptions = {
    selectable: false,
    clickableRows: true,
    rowAction: (index)=>{}
  }

  const columnDataStyles = {}

  const columnWidths = {
    emailAddress: 'w-4/12',
    name: 'w-4/12',
    phoneNumber: 'w-4/12',
    joinDate: 'w-4/12',
  }

  const cleanupData = (dataSet) => {
    if(!dataSet) return
    const data = []
    const rawData = dataSet.data || dataSet
    rawData.forEach((item, itemIndex) => {
      data.push({
        emailAddress: item.emailAddress,
        name: <p>{item.firstName} {item.lastName}</p>,
        phoneNumber: item.phoneNumber,
        joinDate: `${new Date(item.createdAt).toDateString()} - ${new Date(item.createdAt).toLocaleTimeString()}`,
      })
    })

    return data
  }

  return (
    <>
      <div className='w-full'>
        <div className='w-full flex items-start justify-between'>
          <div className='w-1/2'>
            <h3 className='text-sufpay-black font-[550] tracking-tight text-2xl'>Your Team on Sufpay</h3>
            <p className='text-[13px] text-sufpay-gray mt-[10px]'>
              A list of your team mates on Sufpay. You can add new team members by using the "Invite Teammate" button.
            </p>
          </div> 
          <button onClick={()=>{setInvitingTeamMate(true)}} className='rounded-[8px] px-4 py-3 mt-4 text-sm text-gray-100 bg-sufpay-black transition duration-200 border border-sufpay-black hover:bg-accent hover:text-sufpay-black flex items-center justify-center gap-x-2'>
            Invite Teammate
          </button>
        </div>

        {pendingInvites?.length > 0 && <div className='mt-[50px]'>
            <h3 className='text-sufpay-black font-[550] tracking-tight text-lg'>Pending Invitations</h3>
            <p className='text-[12px] text-sufpay-gray mt-[10px] mb-[20px]'>
              These invitations have not been accepted yet
            </p>

            <div className='w-full grid grid-cols-3 gap-[10px]'>
              {pendingInvites.map((invite, inviteIndex) => (
                <div key={inviteIndex} className='w-full bg-gray-50 p-[15px] rounded flex items-center justify-between'>
                  <div className='w-full'>
                    <p className='font-[500] text-[13px]'>{invite.emailAddress}</p>
                    <p className='font-[400] text-[11px]'>{new Date(invite.createdAt).toDateString()}</p>
                  </div>
                  <div className='w-[100px] h-full flex flex-row-reverse items-center justify-center'>
                    <button className='p-[5px] rounded bg-transparent hover:bg-gray-200 transition duration-200 hover:text-red-500'>
                      <TrashIcon className={`w-4 h-4`} />
                    </button>
                    <button className='p-[5px] rounded bg-transparent hover:bg-gray-200 transition duration-200'>
                      <ArrowPathIcon className={`w-4 h-4`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }

        <div className='mt-[50px]'>
          {teamSelector.loadingTeammates 
            ? 
              <div className='w-full'>
                  <Loader />
              </div>
            : 
            <>
                {teamSelector?.teammates?.data?.length > 0 ? <DataTable
                    tableHeaders={tableHeadersFields(cleanupData(teamSelector?.teammates?.data)[0])?.headers} 
                    tableData={cleanupData(teamSelector?.teammates?.data)} 
                    columnWidths={columnWidths}
                    columnDataStyles={columnDataStyles}
                    allFields={tableHeadersFields(cleanupData(teamSelector?.teammates?.data)[0]).fields}
                    onSelectItems={()=>{}}
                    tableOptions={tableOptions}
                    pagination={{
                        perPage, 
                        currentPage: page,
                        totalItems: teamSelector?.teammates?.count || 0,
                    }}
                    changePage={(page)=>{setPage(page)}}
                    updatePerPage={(perPage)=>{setPerPage(perPage)}}
                />
                :
                    <EmptyState emptyStateText={`No members of your team have been enrolled on Sufpay yet`} />

                }
            </>
          }
        </div>
      </div>

      <ModalDialog
        shown={invitingTeamMate} 
        closeFunction={()=>{setInvitingTeamMate(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel={``}
        dialogTitle='Invite a new member of your team'
        maxWidthClass='max-w-lg'
        hideActions={true}
      >
        <NewTeammate />
      </ModalDialog>
    </>
  )
}

export default Team
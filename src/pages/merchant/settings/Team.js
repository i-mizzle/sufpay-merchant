import React, { useState } from 'react'
import EmptyState from '../../../components/elements/EmptyState'
import ModalDialog from '../../../components/layouts/ModalDialog';
import NewTeammate from '../../../components/elements/settings/NewTeammate';

const Team = () => {
  const [invitingTeamMate, setInvitingTeamMate] = useState(false);
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

        <div className='mt-[100px]'>
          <EmptyState emptyStateText={`No members of your team have been enrolled on Sufpay yet`} />
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
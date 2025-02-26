import React from 'react'
import { userDetails } from '../../../utils'
import TextField from '../../../components/elements/form/TextField'

const UserProfile = () => {
  const user = userDetails()
  return (
    <div className='w-full'>
      <div className='w-1/2'>
        <h3 className='text-sufpay-black font-[550] tracking-tight text-2xl'>Your Profile</h3>
        <p className='text-[13px] text-sufpay-gray mt-[10px]'>
          Your user profile information on Sufpay.
        </p>

        <div className='w-full mt-[20px]'>
          <div className='w-full'>
            <TextField
              inputLabel="First Name" 
              fieldId="business-name" 
              inputType="text" 
              preloadValue={user.firstName || ''}
              inputPlaceholder={'Registration number on your CAC certificate'}
              hasError={false} 
              disabled={true}
              returnFieldValue={(value)=>{}}
            />
          </div>
          <div className='w-full mt-4'>
            <TextField
              inputLabel="Last Name" 
              fieldId="last-name" 
              inputType="text" 
              preloadValue={user.lastName || ''}
              inputPlaceholder={'Registration number on your CAC certificate'}
              hasError={false} 
              disabled={true}
              returnFieldValue={(value)=>{}}
            />
          </div>
          <div className='w-full mt-4'>
            <TextField
              inputLabel="Email address" 
              fieldId="email" 
              inputType="text" 
              preloadValue={user.emailAddress || ''}
              inputPlaceholder={'Registration number on your CAC certificate'}
              hasError={false} 
              disabled={true}
              returnFieldValue={(value)=>{}}
            />
          </div>
          <div className='w-full mt-4'>
            <TextField
              inputLabel="Phone number" 
              fieldId="email" 
              inputType="text" 
              preloadValue={user.phoneNumber || ''}
              inputPlaceholder={'Registration number on your CAC certificate'}
              hasError={false} 
              disabled={true}
              returnFieldValue={(value)=>{}}
            />
          </div>
        </div>
      </div>    
    </div>
  )
}

export default UserProfile
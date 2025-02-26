import React, { useEffect, useState } from 'react'
import TextField from '../form/TextField'
import FormButton from '../form/FormButton'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR } from '../../../store/types'
import { activeBusiness, userDetails } from '../../../utils'
import { inviteTeammate } from '../../../store/actions/teamActions'

const NewTeammate = () => {
    const dispatch = useDispatch()
    const teamSelector = useSelector(state => state.team)
    useEffect(() => {
        console.log(userDetails())
        return () => {
            
        };
    }, []);

    const [validationErrors, setValidationErrors] = useState();
    const [teammatePayload, setTeammatePayload] = useState({});

    const validateForm = () => {
        let errors = {}
        
        if(!teammatePayload.emailAddress || teammatePayload.emailAddress === '') {
            errors.emailAddress = true
        }
        
        setValidationErrors(errors)

        return errors
    }

    
    const pushInvitation = () => {
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
            emailAddress: teammatePayload.emailAddress,
            role: "BILLER_USER",
            billerId: activeBusiness().id,
            billerName: activeBusiness().name,
            userId: userDetails().id
        }

        dispatch(inviteTeammate(payload))

    }
    return (
        <div className='w-full'>
            <p className='text-[13px] text-gray-500'>Fill in the following information to create a customer for your business.</p>

            <div className='mt-4'>
                <TextField
                    inputLabel="Teammate email address" 
                    fieldId="customer-email" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={`Valid Email address`}
                    hasError={validationErrors && validationErrors.emailAddress} 
                    returnFieldValue={(value)=>{setTeammatePayload({...teammatePayload, ...{emailAddress: value}})}}
                />
            </div>
            {/* <div className='mt-4'>
                <TextField
                    inputLabel="Customer phone number" 
                    fieldId="customer-phone" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={`Active phone number`}
                    hasError={validationErrors && validationErrors.phoneNumber} 
                    returnFieldValue={(value)=>{setCustomerPayload({...customerPayload, ...{phoneNumber: value}})}}
                />
            </div> */}
            <div className='mt-5'>
                <FormButton buttonLabel={`Invite Teammate`} buttonAction={()=>{pushInvitation()}} processing={teamSelector.invitingTeammate} />
            </div>
        </div>
    )
}

export default NewTeammate
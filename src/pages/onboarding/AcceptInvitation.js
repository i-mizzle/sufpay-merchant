import React, { useEffect, useState } from 'react'
import Logo from '../../components/elements/Logo'
import Loader from '../../components/elements/Loader';
import TextField from '../../components/elements/form/TextField';
import FormButton from '../../components/elements/form/FormButton';

const AcceptInvitation = () => {
  const [loading, setLoading] = useState(true);
  const [invitationDetails, setInvitationDetails] = useState(null);
  useEffect(() => {
    
    return () => {
      
    };
  }, []);
  const [processing, setProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [userPayload, setUserPayload] = useState({});

  return (
    <div className='h-screen w-full hidden xl:block bg-primary py-[20px] px-[50px] relative'>
      <div className='mx-auto w-11/12 lg:w-1/2 xl:w-4/12'>
        <Logo color={`#fff`} size={`150px`} />
        <div className='mt-[20px] w-full bg-white rounded-[10px] p-[20px] min-h-[400px] h-inherit'>
          {loading ? 
            <div className='w-full'>
              <Loader preloadingText={`Fetching your invitation...`} /> 
            </div>
            :
            <>
            <h3 className="mt-[10px] text-sufpay-black text-[15px] text-">Your Information.</h3>

              <div className='mt-2 w-full'>
                <TextField
                  inputLabel="First name" 
                  fieldId="fname" 
                  inputType="text" 
                  preloadValue={''}
                  inputPlaceholder={`Your first name`}
                  hasError={validationErrors && validationErrors.firstName} 
                  returnFieldValue={(value)=>{setUserPayload({...userPayload, ...{firstName: value}})}}
                />
              </div>

              <div className='mt-2 w-full'>
                <TextField
                  inputLabel="Last name" 
                  fieldId="username" 
                  inputType="text" 
                  preloadValue={''}
                  inputPlaceholder={`Your surname`}
                  hasError={validationErrors && validationErrors.lastName} 
                  returnFieldValue={(value)=>{setUserPayload({...userPayload, ...{lastName: value}})}}
                />
              </div>
              <div className='w-full mt-4'>
                <TextField
                  inputLabel="Email address" 
                  fieldId="email" 
                  inputType="text" 
                  preloadValue={''}
                  inputPlaceholder={`An active email address`}
                  hasError={validationErrors && validationErrors.email} 
                  returnFieldValue={(value)=>{setUserPayload({...userPayload, ...{emailAddress: value}})}}
                />
              </div>

              <div className='w-full mt-4'>
                <TextField
                  inputLabel="Phone number" 
                  fieldId="phone" 
                  inputType="text" 
                  preloadValue={''}
                  inputPlaceholder={`An active phone number`}
                  hasError={validationErrors && validationErrors.phone} 
                  returnFieldValue={(value)=>{setUserPayload({...userPayload, ...{phoneNumber: value}})}}
                />
              </div>

              <div className='mt-5 mb-5'>
                  <FormButton buttonLabel={`Join your team`} buttonAction={()=>{}} processing={processing} />
              </div>
            </>
          }
        </div>
      </div>
      
    </div>

  )
}

export default AcceptInvitation
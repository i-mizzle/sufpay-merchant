import React, { useEffect, useState } from 'react'
import Logo from '../../components/elements/Logo'
import ChevronIcon from '../../components/elements/icons/ChevronIcon'
import TextField from '../../components/elements/form/TextField'
import FormButton from '../../components/elements/form/FormButton'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR } from '../../store/types'
import axios from 'axios'
import EnvelopeIcon from '../../components/elements/icons/EnvelopeIcon'
import PhoneIcon from '../../components/elements/icons/PhoneIcon'
import Twitter from '../../assets/img/twitter.svg'
import Linkedin from '../../assets/img/linkedin.svg'
import InlinePreloader from '../../components/elements/InlinePreloader'
import Countdown from '../../components/elements/Countdown'
import SuccessIcon from '../../assets/img/icons/success.svg'
import SelectField from '../../components/elements/form/SelectField'
import { fetchBillerCategories } from '../../store/actions/billerActions'

const Signup = () => {
  const dispatch = useDispatch()
  const billersSelector = useSelector(state => state.billers)

  const [validationErrors, setValidationErrors] = useState({});
  const [userPayload, setUserPayload] = useState({});

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    dispatch(fetchBillerCategories())
    return () => {
      
    };
  }, [dispatch]);

  const validateForm = () => {
    let errors = {}
    
    if(!userPayload.firstName || userPayload.firstName === '') {
        errors.firstName = true
    }
    
    if(!userPayload.lastName || userPayload.lastName === '') {
        errors.lastName = true
    }
    
    if(!userPayload.emailAddress || userPayload.emailAddress === '') {
        errors.email = true
    }

    if(!userPayload.phoneNumber || userPayload.phoneNumber === '') {
        errors.phone = true
    }

    if(!userPayload.billerName || userPayload.billerName === '') {
        errors.billerName = true
    }

    if(!userPayload.billerCategoryId || userPayload.billerCategoryId === '') {
        errors.billerCategory = true
    }

    setValidationErrors(errors)

    return errors
  }

  const [accountCreated, setAccountCreated] = useState(false);
  const [counted, setCounted] = useState(false);

  const signup = async  () => {
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (Object.values(validateForm()).includes(true)) {
      dispatch({
        type: ERROR,
        error: {response: {data: {
            message: 'Please check the highlighted fields'
        }}}
      })
      return
    }

    setProcessing(true)

    const requestPayload = {...userPayload, ...{
      corporate: true,
      role: 'BILLER'
    }}
    try {
        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/authentication/sign-up`, requestPayload, { headers })      
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_AUTH_PORT}/sign-up`, requestPayload, { headers })      
        console.log(response.data)
        setUserPayload({...userPayload, ...{userCode: response.data.userCode}})
        setAccountCreated(true)   
        setCounted(false)
        setProcessing(false)  

    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR,
            error
        })
        setProcessing(false)
    }
  }

  const resendConfirmationEmail = async  () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    
    if (Object.values(validateForm()).includes(true)) {
      dispatch({
        type: ERROR,
        error: {response: {data: {
            message: 'Please check the highlighted fields'
        }}}
      })
      return
    }

    setProcessing(true)

    const requestPayload = {userCode: userPayload.userCode}
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/authentication/access/resend/otp`, requestPayload, { headers })      
        setAccountCreated(true)   
        setCounted(false)
        setProcessing(false)  

    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR,
            error
        })
        setProcessing(false)
    }
  }

  return (
    <div className='w-full flex items-start min-h-screen justify-between'>
      <div className='h-screen w-1/3 bg-primary py-[20px] px-[50px] relative'>
        <Logo color={`#fff`} size={`150px`} />

        <div className='absolute left-[50px] bottom-[50px] w-[80%]'>
          <div className='mb-[20px]'>
            <h3 className='text-white font-[500] text-[15px]'>Checkouts</h3>
            <p className='text-[13px] text-white mt-[10px] text-opacity-80'>Power your business with the ability to collect payments online via multiple channels</p>
          </div>
          <div className='flex items-center gap-x-2 mb-[30px]'>
            <div className='w-[30px] h-[3px] bg-white' />
            <div className='w-[30px] h-[3px] bg-white bg-opacity-50' />
            <div className='w-[30px] h-[3px] bg-white bg-opacity-50' />
          </div>
          <div className='flex items-center gap-x-2 mb-[15px]'>
            <img alt='' src={Linkedin} className='w-[25px] opacity-50' />
            <img alt='' src={Twitter} className='w-[25px] opacity-50' />
          </div>
          <div className='flex items-center gap-x-[20px]'>
            <span className='flex items-center gap-x-[5px] text-xs text-gray-300'>
              <EnvelopeIcon className={`w-4 h-4`} />
              info@sufpay.com
            </span>
            <span className='flex items-center gap-x-[5px] text-xs text-gray-300'>
              <PhoneIcon className={`w-4 h-4`} />
              +234 804 234 5432
            </span>
          </div>
        </div>
      </div>
      <div className='h-screen w-2/3 bg-white py-[30px] px-[50px]'>
        <div className='flex flex-row-reverse w-full gap-x-[10px] items-center'>
          <Link to={'/'} className='flex items-center justify-between gap-x-[10px] text-white bg-secondary rounded-[8px] p-[15px] text-xs font-[500]'>
            Sign in here
            <ChevronIcon className={`w-4 h-4 rotate-180`} thickness={2} />
          </Link>
          <p className='text-[13px] text-gray-500'>Already have an account?</p>
        </div>

        {!accountCreated ? 
          <div className='h-[90%] w-full flex items-center justify-center'>
            <div className='w-6/12 min-h-[500px] h-inherit'>
              <h3 className='text-[18px] font-[500] text-sufpay-black'>Start receiving payments for your business</h3>
              <div className='w-[40px] h-[3px] bg-secondary my-[10px]' />
              <p className='text-[13px] text-gray-500'>
                Your <span className='text-secondary'>Sufpay</span> account allows merchants to receive online payments and manage accounts easily</p>

                <h3 className="mt-[10px] text-sufpay-black text-[15px] mb-1">Your Business.</h3>
                <p className="text-xs text-gray-600">You can manage multiple businesses on this platform and it gives you an easy way to switch between businesses at any time. Please provide details of a business.</p>

                <div className='mt-2'>
                  <TextField
                      inputLabel="Business Name" 
                      fieldId="business-name" 
                      inputType="text" 
                      preloadValue={''}
                      inputPlaceholder={'Active email address'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{setUserPayload({...userPayload, ...{billerName: value}})}}
                  />
                  <label className='block mt-2 text-xs text-gray-400'>Your business needs not be registered with CAC. But an unregistered business will have limits on the amounts they can process on sufpay</label>
                </div>

                {billersSelector?.loadingCategories ? 
                  <div className='w-max mx-auto'>
                    <InlinePreloader /> 
                  </div>
                  :
                  <>
                      {billersSelector?.categories?.length > 0 && <div className='w-full mt-2'>
                      <SelectField
                          selectOptions={billersSelector?.categories}
                          inputLabel="Business Category"
                          titleField="name"
                          displayImage={false}
                          imageField=""
                          placeholderText={`Select business category`}
                          // preSelectedIndex={complexions.findIndex(item => item.value === applicationPayload.complexion)}
                          preSelectedIndex={null}
                          fieldId="applicant-complexion"
                          hasError={validationErrors && validationErrors.billerCategory}
                          returnFieldValue={(value) => {setUserPayload({...userPayload, ...{billerCategoryId: value.id}})}}
                      />
                      {/* <label className='block mt-2 text-sm text-gray-400'>How many staff do you currently have in your facility?</label> */}
                      </div>}
                  </>
                }

                <h3 className="mt-[10px] text-sufpay-black text-[15px] text-">Your Information.</h3>
                <div className='w-full flex items-center justify-between gap-x-[20px]'>
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
                </div>
                <div className='w-full flex items-center justify-between gap-x-[20px]'>
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
                </div>

              <div className='mt-5'>
                  <FormButton buttonLabel={<span className='flex items-center justify-between gap-x-[10px] text-white bg-transparent text-[13px] font-[500]'>Get Started <ChevronIcon className={`w-3 h-3 rotate-180`} thickness={4} /></span>} buttonAction={()=>{signup()}} processing={processing} />
              </div>
            </div>
          </div> : 
          <div className='h-full w-1/2 mx-auto flex items-center justify-center'>
            <div className='w-full'>
              <img src={SuccessIcon} alt='' className='mb-[20px] w-[75px] -ml-[10px]'/>
              <h3 className='text-[18px] font-[500] text-sufpay-black'>Your user account has been created successfully</h3>
              <div className='w-[40px] h-[3px] bg-secondary my-[15px]' />
              <p className='text-[13px] text-gray-500'>
                We have sent an email to you <span className='text-secondary'>{userPayload?.emailAddress || ''}</span>. Check your inbox (spam too) and follow the steps we've sent to you to proceed</p>

              <div className=''>
                {counted 
                  ? 
                    <button 
                      className='bg-secondary p-3 rounded-md mt-6 font-medium w-8/12 text-white transition duration-200 hover:bg-primary text-sm flex items-center justify-center' 
                      onClick={()=>{resendConfirmationEmail()}}
                    >
                      {processing ? <InlinePreloader />  : 'Resend confirmation email'}
                    </button>
                  :
                  <>
                    <p className='py-2 text-sm mt-2'>
                      Didn&apos;t get the link? please wait <Countdown seconds={60} className='inline text-red-800 font-medium' countdownComplete={()=>{setCounted(true)}} /> seconds
                    </p>
                  </>
                }
              </div>
            </div>
          </div>
          }
      </div>
    </div>
  )
}

export default Signup
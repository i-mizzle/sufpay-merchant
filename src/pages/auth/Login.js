import React, { useState } from 'react'
import Logo from '../../components/elements/Logo'
import ChevronIcon from '../../components/elements/icons/ChevronIcon'
import TextField from '../../components/elements/form/TextField'
import PasswordField from '../../components/elements/form/PasswordField'
import FormButton from '../../components/elements/form/FormButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ERROR, FETCH_API_KEYS } from '../../store/types'
import axios from 'axios'
import EnvelopeIcon from '../../components/elements/icons/EnvelopeIcon'
import PhoneIcon from '../../components/elements/icons/PhoneIcon'
import Twitter from '../../assets/img/twitter.svg'
import Linkedin from '../../assets/img/linkedin.svg'
import { jwtDecode } from 'jwt-decode'
import { createApiKeys } from '../../store/actions/paymentsActions'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validationErrors, setValidationErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  const validateForm = () => {
    let errors = {}
    if(!email || email === '') {
        errors.email = true
    }
    if(!password || password === '') {
        errors.password = true
    }
    setValidationErrors(errors)

    return errors
  }

  const logIn = async  () => {
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

    const requestPayload = { 
      emailAddress: email, 
      password 
    }

    try {
      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/authentication/login`, requestPayload, { headers })            
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/authentication/login`, requestPayload, { headers })            
      // console.log(response.data.toke)
      localStorage.setItem("authToken", JSON.stringify(response.data.token));
      const decodedToken = jwtDecode(response.data.token)
      console.log(decodedToken)
      if(!decodedToken.payload.merchantRoles || decodedToken.payload.merchantRoles.length === 0){
        dispatch({
          type: ERROR,
          error: {response: {data: {
              message: 'No merchant accounts found, please contact support'
          }}}
        })
        return
      }
      else {
        localStorage.setItem("userDetails", JSON.stringify(decodedToken.payload));

        // navigate('/merchant/home')
        getBillerDetails(response.data.token, decodedToken.payload.merchantRoles[0].billerId)
      }

    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR,
            error
        })
        setProcessing(false)
    }
  }

  const getBillerDetails = async  (token, billerId) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    
    try {
        // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/authentication/users/billers/${userCode}`, { headers })   
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/billers/biller/get/one/${billerId}`, { headers })   
        console.log(response.data)
        localStorage.setItem("activeBusiness", JSON.stringify(response.data));
        fetchApiKeys(token, billerId)
        // navigate("/admin")
    } catch (error) {
        dispatch({
            type: ERROR,
            error
        })
        setProcessing(false)
    }
  }

  const fetchApiKeys = async (token, billerId) => {    
    try{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      let url = `${process.env.REACT_APP_BASE_URL}/payments/api-keys/get/biller/${billerId}`

      const response = await axios.get(url, { headers })
      
      dispatch({
        type: FETCH_API_KEYS,
        payload: response.data
      })
      navigate('/merchant')
        
    }
    catch(error){
      console.error(error)
      dispatch(createApiKeys({billerId}))
      navigate('/merchant')
    }
}
  return (
    <div className='w-full flex items-start min-h-screen justify-between'>
      <div className='h-screen w-1/3 bg-primary py-[20px] px-[50px] relative hidden xl:block'>
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
      <div className='h-screen w-full xl:w-2/3 bg-white py-[30px] px-[50px]'>
        <div className='xl:hidden'>
          <Logo color={`#fff`} size={`150px`} />
        </div>
        <div className='hidden xl:flex flex-row-reverse w-full gap-x-[10px] items-center'>
          <Link to={`signup`} className='flex items-center justify-between gap-x-[10px] text-white bg-secondary rounded-[8px] p-[15px] text-xs font-[500]'>
            Sign up here
            <ChevronIcon className={`w-4 h-4 rotate-180`} thickness={2} />
          </Link>
          <p className='text-[13px] text-gray-500'>Don't have an account yet?</p>
        </div>

        <div className='h-[90%] w-full flex items-center justify-center'>
          <div className='w-full xl:w-6/12 h-[500px]'>
            <h3 className='text-[18px] font-[500] text-sufpay-black'>Sign in to your account</h3>
            <div className='w-[40px] h-[3px] bg-secondary my-[15px]' />
            <p className='text-[13px] text-gray-500'>
              Your <span className='text-secondary'>sufpay</span> account gives you access to everything you need to manage your business and transactions
            </p>

            <div className='mt-4'>
                <TextField
                    inputLabel="Email address" 
                    fieldId="username" 
                    inputType="text" 
                    preloadValue={''}
                    inputPlaceholder={`Your registered email address`}
                    hasError={validationErrors && validationErrors.email} 
                    returnFieldValue={(value)=>{setEmail(value)}}
                />
            </div>
            
            <div className='mt-4'>
                <PasswordField
                    inputLabel="Password" 
                    fieldId="password" 
                    inputType="password" 
                    preloadValue={''}
                    inputPlaceholder={`Your password`}
                    hasError={validationErrors && validationErrors.password} 
                    returnFieldValue={(value)=>{setPassword(value)}}
                />
            </div>

            <p className="my-5 text-xs text-opacity-70 block">Forgot your password? <Link to="/password-reset" className="text-secondary text-sm font-[500]">Reset it here</Link></p>
            
            <div className='mt-5'>
                <FormButton buttonLabel="Login to your account" buttonAction={()=>{logIn()}} processing={processing} />
            </div>

            <div className='flex xl:hidden mt-[20px] flex-row w-full gap-x-[10px] items-center'>
              <p className='text-[13px] text-gray-500'>Don't have an account yet?</p>
              <Link to={`signup`} className='flex items-center justify-center gap-x-[10px] text-secondary text-xs font-[500]'>
                Sign up here
                <ChevronIcon className={`w-4 h-4 rotate-180`} thickness={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
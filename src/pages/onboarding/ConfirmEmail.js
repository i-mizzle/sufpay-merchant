import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Logo from '../../components/elements/Logo';
import PasswordField from '../../components/elements/form/PasswordField';
import FormButton from '../../components/elements/form/FormButton';
import { useDispatch } from 'react-redux';
import { ERROR, SET_SUCCESS } from '../../store/types';
import axios from 'axios';

const ConfirmEmail = () => {
  const { confirmationCode } = useParams()
  const dispatch = useDispatch()
  const [password, setPassword] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate()
  const validateForm = () => {
    let errors = {}

    if(!password || password === '') {
        errors.password = true
    }
    setValidationErrors(errors)

    return errors
  }

  const activateAccount = async  () => {
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
      token: confirmationCode,
      password,
      passwordConfirm: password 
    }
    try {
      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/authentication/activate-account`, requestPayload, { headers })            
      await axios.post(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_AUTH_PORT}/activate-account`, requestPayload, { headers })            
      dispatch({
        type: SET_SUCCESS,
        payload:  'Account activated successfully, redirecting to log in'
      })
      setTimeout(() => {
        navigate('/')
      }, 2000);
      // localStorage.setItem("authToken", JSON.stringify(response.data.data.accessToken));
      // getUserProfile(response.data.data.accessToken)
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
    <div className='w-full bg-primary h-screen flex items-center justify-center'>
      <div className='w-4/12'>
        <Logo color={`#fff`} size={`150px`} />
        <h5 class="text-accent font-[550] text-lg mt-5">
          One last thing!
        </h5>
        <div class="w-[40px] h-[2px] bg-accent mt-3 mb-3" />
        <p class="mb-3 text-white text-xs leading-[2em]">
          <span class="font-[500] text-[13px] text-white">Your Email has been confirmed successfully.</span>
          <br />Please create your password to allow you login to your account.
        </p>
        <div className='p-[40px] rounded-[8px] w-full bg-white mt-[30px]'>
          <div className=''>
            <PasswordField
              inputLabel="Password" 
              fieldId="password" 
              inputType="password" 
              preloadValue={''}
              inputPlaceholder={`Your password`}
              hasError={validationErrors && validationErrors.password} 
              returnFieldValue={(value)=>{setPassword(value)}}
              showPasswordMeter={true}
            />
          </div>
            
          <div className='mt-8'>
            <FormButton buttonLabel="Activate your account" buttonAction={()=>{activateAccount()}} processing={processing} />
          </div>

          <p className="mt-5 text-xs text-opacity-70 block">Already done this? <Link to="/" className="text-secondary text-sm font-[500]">Sign in here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmail
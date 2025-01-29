import React, { useEffect, useState } from 'react'
import Logo from '../../components/elements/Logo'
import FormButton from '../../components/elements/form/FormButton'
import ArrowIcon from '../../components/elements/icons/ArrowIcon'
import { authHeader } from '../../utils'
import axios from 'axios'
import { ERROR } from '../../store/types'
import TextField from '../../components/elements/form/TextField'
// import CheckIcon from '../../components/elements/icons/CheckIcon'
import SelectField from '../../components/elements/form/SelectField'
// import TrashIcon from '../../components/elements/icons/TrashIcon'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import PlusIcon from '../../components/elements/icons/PlusIcon'
import { fetchBillerCategories, fetchBillerProfiles } from '../../store/actions/billerActions'
import Checkbox from '../../components/elements/form/Checkbox'
import InlinePreloader from '../../components/elements/InlinePreloader'

const NewMerchant = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch()
  const billersSelector = useSelector(state => state.billers)

  const steps = [
      {
          title: "Business Details",
          description: "Please provide details for your business."
      },
      {
          title: "Your Team",
          description: "Provide email addresses of some of your teammates and we'll send them invitations to join you."
      },
      {
          title: "Business Profile Type",
          description: "Select an appropriate profile for your Business."
      },
      {
          title: "Integrations",
          description: "You're all set to integrate our collection channels on your website"
      },
  ]

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

//   const [acceptedUserTerms, setAcceptedUserTerms] = useState(false);

  // const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchBillerCategories())
    dispatch(fetchBillerProfiles())
    // if(searchParams.get("continueFrom")){
    //     setCompletedSteps([0])
    //     setActiveStep(parseInt(searchParams.get("continueFrom")))
    // }
      
    return () => {
        
    };
  }, [dispatch]);

  // const [otp, setOtp] = useState('');
  // const [otpSent, setOtpSent] = useState(false)
  // const [counted, setCounted] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [businessDetails, setBusinessDetails] = useState({});

  const validateForm = () => {
      let errors = {}

      if(!businessDetails.name || businessDetails.name === ''){
          errors.name = true
      }
      if(!businessDetails.startOfOperationsYear || businessDetails.startOfOperationsYear === ''){
          errors.startOfOperationsYear = true
      }
      if(!businessDetails.address || businessDetails.address === ''){
          errors.address = true
      }
      if(!businessDetails.email || businessDetails.email === ''){
          errors.businessEmail = true
      }
      if(!businessDetails.phone || businessDetails.phone === ''){
          errors.businessPhone = true
      }
      if(!businessDetails.city || businessDetails.city === ''){
          errors.city = true
      }
      if(!businessDetails.state || businessDetails.state === ''){
          errors.state = true
      }
      if(!businessDetails.zip || businessDetails.zip === ''){
          errors.zip = true
      }
      if(!businessDetails.numberOfStaff || businessDetails.numberOfStaff === ''){
          errors.numberOfStaff = true
      }
      setValidationErrors(errors)
      return errors
  }

  const createBusiness = async () => {
      if (Object.values(validateForm()).includes(true)) {
          dispatch({
              type: ERROR,
              error: {response: {data: {
                  message: 'Please check the highlighted fields'
              }}}
          })
          return
      }

      try {
        const headers = authHeader()

        const requestPayload =  {
            name: businessDetails.name,
            website: businessDetails.website,
            contact: {
                email: businessDetails.email,
                address: {
                    address:businessDetails.address,
                    city: businessDetails.city,
                    state: businessDetails.state,
                    zip: businessDetails.zip,
                },
                phone: businessDetails.phone,
            },
            numberOfStaff: businessDetails.numberOfStaff,
            startOfOperationsYear: businessDetails.startOfOperationsYear,
            invalidateSession: true
        }

        setProcessing(true)
        
        await axios.post(`${process.env.REACT_APP_BASE_URL}/onboarding/care-homes`, requestPayload, { headers }) 
        setProcessing(false)
        setCompletedSteps([...completedSteps, 2])
        setActiveStep(3)
        localStorage.removeItem("authToken")
        setProcessing(false)
    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR,
            error
        })
        setProcessing(false)
    }

      setCompletedSteps([...completedSteps, 1])
      setActiveStep(2)
  }

  const employeeCount = [
      {
          label: "1-10",
          value: "1-10",
      },
      {
          label: "11-25",
          value: "11-25",
      },
      {
          label: "26-50",
          value: "26-50",
      },
      {
          label: "51-100",
          value: "51-100",
      },
      {
          label: "Above 100",
          value: "100-0"
      },
  ]

//   const personnel = {
//       name: "",
//       email: "",
//       phone: "",
//       position: ""
//   }


//   const [facilityTermsAccepted, setFacilityTermsAccepted] = useState(false);
//   const [acknowledged, setAcknowledged] = useState(false);


  // const handleCelebrate = () => {
  //     setShowConfetti(true);
  //     setTimeout(() => setShowConfetti(false), 2000); // Hide confetti after 2 seconds
  // };
  


//   const [teammateEmails, setTeammateEmails] = useState(['']);

//   const addTeammateEmail = () => {
//     setTeammateEmails([...teammateEmails, ''])
//   }
  
//   const updateTeammateEmail = (index, value) => {
//     let temp = [...teammateEmails]
//     temp[index] = value
//     setTeammateEmails(temp)
//   }

//   const deleteTeammateEmail = (index) => {
//     let temp = [...teammateEmails]
//     temp.splice(index, 1)
//     setTeammateEmails(temp)
//   }


  return (
    <>
      <div className="w-full min-h-screen flex pt-[20px] justify-center bg-primary">
          <div className="w-5/12">
              <div className='w-max'>
                <Logo color={`#fff`} size={`40px`} />
              </div>

              <h3 className="mt-[10px] text-white text-lg mb-1 text-">Create your business and begin your path to seamless collections.</h3>
              <p className="text-sm text-white text-opacity-70 text-">You can manage multiple businesses on this platform and it gives you an easy way to switch between businesses at any time. Please provide details of a business to get started right away.</p>

              {/* <div className='flex items-center justify-between mt-[20px] px-[20px] relative'>
                  <div className='w-full h-[1px] bg-gray-200 absolute top-[19px] left-0 z-10'></div>
                  {steps.map((step, stepIndex)=>(
                      <div key={stepIndex} className='flex flex-col items-center justify-center z-20'>
                          <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-white border-[2px] border-gray-200 ${activeStep === stepIndex ? 'bg-white' : completedSteps.includes(stepIndex) ? 'bg-green-500' : 'bg-primary'}`}>
                              {!completedSteps.includes(stepIndex) ? <p className={`font-host-grotesk font-[500] ${activeStep === stepIndex ? 'text-primary' : 'text-white'}`}>{stepIndex + 1}</p> : <CheckIcon className="w-5 h-5 text-white" />}
                          </div>
                          <p className={`mt-[10px] font-host-grotesk text-sm ${activeStep === stepIndex ? 'font-[500] text-accent' : 'font-[500] text-gray-400'}`}>{step.title}</p>
                      </div>
                  ))}
              </div> */}

              <div className='rounded-[12px] bg-white px-[40px] py-[40px] mt-[20px]'>
                  {activeStep === 0 && <>
                    <div className='mt-4'>
                      <TextField
                          inputLabel="Business Name" 
                          fieldId="business-name" 
                          inputType="text" 
                          preloadValue={''}
                          inputPlaceholder={'Active email address'}
                          hasError={validationErrors && validationErrors.firstName} 
                          returnFieldValue={(value)=>{setUserDetails({...userDetails, ...{email: value}})}}
                      />
                      <label className='block mt-2 text-xs text-gray-400'>Your business needs not be registered with CAC. But an unregistered business will have limits on the amounts they can process on sufpay</label>
                    </div>

                    {billersSelector?.loadingCategories ? 
                        <InlinePreloader /> 
                        :
                        <>
                            {billersSelector?.categories?.length > 0 && <div className='w-full mt-4'>
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
                                hasError={validationErrors && validationErrors.numberOfStaff}
                                returnFieldValue={(value) => {setBusinessDetails({...businessDetails, ...{category: value.id}})}}
                            />
                            {/* <label className='block mt-2 text-sm text-gray-400'>How many staff do you currently have in your facility?</label> */}
                            </div>}
                        </>
                    }



                      {/* <div className='w-full mt-8'>
                          <Checkbox
                              CheckboxLabel="I have read and agree with the Terms & Conditions & Privacy Policy of Doiteasy"
                              checkboxToggleFunction={()=>{
                                  setAcceptedUserTerms(!acceptedUserTerms)
                              }} 
                              isChecked={acceptedUserTerms} 
                              hasError={validationErrors.terms} 
                          />
                      </div> */}

                    <div className='mt-4'>
                      <TextField
                        inputLabel="Business Email address" 
                        fieldId="email" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={`An active email address`}
                        hasError={validationErrors && validationErrors.email} 
                        returnFieldValue={(value)=>{setBusinessDetails({...businessDetails, ...{email: value}})}}
                      />
                    </div>

                    <div className='mt-4'>
                      <TextField
                        inputLabel="Business Phone number" 
                        fieldId="phone" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={`An active phone number`}
                        hasError={validationErrors && validationErrors.phone} 
                        returnFieldValue={(value)=>{setBusinessDetails({...businessDetails, ...{phone: value}})}}
                      />
                    </div>

                    <div className='mt-4'>
                      <TextField
                        inputLabel="Website" 
                        fieldId="website" 
                        inputType="text" 
                        preloadValue={''}
                        inputPlaceholder={`Business website`}
                        hasError={validationErrors && validationErrors.website} 
                        returnFieldValue={(value)=>{setBusinessDetails({...businessDetails, ...{website: value}})}}
                      />
                    </div>

                    <div className='w-full mt-8'>
                        <Checkbox
                            CheckboxLabel="I have read and agree with the Terms & Conditions & Privacy Policy"
                            checkboxToggleFunction={()=>{
                                setTermsAccepted(!termsAccepted)
                            }} 
                            isChecked={termsAccepted} 
                            hasError={validationErrors.termsAccepted} 
                        />
                    </div>
                    
                    <div className='mt-8 w-[60%] mx-auto'>
                          <FormButton 
                              buttonLabel={
                                  <span className='flex items-center justify-center gap-x-[20px] text-white font-host-grotesk font-[550]'>
                                      Create Business
                                      <ArrowIcon className={`w-5 h-5`} />
                                  </span>
                              } 
                              buttonAction={()=>{createBusiness()}} 
                              processing={processing} />
                      </div>
                  </>}

                  {/* {activeStep === 1 && <>
                    {teammateEmails.map((email, emailIndex) =>(<div key={emailIndex} className='mt-4 relative'>
                      {emailIndex > 0 && 
                        <button onClick={()=>{deleteTeammateEmail(emailIndex)}} className='p-[7px] text-gray-400 hover:bg-gray-100 hover:text-red-700 z-50 absolute -top-[10px] right-0 rounded transition duration-200'>
                            <TrashIcon className={`w-5 h-5`} />
                        </button>
                      }
                      <TextField
                        inputLabel="Teammate email address" 
                        fieldId="facility-name" 
                        inputType="text" 
                        preloadValue={email || ''}
                        inputPlaceholder={'Active teammate email'}
                        hasError={validationErrors && validationErrors.name} 
                        returnFieldValue={(value)=>{updateTeammateEmail(emailIndex, value)}}
                      />
                    </div>))}

                    <div className='my-4 flex flex-row-reverse'>
                      <button onClick={()=>{addTeammateEmail()}} className='px-[18px] py-[12px] font-host-grotesk border-[1.5px] rounded-[8px] transition duration-200 text-sufpay-black border-sufpay-black text-sm font-[550] hover:bg-sufpay-black hover:text-gray-200 flex items-center justify-center gap-x-1'>
                      <PlusIcon className={`w-4 h-4`} />
                        Add another teammate
                      </button>
                    </div>

                    <div className='flex items-center justify-between mt-8'>
                      <button className='flex items-center justify-center gap-x-1 text-xs'>
                        <ArrowIcon className={`w-5 h-5 -rotate-180`} />
                        Go Back
                      </button>

                      <div className='flex flex-row-reverse items-center gap-x-[10px]'>
                        <div className='w-max'>
                          <FormButton 
                            buttonLabel={
                              <span className='flex items-center justify-center gap-x-[20px] text-white font-host-grotesk font-[500]'>
                                Continue
                                <ArrowIcon className={`w-5 h-5`} />
                              </span>
                            } 
                            buttonAction={()=>{}} 
                            processing={processing} 
                          />
                        </div>
                        <button className='flex text-xs items-center justify-center gap-x-1'>
                          Skip for now
                        </button>
                      </div>

                    </div>
                      
                  </>} */}
                  
                  {activeStep === 2 && <>
                      {/* {keyPersonnel.map ((person, personIndex)=>(<div key={personIndex}>
                          {personIndex > 0 && <div className='flex flex-row-reverse mt-4'>
                              <button onClick={()=>{removeKeyPersonnel(personIndex)}} className='p-[7px] text-gray-400 hover:bg-gray-100 hover:text-red-700 rounded transition duration-200'>
                                  <TrashIcon className={`w-5 h-5`} />
                              </button>
                          </div>}
                          <div className='mt-0'>
                              <TextField
                                  inputLabel="Full name" 
                                  fieldId={`key-personnel-${personIndex}-name`}
                                  inputType="text" 
                                  preloadValue={person.name}
                                  inputPlaceholder={'Full name of the person'}
                                  hasError={validationErrors && validationErrors[`person-${personIndex}-name`]} 
                                  returnFieldValue={(value)=>{updateKeyPersonnel(personIndex, 'name', value)}}
                              />
                          </div>

                          <div className='mt-4 flex items-center justify-between gap-x-[20px]'>
                              <div className='w-full'>
                                  <TextField
                                      inputLabel="Email address" 
                                      fieldId={`key-personnel-${personIndex}-email`} 
                                      inputType="text" 
                                      preloadValue={person.email}
                                      inputPlaceholder={`Their email address`}
                                      hasError={validationErrors && validationErrors[`person-${personIndex}-email`]} 
                                      returnFieldValue={(value)=>{updateKeyPersonnel(personIndex, 'email', value)}}
                                  />
                              </div>
                              <div className='w-full'>
                                  <TextField
                                      inputLabel="Phone number" 
                                      fieldId={`key-personnel-${personIndex}-phone`} 
                                      inputType="text" 
                                      preloadValue={person.phone}
                                      inputPlaceholder={'Their phone number'}
                                      hasError={validationErrors && validationErrors[`person-${personIndex}-phone`]} 
                                      returnFieldValue={(value)=>{updateKeyPersonnel(personIndex, 'phone', value)}}
                                  />
                              </div>
                          </div>

                          <div className='mt-4'>
                              <SelectField
                                  selectOptions={personnelPositions}
                                  inputLabel="Position"
                                  titleField="label"
                                  displayImage={false}
                                  imageField=""
                                  // preSelectedIndex={complexions.findIndex(item => item.value === applicationPayload.complexion)}
                                  preSelectedIndex={null}
                                  fieldId={`key-personnel-${personIndex}-position`}
                                  hasError={validationErrors && validationErrors[`person-${personIndex}-position`]}
                                  returnFieldValue={(value) => {updateKeyPersonnel(personIndex, 'position', value.label)}}
                              />
                              <label className='block mt-2 text-sm text-gray-400'>What position does this person occupy in the organization?</label>
                          </div> 
                      </div>))}

                      <div className='my-4 flex flex-row-reverse'>
                        <button onClick={()=>{addKeyPersonnel()}} className='px-[18px] py-[12px] font-space-grotesk border-[2px] rounded-[8px] transition duration-200 text-doiteasy-black border-doiteasy-black text-sm font-[550] hover:bg-doiteasy-black hover:text-doiteasy-light-gray'>Add another key personnel</button>
                      </div>

                      <div className='my-8 border-t w-full border-gray-200' />

                      <div className='w-full mt-8'>
                          <Checkbox
                              CheckboxLabel="I have read and agree with the Terms & Conditions & Privacy Policy of Doiteasy for Care Facilities"
                              checkboxToggleFunction={()=>{
                                  setFacilityTermsAccepted(!facilityTermsAccepted)
                              }} 
                              isChecked={facilityTermsAccepted} 
                              hasError={validationErrors.facilityTermsAccepted} 
                          />
                      </div>

                      <div className='w-full mt-4'>
                          <Checkbox
                              CheckboxLabel="I hereby confirm that i have the authority to create this account onn behalf of the Care facility"
                              checkboxToggleFunction={()=>{
                                  setAcknowledged(!acknowledged)
                              }} 
                              isChecked={acknowledged} 
                              hasError={validationErrors.acknowledged} 
                          />
                      </div> */}
                      
                      <div className='mt-8 w-[60%] mx-auto'>
                          <FormButton 
                              buttonLabel={
                                  <span className='flex items-center justify-center gap-x-[20px] text-white font-space-grotesk font-[550]'>
                                      Create Business
                                      <ArrowIcon className={`w-5 h-5`} />
                                  </span>
                              } 
                              buttonAction={()=>{createBusiness()}} 
                              processing={processing} />
                      </div>
                  </>}

                  {activeStep === 3 && <>
                      <div className='w-full pb-[30px]'>
                          <div className='mx-auto w-full text-center px-[40px]'>
                              <span className='text-[60px] mb-[20px]'>🎉</span>
                              <h3 className='font-space-grotesk text-[24px] leading-[28px] text-gunmetal-black font-[500]'>You're all done. Welcome aboard!</h3>
                              <p className='mt-[10px] font-[500]'>Thank you for signing up.</p>
                              <p className='mt-[10px] text-sm font-[500] text-gray-500'>We are currently going through your information and once your account is approved, you will be able to log in to the platform</p>
                              {/* {showConfetti && 
                                  <Confetti trigger={showConfetti} />
                              } */}
                          </div>
                      </div>
                  </>}

              </div>

              <div className='w-full text-center mt-8 mb-8'>
                  <p className="my-3 text-sm block">
                      <Link to="/" className="text-accent">Already have a business? Click here to login</Link>
                  </p>
              </div>

          </div>
      </div>
    </>
  )
}

export default NewMerchant
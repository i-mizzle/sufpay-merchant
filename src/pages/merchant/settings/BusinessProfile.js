import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ERROR } from '../../../store/types';
import { activeBusiness } from '../../../utils';
import Loader from '../../../components/elements/Loader';
import ArrowIcon from '../../../components/elements/icons/ArrowIcon';
import ChevronIcon from '../../../components/elements/icons/ChevronIcon';
import CheckIcon from '../../../components/elements/icons/CheckIcon';
import TextField from '../../../components/elements/form/TextField';
import TextareaField from '../../../components/elements/form/TextareaField';
import FileUpload from '../../../components/elements/form/FileUpload';

const BusinessProfile = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [businessDetails, setBusinessDetails] = useState(null);
  useEffect(() => {
    // dispatch(fetchApiKeys(activeBusiness().id))
    const fetchBusinessDetails = async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      setLoading(true)

      try {          
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/billers/biller/get/one/${activeBusiness().id}`, { headers })    
        setBusinessDetails(response.data)        
        setLoading(false)
      } catch (error) {
        console.log(error)
        dispatch({
          type: ERROR,
          error
        })
        setLoading(false)
      }
    }

    fetchBusinessDetails()

    return () => {
      
    };
  }, [dispatch]);

  const [activeSection, setActiveSection] = useState('business-information'); // contact, director, documentation

  const [validationErrors, setValidationErrors] = useState({});

  const [cacDocument, setCacDocument] = useState(null);
  const [directorId, setDirectorId] = useState(null);
  const [addressVerification, setAddressVerification] = useState(null);

  return (
    <div className='w-full'>
      <div className='w-1/2'>
        <h3 className='text-sufpay-black font-[550] tracking-tight text-2xl'>Business Profile</h3>
        <p className='text-[13px] text-sufpay-gray mt-[10px]'>
          Information about your business. you can update your information or request go live when all the required information is complete.
        </p>
      </div>   

      {loading ? 
        <Loader />
        :
        <div className='w-10/12 flex items-start justify-between gap-x-[20px] mt-[20px]'>
          <div className='w-8/12'>
            <label className='uppercase text-[11px] tracking-[0.2em] block'>biller code</label>
            <p className='font-host-grotesk text-lg font-[550] tracking-tight text-sufpay-black uppercase'>{businessDetails.billerCode}</p>

            <div className='w-full mt-[20px] bg-red-100 bg-opacity-30 p-[15px] rounded-[8px]'>
              <h3 className='font-[300] text-red-600 text-[15px]'>We need more information</h3>
              <p className='text-[12px] mt-[5px]'>Your business profile information is not yet complete. Please provide the information in the following sections before your Business can go live</p>
            </div>

            <div className='mt-[20px] w-full'>
              <div className="bg-gray-50 w-full p-[15px] rounded-[8px] mb-[10px]">
                <div onClick={()=>{setActiveSection('business-information')}} className="cursor-pointer w-full flex items-start justify-between">
                  <div className='w-full'>
                    <h3 className='text-md font-[550] tracking-tight'>Business Information</h3>
                    <p className='text-[13px] text-sufpay-gray'>Basic information about your company</p>
                  </div>
                  <button className='mt-[5px]'>
                    <ChevronIcon className={`w-4 h-4 transition duration-200 ${activeSection === 'business-information' ? 'rotate-[270deg]' : 'rotate-180'}`} />
                  </button>
                </div>
                {activeSection === 'business-information' && <div className='w-full mt-[15px] pt-[15px] border-t'>
                  <div className='w-full'>
                    <TextField
                      inputLabel="Business Name" 
                      fieldId="business-name" 
                      inputType="text" 
                      preloadValue={businessDetails.name || ''}
                      inputPlaceholder={'Registration number on your CAC certificate'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  <div className='w-full mt-2'>
                    <TextField
                      inputLabel="CAC Registration Number" 
                      fieldId="business-cac" 
                      inputType="text" 
                      preloadValue={businessDetails.cac || ''}
                      inputPlaceholder={'Your business operating name'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  <div className='w-full mt-2'>
                    <TextareaField
                      inputLabel="Business Description" 
                      fieldId="business-name" 
                      inputType="text" 
                      preloadValue={businessDetails.description || ''}
                      inputPlaceholder={'Your business operating name'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  <div className='flex flex-row-reverse mt-[10px]'>
                    <button className='rounded-[8px] mt-[10px] bg-secondary flex items-center justify-between gap-x-[5px] text-white px-[18px] py-[10px] text-[13px] transition duration-200 hover:bg-sufpay-black'>
                      Save Information <CheckIcon className={`w-4 h-4`} />
                    </button>
                  </div>
                </div>}
              </div>

              <div className="bg-gray-50 w-full p-[15px] rounded-[8px] mb-[10px]">
                <div onClick={()=>{setActiveSection('contact')}} className="cursor-pointer w-full flex items-start justify-between">
                  <div className='w-full'>
                    <h3 className='text-md font-[550] tracking-tight'>Contact Information</h3>
                    <p className='text-[13px] text-sufpay-gray'>Your company's primary contact person and contact details</p>
                  </div>
                  <button className='mt-[5px]'>
                    <ChevronIcon className={`w-4 h-4 transition duration-200 ${activeSection === 'contact' ? 'rotate-[270deg]' : 'rotate-180'}`} />
                  </button>
                </div>
                {activeSection === 'contact' && <div className='w-full mt-[15px] pt-[15px] border-t'>
                  <div className='w-full'>
                    <TextField
                      inputLabel="Contact name" 
                      fieldId="contact-name" 
                      inputType="text" 
                      preloadValue={businessDetails?.contact[0]?.contactName || ''}
                      inputPlaceholder={'Your business operating name'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  <div className='w-full mt-2'>
                    <TextField
                      inputLabel="Phone number" 
                      fieldId="phone" 
                      inputType="text" 
                      preloadValue={businessDetails?.contact[0]?.phoneNumber || ''}
                      inputPlaceholder={'Your business operating name'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  <div className='w-full mt-2'>
                    <TextField
                      inputLabel="Email Address" 
                      fieldId="email" 
                      inputType="text" 
                      preloadValue={businessDetails?.contact[0]?.emailAddress || ''}
                      inputPlaceholder={'Your business operating name'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  <div className='w-full mt-2'>
                    <TextField
                      inputLabel="Address" 
                      fieldId="address" 
                      inputType="text" 
                      preloadValue={businessDetails?.contact[0]?.address || ''}
                      inputPlaceholder={'Your business operating name'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  <div className='flex items-center justify-between gap-x-[20px]'>
                    <div className='w-full mt-2'>
                      <TextField
                        inputLabel="City" 
                        fieldId="city" 
                        inputType="text" 
                        preloadValue={businessDetails?.contact[0]?.city || ''}
                        inputPlaceholder={'Your business operating name'}
                        hasError={validationErrors && validationErrors.billerName} 
                        returnFieldValue={(value)=>{}}
                      />
                    </div>
                    <div className='w-full mt-2'>
                      <TextField
                        inputLabel="State" 
                        fieldId="email" 
                        inputType="text" 
                        preloadValue={businessDetails?.contact[0]?.state || ''}
                        inputPlaceholder={'Your business operating name'}
                        hasError={validationErrors && validationErrors.billerName} 
                        returnFieldValue={(value)=>{}}
                      />
                    </div>
                  </div>
                  <div className='w-full mt-2'>
                    <TextField
                      inputLabel="Country" 
                      fieldId="country" 
                      inputType="text" 
                      preloadValue={businessDetails?.contact[0]?.country || ''}
                      inputPlaceholder={'Your business operating name'}
                      hasError={validationErrors && validationErrors.billerName} 
                      returnFieldValue={(value)=>{}}
                    />
                  </div>
                  
                  <div className='flex flex-row-reverse mt-[10px]'>
                    <button className='rounded-[8px] mt-[10px] bg-secondary flex items-center justify-between gap-x-[5px] text-white px-[18px] py-[10px] text-[13px] transition duration-200 hover:bg-sufpay-black'>
                      Save Information <CheckIcon className={`w-4 h-4`} />
                    </button>
                  </div>
                </div>}
              </div>

              {/* <div className="bg-gray-50 w-full p-[15px] rounded-[8px] mb-[10px]">
                <div className="w-full flex items-start justify-between">
                  <div className='w-full'>
                    <h3 className='text-md font-[550] tracking-tight'>Director/Business owner Information</h3>
                    <p className='text-[13px] text-sufpay-gray'>Details of one of the owners or directors of your business</p>
                  </div>
                  <button className='mt-[5px]'>
                    <ChevronIcon className={`w-4 h-4 rotate-180`} />
                  </button>
                </div>
              </div> */}

              <div className="bg-gray-50 w-full p-[15px] rounded-[8px] mb-[10px]">
                <div onClick={()=>{setActiveSection('documentation')}} className="cursor-pointer w-full flex items-start justify-between">
                  <div className='w-full'>
                    <h3 className='text-md font-[550] tracking-tight'>Documentation</h3>
                    <p className='text-[13px] text-sufpay-gray'>Required regulatory documents we need for your company.</p>
                  </div>
                  <button className='mt-[5px]'>
                    <ChevronIcon className={`w-4 h-4 transition duration-200 ${activeSection === 'documentation' ? 'rotate-[270deg]' : 'rotate-180'}`} />
                  </button>
                </div>
                {activeSection === 'documentation' && <div className='w-full mt-[15px] pt-[15px] border-t'>

                  <div className='mt-2 w-full'>
                    <FileUpload
                        hasError={validationErrors.file}
                        fieldLabel={`CAC Certificate`}
                        returnFileDetails={(details)=>{
                            setCacDocument(details)
                        }}
                        acceptedFormats={['png', 'jpeg', 'jpg']}
                    />
                    <label className='block mt-2 text-xs text-gray-400'>{`Your CAC Certificate showing your Registration Number`}</label>
                  </div>

                  <div className='mt-2 w-full'>
                    <FileUpload
                        hasError={validationErrors.file}
                        fieldLabel={`Directors ID Card`}
                        returnFileDetails={(details)=>{
                            setDirectorId(details)
                        }}
                        acceptedFormats={['png', 'jpeg', 'jpg']}
                    />
                    <label className='block mt-2 text-xs text-gray-400'>{`Regulatory ID card (Nin Slip, Drivers License, International Passport, Voters Card or National ID card) of one of the company's directors/owners`}</label>
                  </div>

                  <div className='mt-2 w-full'>
                    <FileUpload
                        hasError={validationErrors.file}
                        fieldLabel={`Address Verification Document`}
                        returnFileDetails={(details)=>{
                            setAddressVerification(details)
                        }}
                        acceptedFormats={['png', 'jpeg', 'jpg']}
                    />
                    <label className='block mt-2 text-xs text-gray-400'>{`Evidence of address (Utility Bill or Rent Receipt) of your business premises.`}</label>
                  </div>
                  

                  <div className='flex flex-row-reverse mt-[10px]'>
                    <button className='rounded-[8px] mt-[10px] bg-secondary flex items-center justify-between gap-x-[5px] text-white px-[18px] py-[10px] text-[13px] transition duration-200 hover:bg-sufpay-black'>
                      Save Documents <CheckIcon className={`w-4 h-4`} />
                    </button>
                  </div>
                </div>}
              </div>
            </div>
          </div>
          <div className='w-4/12'>
            <div className='w-full p-[20px] bg-gray-100 rounded-[8px]'>
              <label className='uppercase text-[11px] tracking-[0.2em] block'>biller profile</label>
              <p className='font-host-grotesk text-lg font-[550] tracking-tight text-sufpay-black capitalize'>{businessDetails.profile.name.toLowerCase()}</p>

              {businessDetails.profile.hasTransactionLimit ? 
                <p className='font-host-grotesk text-md font-[550] tracking-tight'>
                  N{(businessDetails.profile.transactionLimit/100).toLocaleString()} <span className='text-[10px] font-poppins font-[300] uppercase'>per {businessDetails.profile.delimiter} </span></p> 
              :
                <p className='font-host-grotesk text-md font-[550] tracking-tight'>No Limits</p>
              }

              <button className='rounded-[8px] mt-[10px] bg-secondary flex items-center justify-between gap-x-[5px] text-white px-[18px] py-[10px] text-[13px] transition duration-200 hover:bg-sufpay-black'>
                Upgrade Profile <ArrowIcon className={`w-4 h-4 -rotate-90`} />
              </button>

            </div>
          </div>
        </div> 
      }

    </div>
  )
}

export default BusinessProfile
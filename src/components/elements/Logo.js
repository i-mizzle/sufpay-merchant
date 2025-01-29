import React from 'react'
import SufpayLogo from '../../assets/img/logo.svg'

const Logo = ({color, size}) => {
  return (
    <div style={{
      width: size
     }}>
      <img src={SufpayLogo} alt='sufpay' className='w-full'  />
    </div>
  )
}

export default Logo
import React from 'react'
import SettingsLayout from '../../../components/layouts/SettingsLayout'
import { Outlet } from 'react-router-dom'
import MerchantLayout from '../../../components/layouts/MerchantLayout'

const Settings = () => {
  return (
    <MerchantLayout pageTitle={`Settings`}>
        <SettingsLayout>
            <Outlet />
        </SettingsLayout>
    </MerchantLayout>
  )
}

export default Settings
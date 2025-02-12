import React, { Fragment, useState } from 'react'
import StaticSidebar from '../partials/StaticSidebar'
import Sidebar from '../partials/Sidebar'
import MerchantHeader from '../partials/MerchantHeader'
import { activeBusiness, defaultSidebarState } from '../../utils'
import DashboardIcon from '../elements/icons/DashboardIcon'
import RoadmapIcon from '../elements/icons/RoadmapIcon'
import WalletIcon from '../elements/icons/WalletIcon'
import UsersIcon from '../elements/icons/UsersIcon'
import HierarchyIcon from '../elements/icons/HierarchyIcon'
import DocumentIcon from '../elements/icons/DocumentIcon'
import SquaresStackIcon from '../elements/icons/SquaresStackIcon'
import SquaresPlusIcon from '../elements/icons/SquaresPlusIcon'
import SlideOutModal from './SlideOutModal'
import ModalDialog from './ModalDialog'
import NewBiller from '../elements/billers/NewBiller'
import MerchantShortcuts from '../partials/MerchantShortcuts'
import SupportIcon from '../elements/icons/SupportIcon'
import HelpIcon from '../elements/icons/HelpIcon'
import DevDocsIcon from '../elements/icons/DevDocsIcon'

const MerchantLayout = ({pageTitle, children}) => {

  const [sidebarState, setSidebarState] = useState((defaultSidebarState() || 'open')); // collapsed

  const toggleSidebar = () => {
    if(sidebarState === 'closed') {
      localStorage.setItem("defaultSidebarState", "open");
      setSidebarState("open")
    } else {
      localStorage.setItem("defaultSidebarState", "closed");
      setSidebarState("closed")
    }
  }

  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [creatingBiller, setCreatingBiller] = useState(false);

  const sidebarLinks = [
    {
          title: 'Home',
          activeCheck: 'merchant',
          links: [
              {
                  title: 'Dashboard',
                  Icon: DashboardIcon,
                  route: '/merchant/home',
                  activeCheck: '/merchant/home'
              },
              {
                  title: 'Shortcuts',
                  Icon: RoadmapIcon,
                  action: ()=>{setShortcutsOpen(!shortcutsOpen)},
                  route: '/dashboard/getting-started',
                  activeCheck: '/dashboard/getting-started'
              },
          ]
      },
      {
          title: 'Your Business',
          activeCheck: '/merchant/business',
          links: [
              {
                  title: 'Transactions',
                  Icon: WalletIcon,
                  // Icon: Wallet2Icon,
                  route: '/merchant/transactions',
                  activeCheck: '/merchant/transactions'
              },
              {
                  title: 'Customers',
                  Icon: UsersIcon,
                  route: '/merchant/customers',
                  activeCheck: '/merchant/customers'
              },
              {
                  title: 'Sub-accounts',
                  Icon: HierarchyIcon,
                  route: '/merchant/sub-accounts',
                  activeCheck: '/merchant/sub-accounts'
              },
              {
                  title: 'Invoices',
                  Icon: DocumentIcon,
                  route: '/merchant/invoices',
                  activeCheck: '/merchant/invoices'
              },
              {
                  title: 'Payment Pages',
                  Icon: SquaresStackIcon,
                  route: '/merchant/payment-pages',
                  activeCheck: '/merchant/payment-pages'
              },
              {
                  title: 'Payment Items',
                  Icon: SquaresPlusIcon,
                  route: '/merchant/payment-items',
                  activeCheck: '/merchant/payment-items'
              }
          ]
      },
      {
        title: 'Help & Support',
        activeCheck: '/merchant/business',
        links: [
            {
                title: 'Developer Docs',
                Icon: DevDocsIcon,
                // Icon: Wallet2Icon,
                route: '/admin/care-home-settings',
                activeCheck: '/admin/care-home-settings'
            },
            {
                title: 'FAQ',
                Icon: HelpIcon,
                // Icon: Wallet2Icon,
                route: '/admin/care-home-settings',
                activeCheck: '/admin/care-home-settings'
            },
            {
                title: 'Support Tickets',
                Icon: SupportIcon,
                // Icon: Wallet2Icon,
                route: '/admin/care-home-settings',
                activeCheck: '/admin/care-home-settings'
            },
          ]
        }
  ]

  const business = activeBusiness()

  return (
    <>
      <div className='w-full flex items-start justify-between'>
        {/* static sidebar */}
        <span className="hidden xl:block">
          <StaticSidebar state={sidebarState} toggleSidebarState={()=>{toggleSidebar()}} />
        </span>

        {/* variable sidebar */}
        <span className="hidden xl:block">
          {sidebarState === 'open' && <Sidebar links={sidebarLinks} />}
        </span>
        
        {/* main */}
        <div className={`${sidebarState === 'open' ? 'xl:ml-[360px]' : 'xl:ml-[60px]'} w-full py-[10px] bg-white mt-0`}>
          <MerchantHeader 
            createBiller={()=>{setCreatingBiller(true)}}
            businessName={business.billerName}
            links={sidebarLinks}
          />
          <div className='py-[100px] xl:py-[20px] px-[40px]'>
            {children}
          </div>
        </div>
      </div>

      <SlideOutModal 
        isOpen={shortcutsOpen} 
        closeFunction={()=>{setShortcutsOpen(false)}}
        title={`Shortcuts`}
        subTitle={`Here are some quick links to help you get where you need to go.`}
      >
        <MerchantShortcuts />
      </SlideOutModal>

      <ModalDialog
        shown={creatingBiller} 
        closeFunction={()=>{setCreatingBiller(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel={``}
        dialogTitle='Create a new business'
        maxWidthClass='max-w-lg'
        hideActions={true}
      >
        <NewBiller />
      </ModalDialog>
    </>
  )
}

export default MerchantLayout